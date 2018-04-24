const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: proces.ENV.nexmo_key,
  apiSecret: proces.ENV.nexmo_secret 
});

module.exports = nexmo
