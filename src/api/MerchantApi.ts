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

  createMerchant(data: any) {
    return axios.post(
      this.REACT_APP_SERVER_URL + 'merchants/create',
      data,
      {      
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  updateMerchant(data: any) {
    return axios.put(
      this.REACT_APP_SERVER_URL + "merchants/" + data.id,
      data,
      {      
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  deleteMerchant(id: string | undefined) {
    return axios.delete(
      this.REACT_APP_SERVER_URL + "merchants/" + id
    );
  } 
}

export default new MerchantApi();