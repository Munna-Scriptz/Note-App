import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import ResNavbar from '../components/ResNavbar'

function LayoutOne() {
  const reduxData = useSelector((state)=>state.MyRedux.value)
  const navigate = useNavigate()

  useEffect(()=>{
    if(reduxData === null){
      navigate('/Register')
    }
  }, [])
  return (
    <>
      <Navbar/>
      <ResNavbar/>
      <Outlet/>
    </>
  )
}

export default LayoutOne