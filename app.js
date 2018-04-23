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
 // garage.initial('GPIO22', 'GPIO23')
 // gas.initial('GPIO26', 'GPIO20')
 // bath.initial('GPIO16', 'GPIO25')

  // var stepperWiringPi = require('./stepper-wiringpi');
  // var pinIN1 = 35 // 'GPIO19';  // Stepper Abu-abu
  // var pinIN2 = 33 // 'GPIO13';  // Stepper Ungu
  // var pinIN3 = 31 // 'GPIO6' ;// Stepper Biru
  // var pinIN4 = 29 // 'GPIO5'; // Stepper Hijau
  // var motor1 = stepperWiringPi.setup(200, pinIN1, pinIN2, pinIN3, pinIN4);

  // motor1.setSpeed(60);
  // motor1.step(-800, function() {
  //   console.log("Stepping complete!");
  // });

  
})

module.exports = five
