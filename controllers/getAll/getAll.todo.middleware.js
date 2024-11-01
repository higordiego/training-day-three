

const { query } = require('express-validator');

exports.queryParams = [
    query('page').notEmpty().isInt({ min: 0 }),
    query('limit').notEmpty().isInt({ min: 0, max: 100 })
]

