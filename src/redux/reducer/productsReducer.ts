import { createSlice } from '@reduxjs/toolkit'
import { IStock } from "../../types/StockTypes";
import { Stocks } from "../../constants/Stock";

interface ProductsState {
  isLoading: boolean,
  list: IStock[]
}

const initialState: ProductsState = {
  isLoading: false,
  list: Stocks,
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProductsRequest: () => {},
    getProductsSuccess: (state) => {
      
    },
    getProductsFailure: () => {
      
    },
    createProductRequest: () => {},
    createProductSuccess: (state, action) => {
      const { payload } = action;
      state.list = [ ...state.list, payload];
    },
    createProductFailure: () => {},
    updateProductRequest: () => {},
    updateProductSuccess: (state, action) => {
      const { payload } = action;
      const index = state.list.findIndex((item) => item.id === payload.id);
      state.list[index] = payload;
    },
    updateProductFailure: () => {},
    deleteProductRequest: () => {},
    deleteProductSuccess: (state, action) => {
      const { payload } = action;
      state.list = state.list.filter((item) => item.id !== payload);
    },
    deleteProductFailure: () => {},
  },
})

export const { 
  getProductsRequest, getProductsSuccess, getProductsFailure,
  createProductRequest, createProductSuccess, createProductFailure,
  updateProductRequest, updateProductSuccess, updateProductFailure,
  deleteProductRequest, deleteProductSuccess, deleteProductFailure
} = productsSlice.actions;

export default productsSlice.reducer