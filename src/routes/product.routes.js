const { Router } = require('express')
const ProductController = require('../controllers/ProductController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const productRoutes = Router()
const productController = new ProductController()

productRoutes.use(ensureAuthenticated)

productRoutes.post('/', productController.create)
productRoutes.get('/', productController.index)
productRoutes.get('/:id', productController.show)
productRoutes.put('/:id', productController.update)

productRoutes.delete('/:id', productController.delete)
module.exports = productRoutes