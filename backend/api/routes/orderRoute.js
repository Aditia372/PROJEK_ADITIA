import express from "express";
import { verifyToken } from "../middlewear/middleware.js";
import {
  addOrderUser,
  getAllOrders,
  getOrderByIdUser,
  // updateStatus,
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/get/:id", verifyToken, getOrderByIdUser);
router.get("/get-all", getAllOrders);
router.post("/add", verifyToken, addOrderUser);

export default router;
