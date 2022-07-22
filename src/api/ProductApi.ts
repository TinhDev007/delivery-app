import axios from 'axios';
import BaseApi from './BaseApi';

class ProductApi extends BaseApi {  
  getAllProducts() {
    return axios.get(
      this.REACT_APP_SERVER_URL + 'products',      
      {        
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  getProductsByMerchantID(merchantID: string | undefined) {
    return axios.get(
      this.REACT_APP_SERVER_URL + 'products/' + merchantID,      
      {        
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  createProduct(data: any) {
    return axios.post(
      this.REACT_APP_SERVER_URL + 'products/create',
      data,
      {      
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  updateProduct(data: any, productID: string) {
    return axios.put(
      this.REACT_APP_SERVER_URL + "products/" + productID,
      data,
      {      
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  deleteProduct(id: string | undefined) {
    return axios.delete(
      this.REACT_APP_SERVER_URL + "products/" + id
    );
  }

  getAllProductGroups() {
    return axios.get(
      this.REACT_APP_SERVER_URL + 'productgroups',
      {        
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  createProductGroup(data: any) {
    return axios.post(
      this.REACT_APP_SERVER_URL + 'productgroups/create',
      data,
      {      
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}

export default new ProductApi();