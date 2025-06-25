import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
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
      const response = await axios.post("http://localhost:5000/api/auth/signup", user);
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Signup failed. Try again.");
    }
  };

  return (
  <div className="w-full h-screen bg-gray-900 flex items-center justify-center">
    <div className="bg-gray-400 rounded-2xl shadow-2xl p-10 w-full max-w-md text-purple-900">
      <h2 className="text-3xl font-extrabold text-center mb-6 tracking-wide">
        Create an Account
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={user.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg bg-gray-300 text-purple-900 placeholder-purple-700 border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-700"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={user.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg bg-gray-300 text-purple-900 placeholder-purple-700 border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-700"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg bg-gray-300 text-purple-900 placeholder-purple-700 border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-700"
        />
        <button
          type="submit"
          className="w-full py-3 bg-purple-800 text-white font-bold rounded-lg hover:bg-purple-900 transition duration-300"
        >
          Sign Up
        </button>
      </form>
      <p className="text-center mt-6 text-purple-800 font-medium">
        Already have an account?{" "}
        <a href="/login" className="underline hover:text-purple-900">
          Login
        </a>
      </p>
    </div>
  </div>
);
}

export default Signup;
