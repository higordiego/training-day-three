const { create } = require('../index')

exports.createTodo = ({ title, completed = false }) => {
    return create('Todo', { title: title, completed: completed })
}
