'use strict'
const smarthome = require('./firebase.js');

const fetchEmails = (callback) => {
  smarthome.child('/users/').on('value', (snapshot) => {
    let val = snapshot.val();
    let emailList = [];
    if(val) {
      for(let i in val) {
        emailList.push(val[i].email)
      }
      let emailListString = emailList.join(', ');
      callback(emailListString)
    } else {
      console.log('users null')
    }
  })
}
module.exports = fetchEmails;
 	
