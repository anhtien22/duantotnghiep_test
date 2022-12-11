import express from 'express'
import auth from '../middleware/auth.js'
import checkAdmin from '../middleware/checkAdmin.js'
import {
    addBrand,
    deleteBrand,
    getAllBrands,
    getBrand,
    updateBrand,
} from '../controllers/brandController.js'

const router = express.Router()

router.post('/add', auth, checkAdmin, addBrand)

router.get('/getAll', getAllBrands)

router.get('/:id', getBrand)

router.patch('/:id', auth, checkAdmin, updateBrand)

router.delete('/:id', auth, checkAdmin, deleteBrand)

export default router
