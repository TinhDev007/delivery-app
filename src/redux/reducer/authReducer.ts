import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

interface AuthState {
  isLoading: boolean,
  error: string,
  signupSuccessed: boolean,
  loginSuccessed: boolean,
  token: string,
  role: string,
  authenticated: boolean
}

const initialState: AuthState = {
  isLoading: false,
  signupSuccessed: false,
  loginSuccessed: false,
  error: '',
  token: token ? token : '',
  role: role ? role : '',
  authenticated: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signupRequest: (state, action) => {},
    signupSuccess: (state, action) => {
      state.signupSuccessed = true;
    },
    signupFailure: (state, action) => {
      const { payload } = action;
      state.error = payload;
    },
    loginRequest: (state, action) => {},
    loginSuccess: (state, action) => {
      const { token, role } = action.payload;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      state.role = role;
      state.loginSuccessed = true;
      state.authenticated = true;
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