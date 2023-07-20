const { Router } = require("express")
const usersRouter = require("./users.routes")
const productRouter = require("./product.routes")
const categoryRouter = require("./category.routes")

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/product', productRouter)
routes.use('/category', categoryRouter)

module.exports = routes