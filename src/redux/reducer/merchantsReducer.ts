import { createSlice } from '@reduxjs/toolkit';
import { IMerchant } from '../../types/MerchantTypes';

// Define a type for the slice state
interface MerchantsState {
  isLoading: boolean,
  error: string,
  list: IMerchant[]  
}

const initialState: MerchantsState = {
  isLoading: false,
  error: '',
  list: []  
}

export const merchantsSlice = createSlice({
  name: 'merchants',
  initialState,
  reducers: {
    getMerchantsRequest: () => {},
    getMerchantsSuccess: (state, action) => {
      const { payload } = action;
      state.list = payload;
    },
    getMerchantsFailure: (state, action) => {
      const { payload } = action;
      state.error = payload;
    },
    createMerchantRequest: (state, action) => {
      
    },
    createMerchantSuccess: (state, action) => {
      const { payload } = action;
      state.list = [payload, ...state.list];
    },
    createMerchantFailure: (state, action) => {
      const { payload } = action;
      state.error = payload;
    },
    updateMerchantRequest: (state, action) => {},
    updateMerchantSuccess: (state, action) => {
      const { payload } = action;
      const index = state.list.findIndex((item) => item.id === payload.id);
      state.list[index] = payload;
    },
    updateMerchantFailure: (state, action) => {
      const { payload } = action;
      state.error = payload;
    },
    deleteMerchantRequest: (state, action) => {
      
    },
    deleteMerchantSuccess: (state, action) => {
      const { payload } = action; 
      state.list = state.list.filter((item) => item.id !== payload);
    },
    deleteMerchantFailure: (state, action) => {
      const { payload } = action;
      state.error = payload;
    }   
  },
})

export const { 
  getMerchantsRequest, getMerchantsSuccess, getMerchantsFailure,
  createMerchantRequest, createMerchantSuccess, createMerchantFailure,
  updateMerchantRequest, updateMerchantSuccess, updateMerchantFailure,
  deleteMerchantRequest, deleteMerchantSuccess, deleteMerchantFailure
} = merchantsSlice.actions;

export default merchantsSlice.reducer