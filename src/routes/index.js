const { Router } = require("express")
const usersRouter = require("./users.routes")
const productRouter = require("./product.routes")

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/product', productRouter)

module.exports = routes