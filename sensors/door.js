module.exports.initial = function(pinBuzzer, pinSensor) {
  const smarthome = require('../firebase')
  const five = require('../app')
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
      sensorStatus = false
      buzzer.stop().off()
      console.log('sensor door not active...')
    }
  }, err => {
    console.error('sensor door error: ', err)
  })

  sensor.on('motionstart', function() {
    if (sensorStatus) {
      console.log('door alarm active...')
      buzzer.strobe()
    }
  })

  sensor.on('motionend', function() {
    if (sensorStatus) {
      console.log('door alarm not active...')
      buzzer.stop().off()
    }
  })
}