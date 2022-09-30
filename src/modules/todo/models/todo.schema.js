const mongoose = require('../../../config/mongoose.db.js')
const { Schema, model } = mongoose

const TodoSchema = new Schema({
  title: String,
  isCompleted: Boolean
}, { timestamps: true })

const TodoModel = model('todo', TodoSchema)

module.exports = TodoModel