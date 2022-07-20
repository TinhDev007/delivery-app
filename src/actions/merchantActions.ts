import { Dispatch } from "redux";

import MerchantApi from "../api/MerchantApi";
import {
  getMerchantsSuccess, getMerchantsFailure,
  createMerchantSuccess,
  updateMerchantSuccess,
  deleteMerchantSuccess
} from "../redux/reducer/merchantsReducer";

export const getAllMerchants = () => {
  return async (dispatch: Dispatch) => {
    return MerchantApi
      .getAllMerchants()
      .then(resp => {
          return dispatch(getMerchantsSuccess(resp.data.data))
        })
      .catch(error => {
        // return dispatch(getMerchantsFailure(error.response.data))
      });
  };  
};

export const createMerchant = (data: any) => {
  return async (dispatch: Dispatch) => {
    return MerchantApi
      .createMerchant(data)
      .then(resp => {
          return dispatch(createMerchantSuccess(resp.data.data))
        })
      .catch(error => {
        console.log('error', error);
        // return dispatch(getMerchantsFailure(error.response.data))
      });
  };  
};

export const updateMerchant = (data: any, merchantID: string) => {
  return async (dispatch: Dispatch) => {
    return MerchantApi
      .updateMerchant(data, merchantID)
      .then(resp => {
          return dispatch(updateMerchantSuccess(resp.data.data))
        })
      .catch(error => {
        console.log('error', error);
        // return dispatch(getMerchantsFailure(error.response.data))
      });
  };  
};


export const deleteMerchant = (merchantID: string | undefined) => {
  return async (dispatch: Dispatch) => {
    return MerchantApi
      .deleteMerchant(merchantID)
      .then(resp => {
          return dispatch(deleteMerchantSuccess(merchantID))
        })
      .catch(error => {
        console.log('error', error);
        // return dispatch(getMerchantsFailure(error.response.data))
      });
  };  
};