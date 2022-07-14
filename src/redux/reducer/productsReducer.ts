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
  },
})

export const { getProductsRequest, getProductsSuccess, getProductsFailure } = productsSlice.actions;

export default productsSlice.reducer