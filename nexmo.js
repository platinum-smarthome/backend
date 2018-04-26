require('dotenv').config()
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: '0a8df316',
  apiSecret: '7pYBjJe1wNqA4BK7'
});

function sendMessage(msg) {
  nexmo.message.sendSms(
  'NEXMO', '+6285880016822', msg,
    (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        console.dir(responseData);
      }
    }
  )
}

module.exports = {
  sendMessage,
}


