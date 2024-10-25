const { createTodo } = require('../../database/repository/todo');

const { validateBody, isValidate, validateCreate } = require('./create.todo.middleware')

exports.path = '/todos'
exports.method = 'post'
exports.validate = [ validateBody, isValidate ]

exports.handler = async (req, res) => {
  try {

    const todo = await createTodo({
      title: req.body.title,
      completed: req.body.completed || false,
    });
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
