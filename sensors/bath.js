module.exports.initial = function(pinLED, pinSensor) {
  const five = require('../app')
  const Led = new five.Led(pinLED)
  const motion = new five.Motion(pinSensor)

  Led.stop().off()
  motion.on('calibrated', function() {
    console.log('sensor bathRoom calibrated...')
  })

  motion.on('motionstart', function() {
    Led.on()
    console.log('Someone enter bathroom')
  })

  motion.on('motionend', function() {
    Led.off().stop()
    console.log('Someone go out from bathroom')
  })
}