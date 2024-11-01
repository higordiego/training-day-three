
const models = require('../models')

exports.models = models


exports.paginate = (collection, query = {}, options = { page: 0, limit: 10, lean: true }) =>
    models[collection].paginate(query, options)

exports.findOne = (collection, query) => models[collection].findOne(query).lean()

exports.find = (collection, query) => models[collection].find(query).lean()

exports.create = (collection, data) => models[collection].create(data)