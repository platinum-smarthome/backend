require('dotenv').config()
const appRoot = require('app-root-path')
const RaspiCam = require("raspicam")
const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloud_apikey,
  api_secret: process.env.cloud_apisecret
})

module.exports = {
  capture: function(callback) {
    var timeNow = new Date().toISOString().replace(/\..+/,'')
    var fileName = `${appRoot}/captures/capture_${timeNow}.jpg`
    var camera = new RaspiCam({
      mode: 'photo',
      output: fileName,
      w: 640,
      h: 480,
      q: 100,
      t: 1
    })

    camera.start()
    camera.on('exit', function() {
      cloudinary.uploader.upload(fileName, function(result) {
        // console.log('cloudinary result', result.url)
        callback(result.url)
      })
    })
  },

  record: function(callback) {
    var timeNow = new Date().toISOString().replace(/\..+/,'')
    var fileName = `${appRoot}/captures/video_${timeNow}.mp4`
    var camera = new RaspiCam({
      mode: 'video',
      output: fileName,
      w: 1920,
      h: 1080,
      t: 5000
    })

    camera.start()
    camera.on('exit', function() {
      cloudinary.uploader.upload_large(fileName, function(result) {
        // console.log('cloudinary result', result.url)
        callback(result.url)
      }, { resource_type: 'video' })
    })
  }
}
