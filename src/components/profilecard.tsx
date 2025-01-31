import { motion } from "framer-motion";

const ProfileCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4 }}
      className="max-w-sm mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 text-center"
    >
      <img
        src="https://via.placeholder.com/100"
        alt="Profile"
        className="mx-auto w-24 h-24 rounded-full border-4 border-blue-500"
      />
      <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
        John Doe
      </h3>
      <p className="text-gray-600 dark:text-gray-400">Full Stack Developer</p>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
        Follow
      </button>
    </motion.div>
  );
};

export default ProfileCard;
