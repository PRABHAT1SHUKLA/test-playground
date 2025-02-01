import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/signup";
import Signin from "./components/signin";
import LandingPage from "./components/LandingPage";
import Counter from "./components/counter";
import Accordion from "./components/accordion";
import TypingSpeed from "./components/typingspeedcal";
import  { Debounce } from "./components/debounced";

import Time from "./components/time";
import {Ps }from "./components/my";
import Carousel from "./components/carousel";
import Accordion2 from "./components/accordion2";
import DrawingCanvas from "./components/drawcanvas";
import { TodoApp, TodoProvider } from "./components/todocontext";
import Countre from "./components/simplereducer";
import Make from "./components/fetch";

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
    <Route path="/fetch" element={<Make/>}/>
   <Route path="/time" element={<Time/>}/>
    <Route path="/me" element={<Ps/>}/>
    <Route path='/carousel' element={<Carousel/>}/>
    <Route path="/debounce" element={<Debounce/>}/>
    <Route path="/accordion2" element={<Accordion2/>}></Route>
    <Route path="/canvas" element={<DrawingCanvas/>}></Route>
    <Route path="/canvas" element={   
  <TodoProvider>
    <TodoApp />
  </TodoProvider>}></Route>


  <Route path="/countre" element={<Countre/>}/>

      </Routes>
    </Router>
  );
}

export default App;