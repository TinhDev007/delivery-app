import React,  { useState } from "react";
import { TextField, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, Fab, Box } from "@mui/material";
import { AddPhotoAlternate } from '@mui/icons-material';
import { IStock } from "../../../types/StockTypes";

interface IProps {
  mode: string,
  open: boolean,
  stock?: IStock
  closeModal: () => void;
}

const StockForm = (props: IProps) => {
  const { open, closeModal, stock, mode } = props;

  const stockFormData = {
    name: "",
    description: "",
    price: "",
    quantity: "",
    image: "",
    logo: ""
  };

  const [stockData, setStockData] = useState(stock ? stock : stockFormData);

  const handleChange = (event:  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => {
    const { value, files } = event.target as HTMLInputElement;

    if (!files?.length) {
      return;
    }

    const file = files[0];

    setStockData((stockData) => {
      return {
        ...stockData, [fieldName]: (fieldName === 'logo' || fieldName === 'image') ? value : URL.createObjectURL(file)
      }
    });
  };

  const handleSubmit = () => {
    closeModal();
  }

  return (
    <Dialog open={open} onClose={closeModal}>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>{mode} Product</DialogTitle>
      <DialogContent>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sx={{ marginY: 2 }}>
            <TextField
              id="merchant-name"
              value={stockData?.name} 
              label="Name" 
              variant="outlined" 
              fullWidth 
              onChange={(event) => handleChange(event, 'name')}
            />
          </Grid>
          <Grid item xs={6} sx={{ marginY: 2 }}>
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              value={stockData?.price}
              onChange={(event) => handleChange(event, 'price')}
            />
          </Grid>
          <Grid item xs={6} sx={{ marginY: 2 }}>
            <TextField
              label="Quantity"
              variant="outlined"
              fullWidth
              type="number"
              value={stockData?.quantity}
              onChange={(event) => handleChange(event, 'quantity')}
            />
          </Grid>
          <Grid item xs={12}>
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
