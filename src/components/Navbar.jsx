import React from 'react'
import { FaBell, FaMoon, FaSearch, FaSignOutAlt, FaUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'
import { userInfo } from '../slice/LoginInfoSlice'
import { MdAutoDelete } from 'react-icons/md'
import { IoHomeSharp } from 'react-icons/io5'

const Navbar = () => {
    // --------Redux Data----------
    const reduxData = useSelector((state)=>state.MyRedux.value)
    const dispatch = useDispatch()

    const handleData = () =>{
        dispatch(userInfo(null))
        localStorage.removeItem('userInfo')
    }
  return (
    <>
        <nav className="flex items-center justify-between px-4 py-5 bg-white dark:bg-[#2d2e30] shadow-md sticky top-0 z-50">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg dark:text-white">MyNotes</span>
        </div>

        {/* Search Bar */}
        <div className="flex items-center w-[40%] bg-gray-100 dark:bg-[#3c3d3f] rounded-full px-4 py-2">
          <FaSearch className="text-gray-500 mr-3" />
          <input
            type="text"
            placeholder="Search notes..."
            className="bg-transparent w-full outline-none dark:text-white"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5 text-gray-600 dark:text-gray-300">
          <div className='flex items-center gap-3 mr-2'>
            <Link to={'/'}><IoHomeSharp size={23}  className='cursor-pointer'/></Link>
            <Link to={'/bin'}><MdAutoDelete size={23} className='cursor-pointer' /></Link>
          </div>
          <div className="flex items-center gap-[12px]">
            <div className="w-10 h-10">
              <img src={reduxData?.photoURL} alt="pfp" />
            </div>
            <p>{reduxData?.displayName}</p>
          </div>
          <FaBell size={20} className="cursor-pointer hover:text-yellow-500" />
          <FaMoon size={20} className="cursor-pointer hover:text-purple-400" />
          <FaUserCircle size={26} className="cursor-pointer hover:text-blue-400" />
          <Link onClick={handleData} to={'/Login'}><FaSignOutAlt size={20} className="cursor-pointer hover:text-red-500" /></Link>
        </div>
      </nav>
    </>
  )
}

export default Navbar