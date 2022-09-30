const TodoModel = require('../models/todo.schema.js')

const TodoService = {
  getAll: (query = {}) => {
    return TodoModel.find(query)
  },
  create: (payload) => {
    return new TodoModel(payload).save()
  },
  getOne: (id) => {
    return TodoModel.findOne({ _id: id })
  },
  updateOne: (id, payload) => {
    return TodoModel.findOneAndUpdate({ _id: id }, { $set: payload })
  },
  deleteOne: (id) => {
    return TodoModel.findOneAndDelete({ _id: id })
  }
}

module.exports = TodoService