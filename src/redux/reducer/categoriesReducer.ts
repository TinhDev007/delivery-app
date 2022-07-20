import { createSlice } from '@reduxjs/toolkit';
import { ICategory } from '../../types/CategoryTypes';

interface CategoriesState {
  isLoading: boolean,
  list: ICategory[]
}

const initialState: CategoriesState = {
  isLoading: false,
  list: [],
}

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCategoriesRequest: () => {},
    getCategoriesSuccess: (state, action) => {
      const { payload } = action;
      state.list = payload;
    },
    getCategoriesFailure: () => {
      
    },
    createCategoryRequest: () => {},
    createCategorySuccess: (state, action) => {
      const { payload } = action;
      state.list = state.list.concat(payload);
    },
    createCategoryFailure: () => {},
    updateCategoryRequest: () => {},
    updateCategorySuccess: (state, action) => {
      const { payload } = action;
      const index = state.list.findIndex((item) => item.id === payload.id);
      state.list[index] = payload;
    },
    updateCategoryFailure: () => {},
    deleteCategoryRequest: () => {},
    deleteCategorySuccess: (state, action) => {
      const { payload } = action;
      state.list = state.list.filter((category) => category.id !== payload );
    },
    deleteCategoryFailure: () => {}
  },
})

export const {
  getCategoriesRequest, getCategoriesSuccess, getCategoriesFailure,
  createCategoryRequest, createCategorySuccess, createCategoryFailure,
  updateCategoryRequest, updateCategorySuccess, updateCategoryFailure,
  deleteCategoryRequest, deleteCategorySuccess, deleteCategoryFailure,
} = categoriesSlice.actions;

export default categoriesSlice.reducer