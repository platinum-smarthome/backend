const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: process.ENV.nexmo_key,
  apiSecret: process.ENV.nexmo_secret
});

module.exports = nexmo
