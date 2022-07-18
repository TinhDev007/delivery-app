import { createSlice } from '@reduxjs/toolkit';
import { Merchants } from '../../constants/Merchant';
import { IMerchant } from '../../types/MerchantTypes';

// Define a type for the slice state
interface MerchantsState {
  isLoading: boolean,
  list: IMerchant[]
}

const initialState: MerchantsState = {
  isLoading: false,
  list: Merchants,
}

export const merchantsSlice = createSlice({
  name: 'merchants',
  initialState,
  reducers: {
    getMerchantsRequest: () => {},
    getMerchantsSuccess: (state) => {
      
    },
    getMerchantsFailure: () => {
      
    },
    createMerchantRequest: (state, action) => {
      
    },
    createMerchantSuccess: (state, action) => {
      const { payload } = action;
      state.list = [payload, ...state.list];
    },
    createMerchantFailure: () => {

    },
    deleteMerchantRequest: (state, action) => {
      
    },
    deleteMerchantSuccess: (state, action) => {      
      state.list = state.list.filter((item) => item.id !== action.payload.merchantId);
    },
    deleteMerchantFailure: () => {},    
  },
})

export const { 
  getMerchantsRequest, getMerchantsSuccess, getMerchantsFailure,
  createMerchantRequest, createMerchantSuccess, createMerchantFailure,
  deleteMerchantRequest, deleteMerchantSuccess, deleteMerchantFailure
} = merchantsSlice.actions;

export default merchantsSlice.reducer