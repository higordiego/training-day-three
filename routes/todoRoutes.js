const express = require('express');
const router = express.Router();
const todoController = require('../controllers/create/create.todo.controller');

// router.get('/todos', todoController.getTodos);
// router.get('/todos/:id', todoController.getFindById);


router[todoController.method](todoController.path, todoController.validate, todoController.handler);


// router.delete('/todos/:id', todoController.deleteTodo);
// router.patch('/todos/:id', todoController.updateTodo);

module.exports = router;