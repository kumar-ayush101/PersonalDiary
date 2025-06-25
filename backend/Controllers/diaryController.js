import Diary from "../models/Diary.js";
import jwt from "jsonwebtoken";

export const getDiariesByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const diaries = await Diary.find({ user: userId }).sort({ date: -1 });
    res.status(200).json(diaries);
  } catch (err) {
    console.error("Error fetching diaries:", err);
    res.status(500).json({ message: "Failed to fetch diaries" });
  }
};

export const saveDiary = async (req, res) => {
  const { text } = req.body;
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const newDiaryEntry = new Diary({
      text,
      user: userId,
      date: new Date(),
    });
    console.log("Decoded user ID:", userId);
    console.log("Saving diary:", { text, user: userId });
    await newDiaryEntry.save();
    res.status(201).json({ message: "Diary entry saved successfully!" });
  } catch (error) {
    console.error("Error creating diary entry:", error);
    res.status(500).json({ message: "Failed to save diary entry" });
  }
};

export const getSingleDiary = async (req,res) => {
  try {
    const diary = await Diary.findById(req.params.id);
    if (!diary) {
      return res.status(404).json({ message: "Diary not found" });
    }
    res.status(200).json(diary);
  } catch (error) {
    console.error("Error fetching diary:", error);
    res.status(500).json({ message: "Server error" });
  }
}