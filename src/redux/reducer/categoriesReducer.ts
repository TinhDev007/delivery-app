import { createSlice } from '@reduxjs/toolkit';
import { Categories } from '../../constants/Categories';
import { ICategory } from '../../types/CategoryTypes';

interface CategoriesState {
  isLoading: boolean,
  list: ICategory[]
}

const initialState: CategoriesState = {
  isLoading: false,
  list: Categories,
}

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCategoriesRequest: () => {},
    getCategoriesSuccess: (state) => {
      
    },
    getCategoriesFailure: () => {
      
    },
  },
})

export const { getCategoriesRequest, getCategoriesSuccess, getCategoriesFailure } = categoriesSlice.actions;

export default categoriesSlice.reducer