import React,  { useState } from "react";
import { Dispatch } from 'redux';
import { useDispatch } from "react-redux";
import { TextField, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, Fab, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { AddPhotoAlternate } from '@mui/icons-material';
import { SelectChangeEvent } from '@mui/material/Select';
import { IStock } from "../../../types/StockTypes";
import { Groups } from "../../../constants/Groups";
import { createProductSuccess, updateProductSuccess } from "../../../redux/reducer/productsReducer";

interface IProps {
  mode: string,
  open: boolean,
  stock?: IStock
  closeModal: () => void;
}

const StockForm = (props: IProps) => {
  const { open, closeModal, stock, mode } = props;
  const dispatch: Dispatch<any> = useDispatch();

  const stockFormData = {
    name: "",
    description: "",
    price: "",
    quantity: "",
    image: "",
    logo: "",
    group: ""
  };

  const [stockData, setStockData] = useState(stock ? stock : stockFormData);

  const handleChange = (event:  SelectChangeEvent | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => {
    const { value, files } = event.target as HTMLInputElement;

    const file = !files?.length ? new Blob() : files[0];

    setStockData((stockData) => {
      return {
        ...stockData, [fieldName]: (fieldName === 'logo' || fieldName === 'image') ? URL.createObjectURL(file) : value
      }
    });
  };

  const handleSubmit = () => {
    if (mode === 'create') {
      dispatch(createProductSuccess(stockData));
    } else {
      dispatch(updateProductSuccess(stockData));
    }
    closeModal();
  }

  return (
    <Dialog open={open} onClose={closeModal}>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>{mode} Product</DialogTitle>
      <DialogContent>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sx={{ marginY: 1 }}>
            <TextField
              id="merchant-name"
              value={stockData?.name} 
              label="Name" 
              variant="outlined" 
              fullWidth 
              onChange={(event) => handleChange(event, 'name')}
            />
          </Grid>
          <Grid item xs={6} sx={{ marginY: 1 }}>
            <TextField
              label="Price"
              variant="outlined"
              type="number"
              fullWidth
              value={stockData?.price}
              onChange={(event) => handleChange(event, 'price')}
            />
          </Grid>
          <Grid item xs={6} sx={{ marginY: 1 }}>
            <TextField
              label="Quantity"
              variant="outlined"
              fullWidth
              type="number"
              value={stockData?.quantity}
              onChange={(event) => handleChange(event, 'quantity')}
            />
          </Grid>
          <Grid item xs={12} sx={{ marginY: 1 }}>
            <FormControl fullWidth>
              <InputLabel id="product-group">Group</InputLabel>
              <Select
                labelId="product-group"
                id="product-group-select"
                value={stockData?.group}
                label="Group"
                onChange={(event) => handleChange(event, 'group')}
              >
                {Groups.map((groupItem) => (
                  <MenuItem value={groupItem.id} key={groupItem.id}>{groupItem.name}</MenuItem>  
                ))}                
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ marginY: 1 }}>
            <TextField
              id="merchant-description"
              label="Description"
              placeholder="Description"
              multiline
              fullWidth
              value={stockData?.description}
              onChange={(event) => handleChange(event, 'description')}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginY: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }} >
              <label htmlFor="select-logo" style={{ marginBottom: 10 }}>Logo</label>
              <input 
                accept="image/*" 
                type="file" 
                id="select-logo"
                style={{ display: 'none' }}
                onChange={(event) => handleChange(event, 'logo')}
              />
              <label htmlFor="select-logo">
                {stockData.logo ? (
                  <img src={stockData.logo} alt="" style={{ width: "100%"}} />
                ) : (
                  <Fab component="span">
                    <AddPhotoAlternate />
                  </Fab>
                )}
              </label>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginY: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }} >
              <label htmlFor="select-image" style={{ marginBottom: 10 }}>Image</label>        
              <input 
                accept="image/*" 
                type="file" 
                id="select-image"
                style={{ display: 'none' }}
                onChange={(event) => handleChange(event, 'image')}
              />
              <label htmlFor="select-image">
                {stockData.image ? (
                  <img src={stockData.image} alt="" style={{ width: "100%"}} />
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

export default StockForm;
