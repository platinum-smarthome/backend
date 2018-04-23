'use strict';
const nodemailer = require('nodemailer')
const fetchEmails = require('./emailList.js')

const sendingEmail = (message, emailList) => {
  nodemailer.createTestAccount((err, account) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'fortress.platinum@gmail.com',
        pass: 'fortress123'
      }
    })

    const mailOption = {
      from: '"Fortress - Smart Home Security", <fortress.platinum@gmail.com>',
      to: emailList,
      subject: `Something Happen in Your Home!`,
      html: `We detected something in your home <br>
      <b>${message.title}<b><br>
      ${message.description}<br>
      <img src=${message.imageUrl} alt="image not found or deleted">
      `
    }

    transporter.sendMail(mailOption, (error, infor) => {
      if(error) { return console.log(error) }
      console.log('Email sent');
    })
  })
}

const sendEmail = (message) => {
  fetchEmails((emailListString) => {
    sendingEmail(message, emailListString)
  })
}

module.exports = sendEmail

