module.exports.initial = function(pinBuzzer, pinSensor) {
  const smarthome = require('../firebase')
  const five = require('../app')
  const camera = require('./camera')
  const buzzer = new five.Led(pinBuzzer)
  const sensor = new five.Motion(pinSensor)

  buzzer.stop().off()
  sensor.on('calibrated', function() {
    console.log('sensor garage calibrated...')
  })

  var sensorStatus = false
  smarthome.on('value', snapshot => {
    // console.log(snapshot.val().sensors.garage)
    if (snapshot.val().sensors.garage === 1) {
      sensorStatus = true
      console.log('sensor garage active...')
    } else {
      sensorStatus = false
      buzzer.stop().off()
      console.log('sensor garage not active...')
    }
  }, err => {
    console.error('sensor garage error: ', err)
  })

  sensor.on('motionstart', function() {
    if (sensorStatus) {
      console.log('garage alarm active...')
      smarthome.child('alarms/garage').set(0)
      let imgUrl = ''
      let key = smarthome.child('logs').push().key
      let message = {
        id: key,
        title: 'Notification Garage Alarm',
        description: 'Garage alarm detected object.',
        createdAt: Date.now()
      }
      sendEmail(message)
      smarthome.child(`logs/${key}`).set(message)
      smarthome.child('alarms/garage').set(0)

      buzzer.strobe()
    }
  })

  sensor.on('motionend', function() {
    if (sensorStatus) {
      buzzer.stop().off()
      smarthome.child('alarms/garage').set(1)
      console.log('garage alarm not active...')
    }
  })
}