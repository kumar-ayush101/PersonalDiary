import express from "express";
import {
  signup,
  login,
  getCurrentUser,
  logout,
} from "../Controllers/authContoller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", getCurrentUser);
router.get("/logout",logout);

export default router;
