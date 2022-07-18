import React, { useState } from "react";
import { Dispatch } from 'redux';
import { useDispatch } from "react-redux";
import {
  TextField,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
  Box
} from "@mui/material";
import { AddPhotoAlternate } from '@mui/icons-material';
import { ICategory } from "../../types/CategoryTypes";
import { createCategorySuccess, updateCategorySuccess } from '../../redux/reducer/categoriesReducer';

interface IProps {
  mode: string,
  open: boolean,
  category?: ICategory
  closeModal: () => void;
}

const CategoryForm = (props: IProps) => {
  const dispatch: Dispatch<any> = useDispatch();
  const { open, closeModal, category, mode } = props;
  const categoryFormData = {
    name: "",
    image: "",
  };

  const [categoryData, setCategoryData] = useState(category ? category : categoryFormData);

  const handleChange = (event:  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => {
    setCategoryData((categoryData) => {
      return {
        ...categoryData, [fieldName]: event.target.value
      }
    });
  };

  const handleSubmit = () => {
    closeModal();
    if (mode === 'Create') {
      dispatch(createCategorySuccess(categoryData));
    } else {
      dispatch(updateCategorySuccess(categoryData));
    }
  };

  return (
    <Dialog open={open} onClose={closeModal}>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>{mode} Category</DialogTitle>
      <DialogContent>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sx={{ marginY: 2 }}>
            <TextField
              id="merchant-name"
              value={categoryData?.name} 
              label="Name" 
              variant="outlined" 
              fullWidth 
              onChange={(event) => handleChange(event, 'name')}
            />
          </Grid>          
          <Grid item xs={12} sx={{ marginY: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }} >
              <label htmlFor="select-logo" style={{ marginBottom: 10 }}>Logo</label>
              <input 
                accept="image/*" 
                type="file" 
                id="select-logo"
                style={{ display: 'none' }}
              />
              <label htmlFor="select-logo">
                {categoryData?.image ? (
                  <img src={categoryData?.image} alt="" />
                ) : (
                  <Fab component="span">
                    <AddPhotoAlternate />
                  </Fab>
                )}
              </label>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} variant="outlined">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryForm;
