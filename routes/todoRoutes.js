const express = require('express');
const router = express.Router();
const todoCreateController = require('../controllers/create/create.todo.controller');
const todoController = require('../controllers/getAll/getAll.todo.controller');

// router.get('/todos', todoController.getTodos);
// router.get('/todos/:id', todoController.getFindById);


router[todoCreateController.method](todoCreateController.path, todoCreateController.validate, todoCreateController.handler);
router[todoController.method](todoController.path, todoController.validate, todoController.handler);


// router.delete('/todos/:id', todoController.deleteTodo);
// router.patch('/todos/:id', todoController.updateTodo);

module.exports = router;