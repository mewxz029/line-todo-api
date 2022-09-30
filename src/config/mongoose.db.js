const mongoose = require('mongoose')
const dotenv = require('dotenv')
const env = dotenv.config().parsed

const url = env.MONGODB_CONNECTION
mongoose.connect(url, { useNewUrlParser: true })
  .then(() => console.log('Connection successfully'))
  .catch((err) => console.error(err))

module.exports = mongoose