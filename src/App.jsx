import React from 'react'
import './App.css'
import Register from './pages/Register'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import LayoutOne from './layout/LayoutOne'
import Home from './pages/Home'
import app from './firebase.config'
import { ToastContainer } from 'react-toastify'
const App = () => {

  const MyRoute = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path='/' element={<LayoutOne/>}>
        <Route index element={<Home/>}></Route>
        <Route path='/Register' element={<Register/>}></Route>
      </Route>
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