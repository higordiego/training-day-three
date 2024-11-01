const { createTodo } = require('../../database/repository/todo');
const { isValidate } = require('../../utils/validator')

const { validateBody, validateCreate } = require('./create.todo.middleware')

exports.path = '/todos'
exports.method = 'post'
exports.validate = [ validateBody, isValidate, validateCreate ]

exports.handler = async (req, res) => {
  try {
    const todo = await createTodo({
      title: req.body.title,
      completed: req.body.completed || false,
    });
    return res.status(201).json(todo);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}
