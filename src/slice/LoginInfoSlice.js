import { createSlice } from '@reduxjs/toolkit'

export const LoginInfoSlice = createSlice({
  name: 'counter',
  initialState: {
    value: JSON.parse(localStorage.getItem('userInfo')) || null,
  },
  reducers: {
    userInfo: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { userInfo } = LoginInfoSlice.actions

export default LoginInfoSlice.reducer