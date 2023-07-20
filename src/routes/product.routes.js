const { Router } = require('express')
const ProductController = require('../controllers/ProductController')

const productRoutes = Router()
const productController = new ProductController()

productRoutes.post('/', productController.create)
productRoutes.get('/', productController.index)
productRoutes.delete('/:id', productController.delete)
module.exports = productRoutes