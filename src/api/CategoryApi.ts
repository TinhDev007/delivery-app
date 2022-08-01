import axios from 'axios';
import BaseApi from './BaseApi';

class CategoryApi extends BaseApi {  
  getAllCategories() {
    return axios.get(
      this.REACT_APP_SERVER_URL + 'categories',      
      {        
        headers: {
          "Content-Type": "application/json"          
        }
      }
    );
  }

  createCategory(data: any) {
    return axios.post(
      this.REACT_APP_SERVER_URL + 'categories/create',
      data,
      {      
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${this.getToken()}`
        }
      }
    );
  }

  updateCategory(data: any, categoryID: string) {
    return axios.put(
      this.REACT_APP_SERVER_URL + "categories/" + categoryID,
      data,
      {      
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${this.getToken()}`
        }
      }
    );
  }

  deleteCategory(id: string | undefined) {
    return axios.delete(
      this.REACT_APP_SERVER_URL + "categories/" + id,
      {
        headers: {
          'Authorization': `Bearer ${this.getToken()}`
        }
      }
    );
  } 
}

export default new CategoryApi();