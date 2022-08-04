import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import { 
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Box,
  Dialog, 
  DialogContent, DialogContentText, DialogActions, Button
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

// Import Components
import ProductGroupForm from "./ProductGroupForm";

// Import Types
import { IGroup } from "../../../types/GroupType";

// Import Actions
import { getProductGroupsByMerchantId, deleteProductGroup } from "../../../actions/productActions";

const TableView = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [editForm, setEditForm] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<IGroup>();

  const groups = useAppSelector((state) => state.products.productGroups);

  useEffect(() => {
    dispatch(getProductGroupsByMerchantId(id));
  }, [dispatch, id]);

  const showEditModal = (group: IGroup) => {
    setEditForm(true);
    setSelectedGroup(group);   
  };

  const showDeleteConfirmModal = (group: IGroup) => {
    setSelectedGroup(group);
    setConfirmModal(true);
  };

  const handleCloseModal = () => {
    setEditForm(false);
  };

  const handleDeleteProductGroup = () => {
    setConfirmModal(false);
    dispatch(deleteProductGroup(selectedGroup?.id));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>              
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map((group) => (
              <TableRow
                key={group.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  {group.name}
                </TableCell>                
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 90 }}>
                    <IconButton aria-label="edit" color="primary" onClick={() => showEditModal(group)} size="small">
                      <Edit />
                    </IconButton>
                    <IconButton aria-label="delete" color="secondary" onClick={() => showDeleteConfirmModal(group)} size="small">
                      <Delete />
                    </IconButton>
                  </Box>                
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {editForm && (
        <ProductGroupForm
          mode="Edit"
          open={editForm}
          closeModal={() => handleCloseModal()}
          group={selectedGroup}
        />
      )}
      {confirmModal && (
        <Dialog open={confirmModal} onClose={() => setConfirmModal(false)}>          
          <DialogContent>
            <DialogContentText>
              Are you sure to delete this product group?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmModal(false)}>No</Button>
            <Button onClick={() => handleDeleteProductGroup()}>Yes</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}

export default TableView;
