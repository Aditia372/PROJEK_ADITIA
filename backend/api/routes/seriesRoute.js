import express from "express";
// import { verifyToken } from "../middleware/auth-middleware.js";

import { addSeries, deleteSeries, getAllSeries, updateSeries } from "../controllers/seriesController.js";
import { verifyToken } from "../middlewear/middleware.js";

const router = express.Router();

router.get("/all",getAllSeries); 
router.post("/add",verifyToken, addSeries); 
router.put("/update/:id",verifyToken,updateSeries);
router.delete("/delete/:id",verifyToken, deleteSeries);

export default router;
