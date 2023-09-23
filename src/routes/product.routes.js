const { Router } = require('express')
const multer = require('multer')

const ProductController = require('../controllers/ProductController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const uploadConfig = require('../configs/upload')

const productController = new ProductController()
const upload = multer(uploadConfig.MULTER);
const productRoutes = Router()

productRoutes.use(ensureAuthenticated)

productRoutes.post('/', upload.single("img_url"), productController.create)
productRoutes.get('/', productController.index)
productRoutes.get('/:id', productController.show)
productRoutes.put('/:id', productController.update)

productRoutes.delete('/:id', productController.delete)
module.exports = productRoutes