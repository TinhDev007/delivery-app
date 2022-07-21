import { createSlice } from '@reduxjs/toolkit'
import { IStock } from "../../types/StockTypes";

interface ProductsState {
  isLoading: boolean,
  error: string,
  list: IStock[],
  merchantProducts: IStock[]
}

const initialState: ProductsState = {
  isLoading: false,
  error: "",
  list: [],
  merchantProducts: []
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProductsRequest: () => {},
    getProductsSuccess: (state, action) => {
      const { payload } = action;
      state.list = payload;
    },
    getProductsFailure: (state, action) => {
      
    },
    getProductsByMerchantIDRequest: () => {},
    getProductsByMerchantIDSuccess: (state, action) => {
      const { payload } = action;
      state.merchantProducts = payload;
    },
    getProductsByMerchantIDFailure: (state, action) => {
      
    },
    createProductRequest: () => {},
    createProductSuccess: (state, action) => {
      const { payload } = action;
      state.list = [ ...state.list, payload];
    },
    createProductFailure: (state, action) => {},
    updateProductRequest: () => {},
    updateProductSuccess: (state, action) => {
      const { payload } = action;
      const index = state.list.findIndex((item) => item.id === payload.id);
      state.list[index] = payload;
    },
    updateProductFailure: (state, action) => {},
    deleteProductRequest: () => {},
    deleteProductSuccess: (state, action) => {
      const { payload } = action;
      state.list = state.list.filter((item) => item.id !== payload);
    },
    deleteProductFailure: (state, action) => {},
  },
})

export const { 
  getProductsRequest, getProductsSuccess, getProductsFailure,
  createProductRequest, createProductSuccess, createProductFailure,
  updateProductRequest, updateProductSuccess, updateProductFailure,
  deleteProductRequest, deleteProductSuccess, deleteProductFailure,
  getProductsByMerchantIDRequest, getProductsByMerchantIDSuccess, getProductsByMerchantIDFailure
} = productsSlice.actions;

export default productsSlice.reducer