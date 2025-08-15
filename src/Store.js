import { configureStore } from '@reduxjs/toolkit'
import LoginInfoSlice from './slice/LoginInfoSlice'

export default configureStore({
  reducer: {
    MyRedux:LoginInfoSlice
  },
})