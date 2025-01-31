import { motion } from "framer-motion";

const GlassLoginCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4 }}
      className="max-w-md mx-auto p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-lg border border-white border-opacity-30"
    >
      <h2 className="text-2xl font-semibold text-white text-center">Welcome</h2>
      <p className="text-white text-opacity-80 text-center">Sign in to continue</p>
      <input
        type="email"
        placeholder="Email"
        className="mt-4 w-full p-2 bg-white bg-opacity-20 text-white rounded-lg outline-none"
      />
      <input
        type="password"
        placeholder="Password"
        className="mt-2 w-full p-2 bg-white bg-opacity-20 text-white rounded-lg outline-none"
      />
      <button className="mt-4 w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Login
      </button>
    </motion.div>
  );
};

export default GlassLoginCard;
