import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ExpandingCard() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleCard = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <motion.div
      onClick={toggleCard}
      className="cursor-pointer flex items-center justify-center w-64 h-40 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg shadow-lg overflow-hidden"
      animate={{
        width: isExpanded ? 400 : 256,
        height: isExpanded ? 300 : 160,
      }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      <motion.div
        animate={{ opacity: isExpanded ? 1 : 0 }}
        transition={{ delay: 0.3 }}
        className="text-white text-lg font-bold text-center"
      >
        {isExpanded ? "Click to Collapse" : "Click to Expand"}
      </motion.div>
    </motion.div>
  );
}
