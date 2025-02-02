import { motion } from "framer-motion";

const FancyCard = () => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-white shadow-lg rounded-2xl p-6 w-80 text-center border border-gray-200"
    >
      <h2 className="text-xl font-semibold text-gray-800">Amazing Card ✨</h2>
      <p className="text-gray-600 mt-2">This is a beautifully animated card with modern UI.</p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
      >
        Click Me 🚀
      </motion.button>
    </motion.div>
  );
};

export default FancyCard;
