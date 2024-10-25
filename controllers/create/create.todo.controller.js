const Todo = require('../../models/todo');

const { validateBody, isValidate, validateCreate } = require('../todo.middleware')

exports.path = '/todos'
exports.method = 'post'
exports.validate = [ validateBody, isValidate, validateCreate ]

exports.handler = async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      completed: req.body.completed || false,
    });
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
