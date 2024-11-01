
const { body, validationResult } = require('express-validator');
const { findOne } = require('../../database/repository/todo')

exports.validateBody = [
    body('title').trim().notEmpty().isString(),
    body('completed').optional().isBoolean()
]

exports.validateCreate = async (req, res, next) => {
    const result = await findOne({ title: req.body.title })
    if (result) {
        return res.status(400).json({ errors: [ { message: 'Title duplicated!' }] })
    }
    return next()
}