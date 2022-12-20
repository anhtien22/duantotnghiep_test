import express from 'express'
import {
  addProduct,
  createProductReview,
  deleteProduct,
  deleteReview,
  getAllProducts,
  getProduct,
  getProductReviews,
  updateProductDetails,
  updateProductImage,
} from '../controllers/productController.js'
import auth from '../middleware/auth.js'
import checkAdmin from '../middleware/checkAdmin.js'
import upload from '../middleware/multer.js'

const router = express.Router()

router.post('/add', upload.single('image'), addProduct)

router.get('/getAll', getAllProducts)


router.get('/:id', getProduct)

router.patch('/:id', updateProductDetails)

router.patch(
  '/:id/updateImage',
  auth,
  checkAdmin,
  upload.single('image'),
  updateProductImage
)

router.delete('/:id', deleteProduct)

router.put("/review", createProductReview);

router.get("/reviews/:id", getProductReviews);

router.delete("/reviews", deleteReview);

export default router
