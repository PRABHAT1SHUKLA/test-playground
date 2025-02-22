import React, { useState, useEffect, useContext, useRef, useMemo, useCallback, createContext } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Info } from "lucide-react";

const HookContext = createContext();

const HookExplanation = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const ref = useRef(null);
  const value = useContext(HookContext);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  const expensiveCalculation = useMemo(() => count * 10, [count]);

  const handleClick = useCallback(() => {
    alert("Button clicked!");
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold flex items-center gap-2"><Info size={20} /> useState</h3>
          <p className="text-gray-600">Manages state in functional components.</p>
          <p className="mt-2">Count: {count}</p>
          <Button onClick={() => setCount(count + 1)}>Increment</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold flex items-center gap-2"><Info size={20} /> useEffect</h3>
          <p className="text-gray-600">Runs side effects after rendering.</p>
          <p>Open console to see effect.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold flex items-center gap-2"><Info size={20} /> useContext</h3>
          <p className="text-gray-600">Provides a way to pass data without prop drilling.</p>
          <p>Context Value: {value}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold flex items-center gap-2"><Info size={20} /> useRef</h3>
          <p className="text-gray-600">Accesses DOM elements or keeps mutable values.</p>
          <input ref={ref} placeholder="Type here..." className="border p-2 mt-2 w-full" />
          <Button onClick={() => ref.current.focus()} className="mt-2">Focus Input</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold flex items-center gap-2"><Info size={20} /> useMemo</h3>
          <p className="text-gray-600">Memoizes expensive calculations.</p>
          <p>Expensive Calculation: {expensiveCalculation}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold flex items-center gap-2"><Info size={20} /> useCallback</h3>
          <p className="text-gray-600">Memoizes functions to prevent unnecessary re-creations.</p>
          <Button onClick={handleClick}>Click Me</Button>
        </CardContent>
      </Card>
    </div>
  );
};

const HooksShowcase = () => {
  return (
    <HookContext.Provider value="Hello from Context!">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <HookExplanation />
      </motion.div>
    </HookContext.Provider>
  );
};

export default HooksShowcase;
