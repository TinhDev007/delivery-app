import { Dispatch } from "redux";

import AuthApi from "../api/AuthApi";
import {
  loginSuccess, loginFailure,
  registerSuccess, registerFailure,
} from "../redux/reducer/authReducer";

export const userLogin = (data: any) => {
  return async (dispatch: Dispatch) => {
    return AuthApi
      .userLogin(data)
      .then(resp => {
        return dispatch(loginSuccess(resp.data.data))
        })
      .catch(error => {
        return dispatch(loginFailure(error.response.data))
      });
  };  
};

export const userRegister = (data: any) => {
  return async (dispatch: Dispatch) => {
    return AuthApi
      .userRegister(data)
      .then(resp => {
          return dispatch(registerSuccess(resp.data.data))
        })
      .catch(error => {        
        return dispatch(registerFailure(error.response.data))
      });
  };  
};
