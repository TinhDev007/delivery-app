import { Dispatch } from "redux";

import ProductApi from "../api/ProductApi";
import {
  getProductsSuccess, getProductsFailure,
  createProductSuccess, createProductFailure,
  updateProductSuccess, updateProductFailure,
  deleteProductSuccess, deleteProductFailure,
  getProductsByMerchantIDSuccess, getProductsByMerchantIDFailure
} from "../redux/reducer/productsReducer";

export const getAllProducts = () => {
  return async (dispatch: Dispatch) => {
    return ProductApi
      .getAllProducts()
      .then(resp => {
        return dispatch(getProductsSuccess(resp.data.data))
        })
      .catch(error => {
        return dispatch(getProductsFailure(error.response.data))
      });
  };  
};

export const getProductsByMerchantID = (merchantID: string | undefined) => {
  return async (dispatch: Dispatch) => {
    return ProductApi
      .getProductsByMerchantID(merchantID)
      .then(resp => {
        return dispatch(getProductsByMerchantIDSuccess(resp.data.data))
        })
      .catch(error => {
        return dispatch(getProductsByMerchantIDFailure(error.response.data))
      });
  };
};

export const createProduct = (data: any) => {
  return async (dispatch: Dispatch) => {
    return ProductApi
      .createProduct(data)
      .then(resp => {
          return dispatch(createProductSuccess(resp.data.data))
        })
      .catch(error => {        
        return dispatch(createProductFailure(error.response.data))
      });
  };  
};

export const updateProduct = (data: any, categoryID: string) => {
  return async (dispatch: Dispatch) => {
    return ProductApi
      .updateProduct(data, categoryID)
      .then(resp => {
          return dispatch(updateProductSuccess(resp.data.data))
        })
      .catch(error => {        
        return dispatch(updateProductFailure(error.response.data))
      });
  };  
};


export const deleteProduct = (productID: string | undefined) => {
  return async (dispatch: Dispatch) => {
    return ProductApi
      .deleteProduct(productID)
      .then(resp => {
          return dispatch(deleteProductSuccess(productID))
        })
      .catch(error => {        
        return dispatch(deleteProductFailure(error.response.data))
      });
  };  
};