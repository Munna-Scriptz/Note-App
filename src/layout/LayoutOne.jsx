import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import ResNav from '../components/ResNav'

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
      <ResNav/>
      <Outlet/>
    </>
  )
}

export default LayoutOne