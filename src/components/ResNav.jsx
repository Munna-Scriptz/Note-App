import React, { useState } from 'react'
import { FaAngleLeft, FaBell, FaMoon, FaSearch, FaSignOutAlt, FaUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'
import { userInfo } from '../slice/LoginInfoSlice'
import Logo from '../assets/images/Logo.png'
import homeIcon from '../assets/images/homeIcon.svg'
import binIcon from '../assets/images/binIcon.svg'
import { FaBarsStaggered } from 'react-icons/fa6'
import { IoSunny } from 'react-icons/io5'

const ResNav = () => {

// --------Redux Data----------
    const reduxData = useSelector((state)=>state.MyRedux.value)
    const dispatch = useDispatch()
    
    const handleData = () =>{
        dispatch(userInfo(null))
        localStorage.removeItem('userInfo')
    }


    // -------------Menu State----------------
    const [menu, setMenu] = useState(false)


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
            <FaBarsStaggered onClick={()=>setMenu(!menu)} size={25} className='cursor-pointer' />
        </div>
    </nav>
    {/* --------------------------Menu-------------------------- */}
    {/* Mobile Menu (Bottom Sheet) */}
    <div className={`lg:hidden fixed inset-0 z-[100] transition-opacity ${menu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {/* Black overlay – covers full screen */}
        <div className="absolute inset-0 bg-black/60" onClick={() => setMenu(false)}/>

        {/* Panel */}
        <section className={`absolute bottom-0 left-0 w-full h-[90vh] bg-[#3C3D3F] rounded-t-2xl p-3 pb-[50px] overflow-y-auto transition-transform duration-500 ${ menu ? "translate-y-0" : "translate-y-full" }`}>
            {/* ------------Top Buttons----------- */}
            <div className="flex items-center justify-between mt-1 font-Poppins">
                <button onClick={() => setMenu(false)} className="text-white text-[25px] cursor-pointer">
                    <FaAngleLeft />
                </button>
                <p className="text-white text-lg font-medium">Menu</p>
            </div>
            
            {/* your menu content here */}
            <div>
                <div className="flex flex-wrap flex-col gap-9 text-gray-300 mt-15">
                    <Link onClick={()=>setMenu(!menu)} className='cursor-pointer flex items-center gap-4 text-lg' to={'/'}>
                        <img className='w-[30px]' src={homeIcon} alt="Home" />
                        Home
                    </Link>
                    <Link onClick={()=>setMenu(!menu)} className='cursor-pointer flex items-center gap-4 text-lg' to={'/bin'}>
                        <img className='w-[30px]' src={binIcon} alt="Bin" />
                        Trash
                    </Link>
                    <Link onClick={()=>setMenu(!menu)} className='cursor-pointer flex items-center gap-4 text-lg' to={'/bin'}>
                        <FaBell size={25} className="cursor-pointer hover:text-yellow-500" />
                        Notification
                    </Link>
                    <Link onClick={()=>setMenu(!menu)} className='cursor-pointer flex items-center gap-4 text-lg' to={'/bin'}>
                      <FaMoon size={25} className="cursor-pointer hover:text-purple-400" />
                      Theme
                    </Link>
                    <Link onClick={()=>setMenu(!menu)} className='cursor-pointer flex items-center gap-4 text-lg' to={'/bin'}>
                      <FaUserCircle size={27} className="cursor-pointer hover:text-blue-400" />
                      Profile
                    </Link>
                </div>
            </div>
            <div className="flex items-center justify-between w-[90%] absolute bottom-6 left-[16px] right-[16px]">
                <div className='flex items-center gap-3'>
                    <div className="w-[50px] h-[50px]">
                    <img src="/userImage.png" alt="pfp" className="rounded-full" />
                    </div>
                    <p className="text-xl">{reduxData?.displayName}</p>
                </div>
                <div>
                    <Link className='flex items-center gap-3 font-medium hover:text-red-600 duration-[.3s]' onClick={handleData} to={'/Login'}>Log Out<FaSignOutAlt size={20} className="cursor-pointer hover:text-red-500" /></Link>
                </div>
            </div>
        </section>
    </div>
    </>
  )
}

export default ResNav