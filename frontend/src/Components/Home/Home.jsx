import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  const [diaries, setDiaries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndDiaries = async () => {
      try {
        const userResponse = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true,
        });
        const user = userResponse.data;

        const diaryResponse = await axios.get(`http://localhost:5000/api/diary/${user._id}`, {
          withCredentials: true,
        });

        setDiaries(diaryResponse.data);
      } catch (error) {
        console.error("Error fetching diaries:", error);
      }
    };

    fetchUserAndDiaries();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/auth/logout", {
        withCredentials: true,
      });
      alert("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10">
      <Navbar />

      {/* Logout button */}
      

      <h2 className="text-4xl font-bold text-center mb-10 tracking-wide text-white drop-shadow">
        Your Diary Entries
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {diaries.map((diary) => (
          <div
            key={diary._id}
            className="bg-gray-400 text-gray-900 rounded-xl shadow-2xl p-6 hover:scale-[1.02] transition-transform duration-300 border border-gray-300"
          >
            <p className="text-lg">
              {diary.text.length > 100
                ? diary.text.substring(0, 100) + "..."
                : diary.text}
            </p>
            {diary.text.length > 100 && (
              <div className="mt-4 text-right">
                <button
                  onClick={() => navigate(`/diary/${diary._id}`)}
                  className="text-purple-800 font-medium hover:underline"
                >
                  Read More →
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
