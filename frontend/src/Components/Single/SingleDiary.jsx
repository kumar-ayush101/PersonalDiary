// SingleDiary.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SingleDiary = () => {
  const { id } = useParams(); // diary ID
  const [diary, setDiary] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/diary/entry/${id}`, {
          withCredentials: true,
        });
        setDiary(res.data);
      } catch (error) {
        console.error("Error fetching diary:", error);
      }
    };
    fetchDiary();
  }, [id]);

  if (!diary) {
    return <div className="text-white text-center mt-10">Loading or Diary not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <div className="max-w-4xl mx-auto bg-gray-400 text-gray-900 p-10 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-6">Diary Entry</h1>
        <p className="text-lg whitespace-pre-wrap">{diary.text}</p>
        <div className="mt-8 text-right">
          <button
            onClick={() => navigate("/home")}
            className="text-purple-800 font-medium underline hover:text-purple-900"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleDiary;
