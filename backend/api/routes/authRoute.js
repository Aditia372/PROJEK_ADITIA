import express from "express";
import {
  addAccount,
  deleteAccount,
  getAllUser,
  getCurrentUser,
  loginAccount,
  logoutAccount,
  registerAccount,
  updateAccount,
  updateRole,
  addMessage,
} from "../controllers/authController.js";
import { verifyToken } from "../middlewear/middleware.js";

const router = express.Router();

router.get("/my-account", verifyToken, getCurrentUser); 
router.post("/register", registerAccount);
router.post("/add", addAccount); 
router.post("/message", verifyToken, addMessage); 
router.post("/login", loginAccount);
router.get("/logout", verifyToken, logoutAccount); 
router.get("/get-all", getAllUser); 
router.put("/update/:id", verifyToken, updateAccount); 
router.put("/update-role/:id", verifyToken, updateRole); 
router.delete("/delete/:id", verifyToken, deleteAccount);

export default router;
