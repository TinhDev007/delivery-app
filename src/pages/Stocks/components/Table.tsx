import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import {
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, CardMedia, Avatar, IconButton, Box, Dialog,
  DialogContent, DialogContentText, DialogActions, Button, Accordion, AccordionSummary, Typography, AccordionDetails
} from "@mui/material";
import { Delete, Edit, ExpandMore } from "@mui/icons-material";
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
import { isWindow, resizeFun } from "../../../components/common";

const TableView = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState<IStock>();
  const [visibleConfirmModal, setVisibleConfirmModal] = useState(false);
  const [productList, setProductList] = useState<any>();
  const [windowWidth, setWindowWidth] = useState<any>();

  const products = useAppSelector((state) => state.products.list);
  const groups = useAppSelector((state) => state.products.productGroups).filter((group) => group.merchantid === id);

  const [expanded, setExpanded] = useState<string | false>(products[0]?.name);

  const handleChangePanel =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

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
    setProductList(products.filter((item) => item.merchantid?.toString() === id));
  }, [id, products])

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

  const getWidth = () => isWindow ? window.innerWidth : windowWidth;

  const resize = () => setWindowWidth(getWidth());

  useEffect(() => {
    if (isWindow) {
      setWindowWidth(getWidth());
      resizeFun(resize)
    }
  }, [isWindow]);

  const tableContent = (stock: IStock) => {
    return <>
      {windowWidth <= 1024 ? <>  <div className="responsive-content">{stock.name}</div >
        <div className="responsive-content"><Avatar aria-label="recipe"><img src={stock.logo} alt="" /></Avatar></div >
        <div className="responsive-content">{stock.description}</div >
        <div className="responsive-content">{groups.find((group) => group.id === stock.prod_group)?.name}</div >
        <div className="responsive-content">€{stock.price}</div >
        <div className="responsive-content">{stock.quantity}</div >
        <div className="responsive-content">{stock.published ? 'Yes' : 'No'}</div >
        <div className="responsive-content">{stock.featured ? 'Yes' : 'No'}</div >
        <div className="responsive-content"><CardMedia className="stock-image" component="img" height="120" width="120" image={stock.image} alt="Store Image" /></div >
        <div className="responsive-content">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} className="stock-icons">
            <IconButton aria-label="edit" color="primary" onClick={() => showEditModal(stock)}>
              <Edit />
            </IconButton>
            <IconButton aria-label="delete" color="secondary" onClick={() => showConfirmDelteModal(stock)}>
              <Delete />
            </IconButton>
          </Box>
        </div> </> : <>
        <TableCell>{stock.name}</TableCell>
        <TableCell><Avatar aria-label="recipe"><img src={stock.logo} alt="" /></Avatar></TableCell>
        <TableCell>{stock.description}</TableCell>
        <TableCell>{groups.find((group) => group.id === stock.prod_group)?.name}</TableCell>
        <TableCell>€{stock.price}</TableCell>
        <TableCell>{stock.quantity}</TableCell>
        <TableCell>{stock.published ? 'Yes' : 'No'}</TableCell>
        <TableCell>{stock.featured ? 'Yes' : 'No'}</TableCell>
        <TableCell><CardMedia className="stock-image" component="img" height="120" width="120" image={stock.image} alt="Store Image" /></TableCell>
        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} className="stock-icons">
            <IconButton aria-label="edit" color="primary" onClick={() => showEditModal(stock)}>
              <Edit />
            </IconButton>
            <IconButton aria-label="delete" color="secondary" onClick={() => showConfirmDelteModal(stock)}>
              <Delete />
            </IconButton>
          </Box>
        </TableCell>
      </>}
    </>
  }

  return (
    <>
      {windowWidth <= 1024 ? <div className="stock_table">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="vertical">
            {(droppableProvided: DroppableProvided) => (
              <div ref={droppableProvided.innerRef}{...droppableProvided.droppableProps}>
                {productList?.length > 0 && productList?.map((stock: any, index: number) => (
                  <Draggable key={stock.id} draggableId={stock.id} index={index}>
                    {(draggableProvided: DraggableProvided) => {
                      return (
                        <div
                          ref={draggableProvided.innerRef}
                          style={{ ...draggableProvided.draggableProps.style }}
                          {...draggableProvided.draggableProps}
                          {...draggableProvided.dragHandleProps}
                        >
                          <Accordion expanded={expanded === stock.name} onChange={handleChangePanel(stock.name)} style={{ marginBottom: "15px" }} key={stock.id}>
                            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1bh-content" id="panel1bh-header">
                              <Typography sx={{ flexShrink: 0 }}>{stock.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>{tableContent(stock)}</AccordionDetails>
                          </Accordion>
                        </div>
                      );
                    }}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div> : <TableContainer component={Paper} className="stock-container">
        <Table sx={{ minWidth: 650 }} aria-label="simple table" >
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
                            {tableContent(stock)}
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
      </TableContainer>}
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