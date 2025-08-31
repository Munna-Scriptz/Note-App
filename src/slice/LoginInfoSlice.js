import { createSlice } from '@reduxjs/toolkit'

export const LoginInfoSlice = createSlice({
  name: 'counter',
  initialState: {
    value: JSON.parse(localStorage.getItem('userInfo')) || null,
    updated: {} ,
  },
  reducers: {
    userInfo: (state, action) => {
      state.value = action.payload
    },
    updateNote: (state, action) => {
      state.updated = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { userInfo , updateNote } = LoginInfoSlice.actions

export default LoginInfoSlice.reducer