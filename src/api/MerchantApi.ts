import axios from 'axios';
import BaseApi from './BaseApi';

class MerchantApi extends BaseApi {  
  getAllMerchants() {
    return axios.get(
      this.REACT_APP_SERVER_URL + 'merchants',      
      {        
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  getMerchantById(id: string | undefined) {
    return axios.get(
      this.REACT_APP_SERVER_URL + 'merchants/' + id,    
      {        
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  createMerchant(data: any) {
    return axios.post(
      this.REACT_APP_SERVER_URL + 'merchants/create',
      data,
      {      
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${this.getToken()}`
        }
      }
    );
  }

  updateMerchant(data: any, merchantID: string) {
    return axios.put(
      this.REACT_APP_SERVER_URL + "merchants/" + merchantID,
      data,
      {      
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${this.getToken()}`
        }
      }
    );
  }

  deleteMerchant(id: string | undefined) {
    return axios.delete(
      this.REACT_APP_SERVER_URL + "merchants/" + id,
      {      
        headers: {          
          'Authorization': `Bearer ${this.getToken()}`
        }
      }
    );
  } 
}

export default new MerchantApi();