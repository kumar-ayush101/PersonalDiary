import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        user,
        { withCredentials: true }
      );
      alert(response.data.message);
      navigate("/home");
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Login failed. Try again.";
      alert(msg);
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-400 text-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 tracking-wide">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={user.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-300 text-gray-900 placeholder-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-700"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-300 text-gray-900 placeholder-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-700"
          />
          <button
            type="submit"
            className="w-full py-3 bg-purple-800 text-white font-bold rounded-lg hover:bg-purple-900 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-6 text-white font-medium">
          Don't have an account?{" "}
          <a href="/" className="underline hover:text-purple-200">
            Signup
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
