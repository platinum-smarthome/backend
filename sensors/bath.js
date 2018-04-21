module.exports.initial = function(pinLED, pinSensor) {
  const five = require('../app')
  const Led = new five.Led(pinLED)
  const motion = new five.Motion(pinSensor)

  Led.stop().off()
  motion.on('calibrated', function() {
    console.log('sensor BathRoom calibrated...')
  })

  motion.on('motionstart', function() {
    Led.on()
    console.log('Someone Enter bathroom')
  })

  motion.on('motionend', function() {
    Led.off().stop()
    console.log('Someone Go out from bathroom')
  })
}