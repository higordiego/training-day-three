const models = require('../models')

exports.models = models

exports.findAll = async (collection, query) => models[collection].findAll(query)

exports.findOne = async (collection, query) => models[collection].findOne(query).lean()

exports.create = (collection, data) => models[collection].create(data)

exports.update = async (collection, query, data) => models[collection].update(query, data)

exports.remove = async (collection, query) => models[collection].remove(query)