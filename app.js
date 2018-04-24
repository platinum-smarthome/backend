const five = require('johnny-five')
const raspi = require('raspi-io')
const board = new five.Board({
  repl: false,
  io: new raspi()
})

const door = require('./sensors/door.js')
const garage = require('./sensors/garage.js')
const gas = require('./sensors/gas.js')
const bath = require('./sensors/bath.js')

// console.log('initial server')
board.on('ready', function() {
  console.log('sensor checking:')
  door.initial('GPIO17', 'GPIO18')
  garage.initial('GPIO22', 'GPIO23')
  gas.initial('GPIO26', 'GPIO20')
  // bath.initial('GPIO19', 'GPIO16')
})

module.exports = five
