const { validationResult } = require('express-validator');

exports.isValidate = (req, res, next) => {
    const result = validationResult(req)
    if (result?.errors?.length) {
        return res.status(400).json({ errors: result.array() })
    }
    return next()
}