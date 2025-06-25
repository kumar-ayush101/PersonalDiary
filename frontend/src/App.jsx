import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./Components/Auth/Signup";
import Login from "./Components/Auth/Login";
import Home from "./Components/Home/Home";
import WriteDiary from "./Components/WriteDiary/WriteDiary";
import SingleDiary from "./Components/Single/SingleDiary";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/writeDiary" element={<WriteDiary/>}></Route>
        <Route path="/diary/:id" element={<SingleDiary />} />

      </Routes>

    </Router>
  );
}

export default App;
