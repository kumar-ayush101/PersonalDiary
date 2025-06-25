import express from "express";
import { getDiariesByUser, saveDiary, getSingleDiary } from "../Controllers/diaryController.js";

const router = express.Router();

router.get("/:userId", getDiariesByUser);
router.post("/", saveDiary);
router.get("/entry/:id", getSingleDiary); 


export default router;
