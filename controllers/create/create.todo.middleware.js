
const { body, validationResult } = require('express-validator');
const Todo = require('../../database/models/todo')

exports.validateBody = [
    body('title').trim().notEmpty().isString(),
    body('completed').optional().isBoolean()
]

exports.isValidate = (req, res, next) => {
    const result = validationResult(req)
    if (result?.errors?.length) {
        return res.status(400).json({ errors: result.array() })
    }
    return next()
}

exports.validateCreate = async (req, res, next) => {
    const result = await Todo.findOne({ title: req.body.title }).lean()
    if (result) {
        return res.status(400).json({ errors: [ { message: 'Title duplicated!' }] })
    }
    return next()
}