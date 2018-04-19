// const firebase = require('./firebase')
const five = require('johnny-five')
const raspi = require('raspi-io')
const board = new five.Board({
  io: new raspi()
})

board.on('ready', function() {
  console.log('board smart-home ready')
  const buzzerDoor = new five.Led('GPIO17')
  const sensorDoor = new five.Motion('GPIO18')

  buzzerDoor.stop().off()

  sensorDoor.on('calibrated', function() {
    console.log('sensor door active...')
  })

  sensorDoor.on('motionstart', function() {
    console.log('door alarm active...')
    buzzerDoor.strobe()
  })

  sensorDoor.on('motionend', function() {
    console.log('door alarm not active...')
    buzzerDoor.stop().off()
  })
})


