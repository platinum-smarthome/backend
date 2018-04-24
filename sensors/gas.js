module.exports.initial = function (pinBuzzer, pinSensor) {
  const smarthome = require('../firebase')
  const five = require('../app')
  const sendEmail = require('../sendEmail.js')
  const buzzer = new five.Led(pinBuzzer)
  const gasSensor = new five.Sensor.Digital(pinSensor)

  buzzer.stop().off()
  var sensorStatus = false
  console.log('sensor gas calibrated...')
  smarthome.on('value', snapshot => {
    // console.log(snapshot.val().sensors.gas)
    if (snapshot.val().sensors.gas === 1) {
      sensorStatus = true
      console.log('sensor gas active...')
    } else {
      sensorStatus = false
      buzzer.stop().off()
      console.log('sensor gas not active...')
    }
  }, err => {
    console.error('sensor gas error: ', err)
  })

  gasSensor.on("change", function() {
    // console.log('sensor status', sensorStatus)
    if (sensorStatus) {
      if (this.value === 1) {
        console.log('gas alarm not active...')
        smarthome.child('alarms/gas').set(1)
        buzzer.stop().off()
      } else if (this.value === 0) {
        console.log('gas alarm active...')
        smarthome.child('alarms/gas').set(0)
        let key = smarthome.child('logs').push().key
        let message = {
          id: key,
          title: 'Notification Gas alarm',
          description: 'Gas leak detected.',
          createdAt: Date.now()
        }
	sendEmail(message)
	smarthome.child(`logs/${key}`).set(message)
        
        buzzer.on()
        // buzzer.blink(250)
      }
    }
  })
}
