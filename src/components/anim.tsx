import React from "react";
import { motion } from "framer-motion";

export default function BouncingButton() {
  return (
    <motion.button
      className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg"
      whileHover={{
        y: -10, // Moves up when hovered
        transition: { type: "spring", stiffness: 300 },
      }}
      whileTap={{
        scale: 0.9, // Shrinks when clicked
      }}
    >
      Click Me!
    </motion.button>
  );
}
