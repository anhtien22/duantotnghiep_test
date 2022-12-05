import express from "express";
import {
  getAllOrders,
  getMyOrders,
  getOneOrder,
  getOneOrderAdmin,
  placeOrder,
  updateOrder,
} from '../controllers/orderControllers.js'
import auth from '../middleware/auth.js'
import checkAdmin from '../middleware/checkAdmin.js'

const router = express.Router();

router.post("/new", auth, placeOrder);

router.get('/getAll', getAllOrders)

router.get("/myOrders", auth, getMyOrders);

router.get("/myOrders/:id", auth, getOneOrder);

router.get('/:id', getOneOrderAdmin)

router.put("/admin/order/:id", updateOrder)

router.put("/admin/order/:id", updateOrder);

export default router;
