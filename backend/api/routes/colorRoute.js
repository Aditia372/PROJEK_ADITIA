import express from "express";
// import { verifyToken } from "../middleware/auth-middleware.js";

import { addWarna, deleteColor, getAllWarna, updateColor } from "../controllers/colorController.js";
import { verifyToken } from "../middlewear/middleware.js";

const router = express.Router();

router.get("/all",getAllWarna); // Router untuk mendapatkan semua ukuran
router.post("/add",verifyToken, addWarna); // Router untuk menambahkan data ukuran
router.put("/update/:id",verifyToken, updateColor);
router.delete("/delete/:id",verifyToken, deleteColor);

export default router;
