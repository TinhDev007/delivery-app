import { createSlice } from '@reduxjs/toolkit'
import { IGroup } from '../../types/GroupType';
import { IStock } from "../../types/StockTypes";

interface ProductsState {
  isLoading: boolean,
  error: string,
  list: IStock[],
  merchantProducts: IStock[],
  productGroups: IGroup[]
}

const initialState: ProductsState = {
  isLoading: false,
  error: "",
  list: [],
  merchantProducts: [],
  productGroups: []
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
    updateProductOrderRequest: (state, action) => {},
    updateProductOrderSuccess: (state, action) => {
      const { payload } = action;
      console.log('payload', payload);
      const originalIndex = state.list.findIndex((item) => item.order === payload.originalOrder);
      state.list[originalIndex].order = payload.destinationOrder;
      const destinationIndex = state.list.findIndex((item) => item.order === payload.destinationOrder);
      state.list[destinationIndex].order = payload.originalOrder;
    },
    updateProductOrderFailure: (state, action) => {},
    deleteProductRequest: () => {},
    deleteProductSuccess: (state, action) => {
      const { payload } = action;
      state.list = state.list.filter((item) => item.id !== payload);
    },
    deleteProductFailure: (state, action) => {},
    getAllProductGroupsRequest: () => {},
    getAllProductGroupsSuccess: (state, action) => {
      const { payload } = action;
      state.productGroups = payload;
    },
    getAllProductGroupsFailure: (state, action) => {
      
    },
    createProductGroupRequest: () => {},
    createProductGroupSuccess: (state, action) => {
      const { payload } = action;
      state.productGroups = [ ...state.productGroups, payload];
    },
    createProductGroupFailure: (state, action) => {},
    updateProductGroupRequest: () => {},
    updateProductGroupSuccess: (state, action) => {
      const { payload } = action;
      const index = state.productGroups.findIndex((item) => item.id === payload.id);
      state.productGroups[index] = payload;
    },
    updateProductGroupFailure: (state, action) => {},
    deleteProductGroupRequest: (state, action) => {},
    deleteProductGroupSuccess: (state, action) => {
      const { payload } = action;
      state.productGroups = state.productGroups.filter((item) => item.id !== payload);
    },
    deleteProductGroupFailure: (state, action) => {}    
  },
})

export const { 
  getProductsRequest, getProductsSuccess, getProductsFailure,
  createProductRequest, createProductSuccess, createProductFailure,
  updateProductRequest, updateProductSuccess, updateProductFailure,
  updateProductOrderRequest, updateProductOrderSuccess, updateProductOrderFailure,
  deleteProductRequest, deleteProductSuccess, deleteProductFailure,
  getProductsByMerchantIDRequest, getProductsByMerchantIDSuccess, getProductsByMerchantIDFailure,
  getAllProductGroupsRequest, getAllProductGroupsSuccess, getAllProductGroupsFailure,
  createProductGroupRequest, createProductGroupSuccess, createProductGroupFailure,
  updateProductGroupRequest, updateProductGroupSuccess, updateProductGroupFailure,
  deleteProductGroupRequest, deleteProductGroupSuccess, deleteProductGroupFailure  

} = productsSlice.actions;

export default productsSlice.reducer