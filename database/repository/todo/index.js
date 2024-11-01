const { create, findOne, find, paginate } = require('../index')


exports.createTodo = ({ title, completed = false }) => create('Todo', { title: title, completed: completed })
exports.findOne = (query = {}) => findOne('Todo', query)

exports.find = (query = {}) => find('Todo', query)

exports.paginate = (query, options) => paginate('Todo', query, options)