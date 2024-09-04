import express from "express";
import { verifyToken } from "../middlewear/middleware.js";
import {
  addCart,
  deleteCart,
  getCartByIdUser,
  updateCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/get/:id",verifyToken, getCartByIdUser); // Router untuk mendapatkan keranjang by id user
router.post("/add",verifyToken, addCart); // Router untuk menambahkan data keranjang
router.put("/update/:id",verifyToken, updateCart); // Router untuk mengubah data keranjang berdasarkan id
router.delete("/delete/:id", verifyToken, deleteCart); // Router untuk menghapus data keranjang berdasarkan id

export default router;
