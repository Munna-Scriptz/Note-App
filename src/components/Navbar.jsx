import React from 'react'
import { FaBell, FaMoon, FaSearch, FaSignOutAlt, FaUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'
import { userInfo } from '../slice/LoginInfoSlice'
import Logo from '../assets/images/Logo.png'
import homeIcon from '../assets/images/homeIcon.svg'
import binIcon from '../assets/images/binIcon.svg'


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
        <nav className="flex flex-wrap items-center justify-between px-4 py-5 bg-[#2d2e30] shadow-md sticky top-0 z-50">
        {/* Logo */}
        <Link to={'/'} className="flex items-center gap-2 mb-2 sm:mb-0">
          <img className='w-[80px] sm:w-[100px]' src={Logo} alt="Logo" />
        </Link>

        {/* Search Bar */}
        <div className="flex items-center w-full sm:w-[40%] bg-[#3c3d3f] rounded-full px-4 py-2 mb-2 sm:mb-0">
          <FaSearch className="text-gray-500 mr-3" />
          <input
            type="text"
            placeholder="Search notes..."
            className="bg-transparent w-full outline-none dark:text-white"
          />
        </div>

        {/* Icons */}
        <div className="flex flex-wrap items-center gap-5 text-gray-300">
          <div className='flex items-center gap-2 mr-2'>
            <Link className='cursor-pointer hover:bg-[#5AADE0] h-[40px] w-[40px] flex items-center justify-center rounded-full' to={'/'}>
              <img className='w-[30px]' src={homeIcon} alt="Home" />
            </Link>
            <Link className='cursor-pointer hover:bg-[#da2a2a] h-[40px] w-[40px] flex items-center justify-center rounded-full' to={'/bin'}>
              <img className='w-[30px]' src={binIcon} alt="Bin" />
            </Link>
          </div>
          <div className="flex items-center gap-[12px]">
            <div className="w-8 h-8 sm:w-10 sm:h-10">
              <img src="/userImage.png" alt="pfp" className="rounded-full" />
            </div>
            <p className="text-sm sm:text-base">{reduxData?.displayName}</p>
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