import { Router } from 'express'
import {
  deleteOneUserAdmin,
  deleteProfile,
  forgotPassword,
  getAllUsers,
  getOneUserAdmin,
  login,
  readProfile,
  registerUser,
  resetPassword,
  updateProfile,
} from '../controllers/userController.js'
import auth from '../middleware/auth.js'
import checkAdmin from '../middleware/checkAdmin.js'

const router = Router()

router.post('/register', registerUser)

router.post('/login', login)

router.post("/password/forgot", forgotPassword);

router.put("/password/reset/:token", resetPassword);


router.get('/profile', auth, readProfile)

router.patch('/profile', auth, updateProfile)

router.delete('/profile', auth, deleteProfile)

router.get('/getAll', getAllUsers)

router.get("/admin/user/:id", auth, checkAdmin, getOneUserAdmin);

router.delete("/admin/user/:id", auth, checkAdmin, deleteOneUserAdmin)
export default router
