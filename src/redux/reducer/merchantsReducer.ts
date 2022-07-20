import { createSlice } from '@reduxjs/toolkit';
import { IMerchant } from '../../types/MerchantTypes';

// Define a type for the slice state
interface MerchantsState {
  isLoading: boolean,
  list: IMerchant[],
  error: string
}

const initialState: MerchantsState = {
  isLoading: false,
  list: [],
  error: ''
}

export const merchantsSlice = createSlice({
  name: 'merchants',
  initialState,
  reducers: {
    getMerchantsRequest: () => {},
    getMerchantsSuccess: (state, action) => {
      state.list = action.payload;
    },
    getMerchantsFailure: (state, action) => {
      state.list = action.payload;
    },
    createMerchantRequest: (state, action) => {
      
    },
    createMerchantSuccess: (state, action) => {
      const { payload } = action;
      state.list = [payload, ...state.list];
    },
    createMerchantFailure: () => {

    },
    updateMerchantRequest: (state, action) => {},
    updateMerchantSuccess: (state, action) => {
      const { payload } = action;
      const index = state.list.findIndex((item) => item.id === payload.id);
      state.list[index] = payload;
    },
    updateMerchantFailure: (state, action) => {},
    deleteMerchantRequest: (state, action) => {
      
    },
    deleteMerchantSuccess: (state, action) => {
      const { payload } = action; 
      state.list = state.list.filter((item) => item.id !== payload);
    },
    deleteMerchantFailure: () => {},    
  },
})

export const { 
  getMerchantsRequest, getMerchantsSuccess, getMerchantsFailure,
  createMerchantRequest, createMerchantSuccess, createMerchantFailure,
  updateMerchantRequest, updateMerchantSuccess, updateMerchantFailure,
  deleteMerchantRequest, deleteMerchantSuccess, deleteMerchantFailure
} = merchantsSlice.actions;

export default merchantsSlice.reducer