import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import {
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, CardMedia, Avatar, IconButton, Box, Dialog,
  DialogContent, DialogContentText, DialogActions, Button
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableProvided,
  DroppableProvided,
  DraggableStateSnapshot
} from "react-beautiful-dnd";

// Import Components
import StockForm from "./StockForm";

// Import Types
import { IStock } from "../../../types/StockTypes";

// Import Actions
import { getAllProducts, deleteProduct } from "../../../actions/productActions";

const TableView = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState<IStock>();
  const [visibleConfirmModal, setVisibleConfirmModal] = useState(false);
  const [productList, setProductList] = useState<any>();

  const products = useAppSelector((state) => state.products.list).filter((item) => item.merchantid?.toString() === id);
  const groups = useAppSelector((state) => state.products.productGroups).filter((group) => group.merchantid === id);

  const handleCloseModal = () => {
    setVisibleEditModal(false);
  };

  const showEditModal = (stock: IStock) => {
    setVisibleEditModal(true);
    setSelectedStock(stock);
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const showConfirmDelteModal = (stock: IStock) => {
    setVisibleConfirmModal(true);
    setSelectedStock(stock);
  }

  const handleDeleteProduct = () => {
    setVisibleConfirmModal(false);
    dispatch(deleteProduct(selectedStock?.id));
  };

  useEffect(() => {
    setProductList(products);
  }, [])

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    setProductList((prev: any) => {
      const product = [...prev];
      const d = product[result.destination!.index];
      product[result.destination!.index] = product[result.source.index];
      product[result.source.index] = d;
      return product;
    });
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Logo</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Group</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Published</TableCell>
              <TableCell>Featured</TableCell>
              <TableCell>Image</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="vertical">
              {(droppableProvided: DroppableProvided) => (
                <TableBody ref={droppableProvided.innerRef}{...droppableProvided.droppableProps}>
                  {productList?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8}>There is no products</TableCell>
                    </TableRow>
                  )}
                  {productList?.length > 0 && productList?.map((stock: any, index: number) => (
                    <Draggable key={stock.id} draggableId={stock.id} index={index}>
                      {(draggableProvided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
                        return (
                          <TableRow
                            ref={draggableProvided.innerRef}
                            style={{ ...draggableProvided.draggableProps.style }}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
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
                            <TableCell>{groups.find((group) => group.id === stock.prod_group)?.name}</TableCell>
                            <TableCell>€{stock.price}</TableCell>
                            <TableCell>{stock.quantity}</TableCell>
                            <TableCell>{stock.published ? 'Yes' : 'No'}</TableCell>
                            <TableCell>{stock.featured ? 'Yes' : 'No'}</TableCell>
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
                                <IconButton aria-label="delete" color="secondary" onClick={() => showConfirmDelteModal(stock)}>
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
            <Button onClick={() => handleDeleteProduct()}>Yes</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default TableView;