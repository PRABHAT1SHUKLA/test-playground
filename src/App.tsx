import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/signup";
import Signin from "./components/signin";
import LandingPage from "./components/LandingPage";
import Counter from "./components/counter";
import Accordion from "./components/accordion";
import TypingSpeed from "./components/typingspeedcal";

import Time from "./components/time";
import My from "./components/my";
import Carousel from "./components/carousel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/landing" element={<LandingPage/>} />
        <Route path="/counter" element={<Counter/>}/>
        <Route path="/accordion" element={<div className="p-4 max-w-md mx-auto">
       <h1 className="text-2xl font-bold mb-4">Simple Accordion</h1>
      <Accordion title="Accordion Item 1" content="This is the content for item 1." />
      <Accordion title="Accordion Item 2" content="This is the content for item 2." />
      <Accordion title="Accordion Item 3" content="This is the content for item 3." />
    </div>
}/>
    <Route path="/speed" element={<TypingSpeed/>}/>
   <Route path="/time" element={<Time/>}/>
    <Route path="/me" element={<My/>}/>
    <Route path='/carousel' element={<Carousel/>}/>
      </Routes>
    </Router>
  );
}

export default App;