import React from 'react'
import './App.css'
import Register from './pages/Register'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import LayoutOne from './layout/LayoutOne'
import Home from './pages/Home'
import app from './firebase.config'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import Bin from './pages/Bin'
const App = () => {

  const MyRoute = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path='/' element={<LayoutOne/>}>
        <Route index element={<Home/>}></Route>
        <Route path='/bin' element={<Bin/>}></Route>
      </Route>
        <Route path='/Register' element={<Register/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
    </Route>
  ))

  return (
    <>
      <ToastContainer/>
      <RouterProvider router={MyRoute}></RouterProvider>
    </>
  )
}

export default App