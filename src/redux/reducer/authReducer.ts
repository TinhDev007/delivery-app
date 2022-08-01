import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem("token");

interface AuthState {
  isLoading: boolean,
  error: string,
  loginSuccess: boolean,
  token: string
}

const initialState: AuthState = {
  isLoading: false,
  loginSuccess: false,
  error: '',
  token: token ? token : ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signupRequest: (state, action) => {},
    signupSuccess: (state, action) => {
      state.loginSuccess = true;
    },
    signupFailure: (state, action) => {
      const { payload } = action;
      state.error = payload;
    },
    loginRequest: (state, action) => {},
    loginSuccess: (state, action) => {
      const { token } = action.payload;
      localStorage.setItem("token", token);
    },
    loginFailure: (state, action) => {

    },  
  },
})

export const { 
  signupRequest, signupSuccess, signupFailure,
  loginRequest, loginSuccess, loginFailure
} = authSlice.actions;

export default authSlice.reducer