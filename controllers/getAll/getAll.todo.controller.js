const { paginate } = require('../../database/repository/todo');
const { queryParams } = require('./getAll.todo.middleware')
const { isValidate } = require('../../utils/validator')

exports.path = '/todos'
exports.method = 'get'
exports.validate = [ queryParams, isValidate ]

exports.handler = async (req, res) => {
  try {
    const { page, limit } = req.query
    const todo = await paginate({}, { page, limit })
    return res.status(200).json(todo);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}
