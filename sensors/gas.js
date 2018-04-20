module.exports.initial = function (pinBuzzer, pinSensor) {
  const smarthome = require('../firebase')
  const five = require('../app')
  const buzzer = new five.Led(pinBuzzer)
  const gasSensor = new five.Sensor(pinSensor)

  gasSensor.scale(0,100).on("change", function() {
    if (this.value <= 60) {
      buzzer.stop().off()
    }
    else if (this.value > 60) {
      buzzer.strobe()
    }
  })
}