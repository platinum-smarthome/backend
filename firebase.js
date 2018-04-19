import { initializeApp } from 'firebase'


var app = initializeApp({
  apiKey: 'AIzaSyCJLHWpnL-H7DPHgvA8NvJhluLrYI6Snvo',
  authDomain: 'herbyherado-198014.firebaseapp.com',
  databaseURL: 'https://herbyherado-198014.firebaseio.com',
  projectId: 'herbyherado-198014',
  storageBucket: 'herbyherado-198014.appspot.com',
  messagingSenderId: '274437662526'
})

export const db = app.database()
export const smarthome = db.ref('smarthome')