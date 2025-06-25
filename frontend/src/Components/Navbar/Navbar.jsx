import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); 

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    navigate("/login"); 
  };

  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <h2 className="text-2xl font-bold tracking-wide">Diary App</h2>
      <ul className="flex items-center space-x-6">
        <li>
          <Link 
            to="/writeDiary" 
            className="hover:bg-indigo-500 px-3 py-2 rounded-md transition duration-200"
          >
            Write Diary
          </Link>
        </li>
        {/* <li>
          <Link 
            to={`/profile/${user?._id}`} 
            className="hover:bg-indigo-500 px-3 py-2 rounded-md transition duration-200"
          >
            Profile
          </Link>
        </li> */}
        <li>
          <button 
            onClick={handleLogout} 
            className="bg-black hover:bg-red-600 px-4 py-2 rounded-md text-white font-medium transition duration-200"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
