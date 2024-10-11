
const { body, validationResult } = require('express-validator');

exports.validate = [
    body('title').trim().notEmpty(),
    body('description').trim().notEmpty(),
]

exports.isValidate = (req, res, next) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.json({ errors: result.array() })
    }
    return next()
}