import React, { useState } from "react";
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
  Box
} from "@mui/material";
import { AddPhotoAlternate } from '@mui/icons-material';
import { IMerchant } from '../../../types/MerchantTypes';
import { SelectChangeEvent } from '@mui/material/Select';

import { createMerchant, updateMerchant } from "../../../actions/merchantActions";

import { RootState } from "../../../redux/store";

interface IProps {
  mode: string,
  open: boolean,
  merchant?: IMerchant
  closeModal: () => void;
}

const MerchantForm = (props: IProps) => {
  const dispatch: Dispatch<any> = useDispatch();
  const { open, closeModal, merchant, mode } = props;
  const merchantFormData = {
    name: "",
    description: "",
    category: "",
    address: "",
    email: "",
    phone: "",
    logo: "",
    image: "",
  };
  const [merchantData, setMerchantData] = useState(merchant ? merchant : merchantFormData);

  const categories = useSelector((state: RootState) => state.categories.list);

  const handleSubmit = () => {
    closeModal();
    if (mode === 'Create') {
      const formData = new FormData();
      formData.append( "name", merchantData.name);
      formData.append( "description", merchantData.description);
      formData.append( "category", merchantData.category);
      formData.append( "address", merchantData.address);
      formData.append( "email", merchantData.email);
      formData.append( "phone", merchantData.phone);
      formData.append( "logo", merchantData.logo);
      formData.append( "image", merchantData.image);
      dispatch(createMerchant(formData));
    } else {
      const formData = new FormData();
      formData.append( "name", merchantData.name);
      formData.append( "description", merchantData.description);
      formData.append( "category", merchantData.category);
      formData.append( "address", merchantData.address);
      formData.append( "email", merchantData.email);
      formData.append( "phone", merchantData.phone);
      formData.append( "logo", merchantData.logo);
      formData.append( "image", merchantData.image);
      dispatch(updateMerchant(merchantData));
    }
  };

  const handleChange = (event: SelectChangeEvent | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => {
    const { value, files } = event.target as HTMLInputElement;

    const file = !files?.length ? new Blob() : files[0];

    setMerchantData((merchantData) => {
      return {
        ...merchantData, [fieldName]: (fieldName === 'logo' || fieldName === 'image') ? file : value
      }
    });
  };

  return (
    <Dialog open={open} onClose={closeModal}>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>{mode} Merchant</DialogTitle>
      <DialogContent>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6} sx={{ marginY: 2 }}>
            <TextField
              id="merchant-name"
              value={merchantData?.name} 
              label="Name" 
              variant="outlined" 
              fullWidth 
              onChange={(event) => handleChange(event, 'name')}
            />
          </Grid>
          <Grid item xs={6} sx={{ marginY: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                label="Category"
                value={merchantData.category}
                onChange={(event) => handleChange(event, 'category')}
              >
                {categories.map((category) => (
                  <MenuItem value={category.name} key={category.id} sx={{ textTransform: 'uppercase'}}>{category.name.toUpperCase()}</MenuItem>
                ))}                
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ marginY: 2 }}>
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              value={merchantData.address}
              onChange={(event) => handleChange(event, 'address')}
            />
          </Grid>
          <Grid item xs={6} sx={{ marginY: 2 }}>
            <TextField
              label="Contact Mail"
              variant="outlined"
              fullWidth
              type="email"
              value={merchantData.email}
              onChange={(event) => handleChange(event, 'email')}
            />
          </Grid>
          <Grid item xs={6} sx={{ marginY: 2 }}>
            <TextField
              label="Contact Number"
              variant="outlined"
              fullWidth
              value={merchantData.phone}
              onChange={(event) => handleChange(event, 'phone')}
            />
          </Grid>          
          <Grid item xs={12}>
            <TextField
              id="merchant-description"
              label="Description"
              placeholder="Description"
              multiline
              fullWidth
              value={merchantData.description}
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
                {merchantData.logo ? (
                  <img src={merchantData.logo} alt="" />
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
                {merchantData.image ? (
                  <img src={merchantData.image} alt="" style={{ width: "100%"}} />
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

export default MerchantForm;
