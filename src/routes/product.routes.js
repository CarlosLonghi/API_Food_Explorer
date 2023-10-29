const { Router } = require('express')
const multer = require('multer')

const ProductController = require('../controllers/ProductController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const uploadConfig = require('../configs/upload')
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const productController = new ProductController()
const upload = multer(uploadConfig.MULTER);
const productRoutes = Router()

productRoutes.use(ensureAuthenticated)

productRoutes.get('/', productController.index)
productRoutes.get('/:id', productController.show)

// Erro pode estar nessa rota:
productRoutes.post('/', verifyUserAuthorization("admin"), upload.single("img_url"), productController.create)
productRoutes.put('/:id', verifyUserAuthorization("admin"), productController.update)
productRoutes.delete('/:id', verifyUserAuthorization("admin"), productController.delete)
module.exports = productRoutes