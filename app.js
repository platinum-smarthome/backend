const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const cors = require('cors')

const index  = require('./routes/index')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/', index)

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})
