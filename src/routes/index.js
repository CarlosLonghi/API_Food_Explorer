const { Router } = require("express")
const usersRouter = require("./users.routes")
const productRouter = require("./product.routes")
const categoryRouter = require("./category.routes")
const sessionRouter = require("./session.routes")

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/product', productRouter)
routes.use('/category', categoryRouter)
routes.use('/session', sessionRouter)

module.exports = routes