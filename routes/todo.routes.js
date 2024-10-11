const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller');

const { validate, isValidate } = require('../middlewares/todo.validate')

router.get('/todos', todoController.getTodos);
router.get('/todos/:id', todoController.getFindById);
router.post('/todos', validate, isValidate, todoController.createTodo);
router.delete('/todos/:id', todoController.deleteTodo);
router.patch('/todos/:id', todoController.updateTodo);

module.exports = router;