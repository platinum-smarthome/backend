module.exports.initial = function(pinBuzzer, pinSensor) {
  const smarthome = require('../firebase')
  const five = require('../app')
  const camera = require('./camera')
  const sendEmail = require('../sendEmail.js')
  const buzzer = new five.Led(pinBuzzer)
  const sensor = new five.Motion(pinSensor)

  buzzer.stop().off()
  sensor.on('calibrated', function() {
    console.log('sensor door calibrated...')
  })

  var sensorStatus = false
  smarthome.on('value', snapshot => {
    // console.log(snapshot.val().sensors.door)
    if (snapshot.val().sensors.door === 1) {
      sensorStatus = true
      console.log('sensor door active...')
    } else {
      buzzer.stop().off()
      sensorStatus = false
      console.log('sensor door not active...')
    }
  }, err => {
    console.error('sensor door error: ', err)
  })

  sensor.on('motionstart', function() {
    if (sensorStatus) {
      console.log('door alarm active...')
      smarthome.child('alarms/door').set(0)
      camera.capture(function(imgUrl) {
         console.log('callback camera', imgUrl)
        let key = smarthome.child('logs').push().key
        let message = {
	  id: key,
	  title: 'Notification Door Alarm',
	  description: 'Dorr alarm detected object. Please check the picture sent to see more clearly',
	  imageUrl: imageUrl,
	  createdAt: Date.now()
        }
	sendEmail(message)
        smarthome.child(`logs/${key}`).set(message)
      })
      
      buzzer.strobe()      
    }
  })

  sensor.on('motionend', function() {
    if (sensorStatus) {
      buzzer.stop().off()
      smarthome.child('alarms/door').set(1)
      console.log('door alarm not active...')
    }
  })
}
