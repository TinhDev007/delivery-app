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
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableProvided,
  DroppableProvided
} from "react-beautiful-dnd";

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
  const [groupList, setGroupList] = useState<any>();

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

  useEffect(() => {
    if (groups && groups.length > 0) {
      let data = [...groups]
      const sortList = data?.sort((a: IGroup, b: IGroup) => {
        return a.name > b.name ? 1 : -1;
      })
      setGroupList(sortList);
    }
  }, [groups])

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    setGroupList((prev: any) => {
      const group = [...prev];
      const d = group[result.destination!.index];
      group[result.destination!.index] = group[result.source.index];
      group[result.source.index] = d;
      return group;
    });
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" className="product-group-table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="vertical">
              {(droppableProvided: DroppableProvided) => (
                <TableBody ref={droppableProvided.innerRef}{...droppableProvided.droppableProps}>
                  {groupList?.length > 0 && groupList?.map((group: IGroup, index: number) => (
                    <Draggable key={group.id} draggableId={group.id} index={index}>
                      {(draggableProvided: DraggableProvided) => {
                        return (
                          <TableRow
                            ref={draggableProvided.innerRef}
                            style={{ ...draggableProvided.draggableProps.style }}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                          >
                            <TableCell style={{ width: '100%' }} >{group.name}</TableCell>
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
                        );
                      }}
                    </Draggable>
                  ))}
                  {droppableProvided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </DragDropContext>
        </Table >
      </TableContainer >
      {editForm && (
        <ProductGroupForm
          mode="Edit"
          open={editForm}
          closeModal={() => handleCloseModal()}
          group={selectedGroup}
        />
      )}
      {
        confirmModal && (
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
        )
      }
    </>
  )
}

export default TableView;
