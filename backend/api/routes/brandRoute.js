import express from "express";
// import { verifyToken } from "../middleware/auth-middleware.js";

import { addBrand, deleteBrand, getAllBrand, updateBrand } from "../controllers/brandController.js";
import { verifyToken } from "../middlewear/middleware.js";

const router = express.Router();

router.get("/all",getAllBrand); // Router untuk mendapatkan semua ukuran
router.post("/add", verifyToken, addBrand); // Router untuk menambahkan data ukuran
router.put("/update/:id", verifyToken, updateBrand);
router.delete("/delete/:id",verifyToken, deleteBrand);

export default router;
