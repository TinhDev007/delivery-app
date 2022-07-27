import axios from 'axios';
import BaseApi from './BaseApi';

class AuthApi extends BaseApi {  
  userLogin(data: any) {
    return axios.post(
      this.REACT_APP_SERVER_URL + 'users/login',
      data,
      {      
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  userRegister(data: any) {
    return axios.post(
      this.REACT_APP_SERVER_URL + 'users/signup',
      data,
      {      
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}

export default new AuthApi();