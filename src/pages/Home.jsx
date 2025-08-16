import React from "react";
import { FaPlus,FaStickyNote } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#202124] transition-colors pt-6">
      {/* Add Note Input */}
      <div className="flex items-center w-[80%] max-w-2xl mx-auto bg-white dark:bg-[#2d2e30] rounded-lg px-4 py-3 shadow-md">
        <FaStickyNote className="text-gray-500 mr-3" />
        <input
          type="text"
          placeholder="Take a note..."
          className="bg-transparent w-full outline-none dark:text-white"
        />
      </div>

      {/* Demo Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-[#2d2e30] p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="font-bold mb-2 dark:text-white">Note Title {i + 1}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              This is a sample note content to see how it will look in the grid layout.
            </p>
          </div>
        ))}
      </div>

      {/* Floating Add Button */}
      <button className="fixed bottom-6 right-6 bg-[#fbbc04] hover:bg-yellow-500 text-white rounded-full p-4 shadow-lg transition">
        <FaPlus size={22} />
      </button>
    </div>
  );
};

export default Home;
