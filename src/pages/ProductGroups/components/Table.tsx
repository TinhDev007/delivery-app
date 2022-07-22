import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
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
  IconButton,
  Box,
  Dialog, 
  DialogContent, DialogContentText, DialogActions, Button
} from "@mui/material";

import { Delete, Edit } from "@mui/icons-material";
import { IGroup } from "../../../types/GroupType";
import { getAllProductGroups } from "../../../actions/productActions";
import { RootState } from "../../../redux/store";

const productGroups: IGroup[] = [];

const TableView = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const { id } = useParams();

  const groups = useSelector((state: RootState) => state.products.productGroups).filter((group) => group.merchantid === id);

  console.log('groups', groups);

  useEffect(() => {
    dispatch(getAllProductGroups());
  }, [dispatch]);

  const showEditModal = (group: IGroup) => {

  };

  const showDeleteConfirmModal = (group: IGroup) => {

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
    </>
  )
}

export default TableView;
