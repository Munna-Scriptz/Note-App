import React from 'react'
import { FaBell, FaMoon, FaSearch, FaSignOutAlt, FaUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'
import { userInfo } from '../slice/LoginInfoSlice'
import Logo from '../assets/images/Logo.png'
import homeIcon from '../assets/images/homeIcon.svg'
import binIcon from '../assets/images/binIcon.svg'
import { FaBarsStaggered } from 'react-icons/fa6'
import { IoSunny } from 'react-icons/io5'

const ResNavbar = () => {
    // --------Redux Data----------
        const reduxData = useSelector((state)=>state.MyRedux.value)
        const dispatch = useDispatch()
    
        const handleData = () =>{
          dispatch(userInfo(null))
          localStorage.removeItem('userInfo')
        }
  return (
    <>
    <nav className="lg:hidden flex items-center justify-between px-[16px] py-5 bg-[#2d2e30] shadow-md sticky top-0 z-50">
        {/* Search Bar */}
        <div className="flex items-center w-[200px] bg-[#3c3d3f] rounded-full px-4 py-2 sm:mb-0">
          <FaSearch className="text-gray-500 mr-3" />
          <input
            type="text"
            placeholder="Search notes..."
            className="bg-transparent w-full outline-none dark:text-white"
          />
        </div>

        {/* Icons */}
        <div className='flex items-center gap-3'>
          <IoSunny size={25} className='cursor-pointer'/>
          <FaBarsStaggered size={25} className='cursor-pointer' />
        </div>
    </nav>
    </>
  )
}

export default ResNavbar