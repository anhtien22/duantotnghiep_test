import express from 'express'
import auth from '../middleware/auth.js'
import checkAdmin from '../middleware/checkAdmin.js'
import {
  addVariation,
  deleteVariation,
  getAllVariation,
  getVariation,
  updateVariation
} from '../controllers/variationController.js'

const router = express.Router()

router.post('/add', addVariation)

router.get('/getAll', getAllVariation)

router.get('/:id', getVariation)

router.patch('/:id', updateVariation)

router.delete('/:id', deleteVariation)

export default router
