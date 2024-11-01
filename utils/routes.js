const path = require('path')
const fs = require('fs')

const createObjectStruct = (value, dir, arrayObject) =>
    arrayObject.map(v => ({ object: v, root: `${value}`, dir: `${dir}/${value}/${v}` }))

const parseObject = (listRoutes, dir, fnObjectStruct) => listRoutes.reduce((acc, value) => {
    const obj = fs.readdirSync(`${dir}/${value}`)
    const result = fnObjectStruct(value, dir, obj)
    return acc.concat(result).filter(a => !String(a.object).includes('middleware'))
}, [])


const orderEpressRoute = (list) => {
    const params = []
    const notParams = []
    for (const val of list) {
        const c = require(val.dir)
        if (c && c.path) {
            if (c.path.search(':') > 0) params.push(c)
            else notParams.push(c)
        }
    }
    return [...notParams, ...params]
}

const generateRoutes = (list, app) => list.map(val => {
    let args = [`/api${val.path}`]
    args = args.concat(val.validate || [])
    args.push(val.handler)
    app._router[val.method.toLowerCase()].apply(app._router, args)
})


module.exports = app => {
    const dir = path.join(__dirname, '../controllers')
    const listRoutes = fs.readdirSync(dir)
    const parse = parseObject(listRoutes, dir, createObjectStruct)
    const orderExpress = orderEpressRoute(parse)
    generateRoutes(orderExpress, app)
}


