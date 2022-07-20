import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { 
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  CardMedia,
  Avatar,
  IconButton,
  Box,
  Dialog, 
  DialogContent, DialogContentText, DialogActions, Button
} from "@mui/material";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import MerchantForm from "./MerchantForm";
import { IMerchant } from "../../../types/MerchantTypes";
import { deleteMerchantSuccess } from "../../../redux/reducer/merchantsReducer";
import { RootState } from "../../../redux/store";
import { deleteMerchant } from "../../../actions/merchantActions";

const TableView = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  const [visibleMerchantFormMdoal, setVisibleMerchantFormMdoal] = useState(false);  
  const [visibleConfirmModal, setVisibleConfirmModal] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState<IMerchant>();

  const merchants = useSelector((state: RootState) => state.merchants.list);

  const handleCloseModal = () => {
    setVisibleMerchantFormMdoal(false);
  };

  const showEditModal = (merchant: IMerchant) => {
    setVisibleMerchantFormMdoal(true);
    setSelectedMerchant(merchant);
  };

  const handleDeleteMerchant = () => {
    setVisibleConfirmModal(false);
    dispatch(deleteMerchant(selectedMerchant?.id));
  };

  const showDeleteConfirmModal = (merchant: IMerchant) => {
    setVisibleConfirmModal(true);
    setSelectedMerchant(merchant)
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
              Name
              </TableCell>
              <TableCell>Logo</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>            
              <TableCell>Address</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Contact Mail</TableCell>
              <TableCell>Image</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {merchants.map((merchant) => (
              <TableRow
                key={merchant.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  {merchant.name}
                </TableCell>
                <TableCell>                
                  <Avatar aria-label="recipe">
                    <img src={merchant.logo} alt="" />
                  </Avatar>
                </TableCell>
                <TableCell>{merchant.description}</TableCell>
                <TableCell>{merchant.category}</TableCell>
                <TableCell>{merchant.address}</TableCell>
                <TableCell>{merchant.phone}</TableCell>
                <TableCell>{merchant.email}</TableCell>
                <TableCell>                  
                  <img src={merchant.image} alt="StoreImage" height={120} />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <IconButton aria-label="view" onClick={() => {navigate("/merchants/" + merchant.id)}}>
                      <RemoveRedEye />
                    </IconButton>
                    <IconButton aria-label="edit" color="primary" onClick={() => showEditModal(merchant)}>
                      <Edit />
                    </IconButton>
                    <IconButton aria-label="delete" color="secondary" onClick={() => showDeleteConfirmModal(merchant)}>
                      <Delete />
                    </IconButton>
                  </Box>                
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {visibleMerchantFormMdoal && (
        <MerchantForm 
          open={visibleMerchantFormMdoal}
          mode="Edit"
          closeModal={() => handleCloseModal()}
          merchant={selectedMerchant}
        />
      )}
      {visibleConfirmModal && (
        <Dialog open={visibleConfirmModal} onClose={() => setVisibleConfirmModal(false)}>          
          <DialogContent>
            <DialogContentText>
              Are you sure to delete this merchant?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setVisibleConfirmModal(false)}>No</Button>
            <Button onClick={() => handleDeleteMerchant()}>Yes</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default TableView;