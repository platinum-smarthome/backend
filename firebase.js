const firebase = require('firebase')
const firebaseConfig = {
  apiKey: 'AIzaSyCJLHWpnL-H7DPHgvA8NvJhluLrYI6Snvo',
  authDomain: 'herbyherado-198014.firebaseapp.com',
  databaseURL: 'https://herbyherado-198014.firebaseio.com',
  projectId: 'herbyherado-198014',
  storageBucket: 'herbyherado-198014.appspot.com',
  messagingSenderId: '274437662526'
}

firebase.initializeApp(firebaseConfig)
const db = firebase.database()
const smarthome = db.ref('smarthome')

module.exports = smarthome