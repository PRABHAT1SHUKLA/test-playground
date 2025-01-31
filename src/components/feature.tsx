import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

const FeatureCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="max-w-sm mx-auto p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl shadow-lg"
    >
      <div className="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full">
        <Rocket className="w-6 h-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">Lightning Fast</h3>
      <p className="mt-2 text-sm opacity-90">
        Experience blazing fast performance with our optimized platform.
      </p>
    </motion.div>
  );
};

export default FeatureCard;
