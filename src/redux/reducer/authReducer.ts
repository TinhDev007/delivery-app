import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isLoading: boolean
}

const initialState: AuthState = {
  isLoading: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerRequest: (state, action) => {},
    registerSuccess: (state, action) => {},
    registerFailure: (state, action) => {},
    loginRequest: (state, action) => {},
    loginSuccess: (state, action) => {},
    loginFailure: (state, action) => {},    
  },
})

export const { 
  registerRequest, registerSuccess, registerFailure,
  loginRequest, loginSuccess, loginFailure
} = authSlice.actions;

export default authSlice.reducer