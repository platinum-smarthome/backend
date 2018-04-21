module.exports.initial = function (pinBuzzer, pinSensor) {
  const smarthome = require('../firebase')
  const five = require('../app')
  const buzzer = new five.Led(pinBuzzer)
  const gasSensor = new five.Sensor.Digital(pinSensor)

  gasSensor.on("change", function() {
    // console.log('gas sensor on')
    // console.log(this.value)
    // console.log(gasSensor)
    if (this.value === 1) {
      console.log('gasSensor aman ', this.value)
      buzzer.stop().off()
    }
    else if (this.value === 0) {
      console.log('gasSensor bahaya ', this.value)
      buzzer.on()
      let key = smarthome.child('logs').push().key
      smarthome.child(`logs/${key}`).set({
        id: key,
        title: 'Notification Gas alarm',
        description: 'Gas leak detected',
        createdAt: Date.now()
      })
    }
  })
}