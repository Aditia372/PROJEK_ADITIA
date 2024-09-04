import express from "express";
import {
  deleteProduct,
  getAllProduct,
  tambahProduk,
  updateProduct,
} from "../controllers/produkController.js";
import { verifyToken } from "../middlewear/middleware.js";

const router = express.Router();

router.post("/add",verifyToken, tambahProduk); // Router untuk menambahkan data produk
router.get("/all", getAllProduct);
router.put("/update/:id",verifyToken, updateProduct);
router.delete("/delete/:id",verifyToken, deleteProduct);

export default router;
