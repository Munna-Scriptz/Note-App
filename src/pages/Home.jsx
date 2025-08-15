import React from "react";
import { FaSearch, FaPlus, FaBell, FaUserCircle, FaSignOutAlt, FaMoon, FaSun, FaStickyNote } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const Home = () => {
  // --------Redux Data----------
  const reduxData = useSelector((state)=>state.MyRedux.value)
  console.log(reduxData)
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#202124] transition-colors">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 py-5 bg-white dark:bg-[#2d2e30] shadow-md sticky top-0 z-50">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg dark:text-white">MyNotes</span>
        </div>

        {/* Search Bar */}
        <div className="flex items-center w-[50%] bg-gray-100 dark:bg-[#3c3d3f] rounded-full px-4 py-2">
          <FaSearch className="text-gray-500 mr-3" />
          <input
            type="text"
            placeholder="Search notes..."
            className="bg-transparent w-full outline-none dark:text-white"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5 text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-[12px]">
            <div className="w-10 h-10">
              <img src={reduxData.photoURL} alt="pfp" />
            </div>
            <p>{reduxData.displayName}</p>
          </div>
          <FaBell size={20} className="cursor-pointer hover:text-yellow-500" />
          <FaMoon size={20} className="cursor-pointer hover:text-purple-400" />
          <FaUserCircle size={26} className="cursor-pointer hover:text-blue-400" />
          <Link to={'/Register'}><FaSignOutAlt size={20} className="cursor-pointer hover:text-red-500" /></Link>
        </div>
      </nav>

      {/* Add Note Input */}
      <div className="flex items-center w-[80%] max-w-2xl mx-auto mt-6 bg-white dark:bg-[#2d2e30] rounded-lg px-4 py-3 shadow-md">
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
