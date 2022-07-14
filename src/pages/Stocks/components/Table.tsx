import React, { useState } from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, CardMedia, Avatar, IconButton, Box, Dialog, 
  DialogContent, DialogContentText, DialogActions, Button
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Stocks } from "../../../constants/Stock";
import { IStock } from "../../../types/StockTypes";
import StockForm from "./StockForm";

const TableView = () => {
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState<IStock>();
  const [visibleConfirmModal, setVisibleConfirmModal] = useState(false);

  const handleCloseModal = () => {
    setVisibleEditModal(false);
  };

  const showEditModal = (stock: IStock) => {
    setVisibleEditModal(true);
    setSelectedStock(stock)
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
              <TableCell>Price</TableCell>            
              <TableCell>Quantity</TableCell>
              <TableCell>Image</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Stocks.map((stock) => (
              <TableRow
                key={stock.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  {stock.name}
                </TableCell>
                <TableCell>                
                  <Avatar aria-label="recipe">
                    <img src={stock.logo} alt="" />
                  </Avatar>
                </TableCell>
                <TableCell>{stock.description}</TableCell>
                <TableCell>${stock.price}</TableCell>
                <TableCell>{stock.quantity}</TableCell>              
                <TableCell>
                  <CardMedia
                    component="img"
                    height="120"
                    image={stock.image}
                    alt="Store Image"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>                  
                    <IconButton aria-label="edit" color="primary" onClick={() => showEditModal(stock)}>
                      <Edit />
                    </IconButton>
                    <IconButton aria-label="delete" color="secondary" onClick={() => setVisibleConfirmModal(true)}>
                      <Delete />
                    </IconButton>
                  </Box>                
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {visibleEditModal && (
        <StockForm
          open={visibleEditModal}
          mode="Edit"
          closeModal={() => handleCloseModal()}
          stock={selectedStock}
        />
      )}
      {visibleConfirmModal && (
        <Dialog open={visibleConfirmModal} onClose={() => setVisibleConfirmModal(false)}>          
          <DialogContent>
            <DialogContentText>
              Are you sure to delete this product?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setVisibleConfirmModal(false)}>No</Button>
            <Button onClick={() => setVisibleConfirmModal(false)}>Yes</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default TableView;