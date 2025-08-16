import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'

function LayoutOne() {
  const reduxData = useSelector((state)=>state.MyRedux.value)
  const navigate = useNavigate()

  useEffect(()=>{
    if(reduxData === null){
      navigate('/Login')
    }
  }, [])
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default LayoutOne