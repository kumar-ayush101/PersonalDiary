import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const WriteDiary = () => {
  const [diaryText, setDiaryText] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const date = new Date();
    const formatted = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    setCurrentDate(formatted);
  }, []);

  const handleChange = (e) => {
    setDiaryText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/diary",
        { text: diaryText },
        { withCredentials: true }
      );
      alert(response.data.message);
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("Failed to save diary entry.");
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-gray-400 text-white rounded-3xl shadow-2xl p-10 relative">

        {/* Date Badge */}
        <div className="absolute top-6 left-6 bg-gray-700 px-5 py-2 rounded-lg text-sm font-medium text-gray-200 shadow-md">
          {currentDate}
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-8 tracking-wide text-white">
          Write Your Emotions
        </h1>

        {/* Diary Form */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-8">
          <textarea
            className="w-full h-64 bg-gray-300 text-gray-900 text-lg p-6 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-700 placeholder-gray-700 resize-none"
            placeholder="Pour your heart out on this digital page..."
            value={diaryText}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-1/3 bg-purple-800 hover:bg-purple-900 text-white font-bold py-3 rounded-xl transition duration-300 shadow-lg"
          >
            Save Entry
          </button>
        </form>
      </div>
    </div>
  );
};

export default WriteDiary;
