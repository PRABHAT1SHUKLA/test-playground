import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/signup";
import Signin from "./components/signin";
import LandingPage from "./components/LandingPage";
import Counter from "./components/counter";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/landing" element={<LandingPage/>} />
        <Route path="/counter" element={<Counter/>}/>
      </Routes>
    </Router>
  );
}

export default App;