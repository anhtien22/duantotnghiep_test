import express from "express";
import {
  getAllOrders,
  getMyOrders,
  getOneOrder,
  getOneOrderAdmin,
  placeOrder,
} from "../controllers/orderControllers.js";
import auth from "../middleware/auth.js";
import checkAdmin from "../middleware/checkAdmin.js";

const router = express.Router();

router.post("/new", placeOrder);

router.get("/getAll", getAllOrders);

router.get("/myOrders", getMyOrders);

router.get("/myOrders/:id", getOneOrder);

router.get("/:id", getOneOrderAdmin);

export default router;
