import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Avatar,
  IconButton,
  Box,
  Dialog,
  DialogContent, DialogContentText, DialogActions, Button, Accordion, AccordionSummary, Typography, AccordionDetails
} from "@mui/material";
import { Delete, Edit, ExpandMore, RemoveRedEye } from "@mui/icons-material";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableProvided,
  DroppableProvided
} from "react-beautiful-dnd";

// Import Components
import MerchantForm from "./MerchantForm";

// Import Types
import { IMerchant } from "../../../types/MerchantTypes";

// Import Actions
import { deleteMerchant } from "../../../actions/merchantActions";
import { isWindow, resizeFun } from "../../../components/common";

const TableView = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [visibleMerchantFormMdoal, setVisibleMerchantFormMdoal] = useState(false);
  const [visibleConfirmModal, setVisibleConfirmModal] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState<IMerchant>();
  const [merchantList, setMerchantList] = useState<any>();
  const [windowWidth, setWindowWidth] = useState<any>();

  const merchants = useAppSelector((state) => state.merchants.list);
  const categories = useAppSelector((state) => state.categories.list);

  const [expanded, setExpanded] = useState<string | false>(merchants[0]?.name)

  const handleChangePanel =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

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

  useEffect(() => {
    setMerchantList(merchants);
  }, [merchants])

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    setMerchantList((prev: any) => {
      const merchant = [...prev];
      const d = merchant[result.destination!.index];
      merchant[result.destination!.index] = merchant[result.source.index];
      merchant[result.source.index] = d;
      return merchant;
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

  const tableContent = (merchant: IMerchant) => {
    return <>
      <TableCell>{merchant.name}</TableCell>
      <TableCell><Avatar aria-label="recipe"><img src={merchant.logo} alt="" /></Avatar></TableCell>
      <TableCell>{merchant.description}</TableCell>
      <TableCell>{categories.find((category) => category.id === merchant.category)?.name}</TableCell>
      <TableCell>{merchant.address}</TableCell>
      <TableCell>{merchant.phone}</TableCell>
      <TableCell>{merchant.email}</TableCell>
      <TableCell><img className="merchant-image" src={merchant.image} alt="StoreImage" height={120} /></TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} className="merchant-icon">
          <IconButton aria-label="view" onClick={() => { navigate("/merchants/" + merchant.id) }} size="small">
            <RemoveRedEye />
          </IconButton>
          <IconButton aria-label="edit" color="primary" onClick={() => showEditModal(merchant)} size="small">
            <Edit />
          </IconButton>
          <IconButton aria-label="delete" color="secondary" onClick={() => showDeleteConfirmModal(merchant)} size="small">
            <Delete />
          </IconButton>
        </Box>
      </TableCell>
    </>
  }

  return (
    <>
      <TableContainer component={Paper} className="merchant-container" style={{ boxShadow: "none", backgroundColor: windowWidth <= 991 ? "#eee" : "#fff" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" className="merchant_table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Logo</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Address</TableCell>
              <TableCell style={{ width: "100%" }}>Contact Number</TableCell>
              <TableCell>Contact Mail</TableCell>
              <TableCell>Image</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="vertical">
              {(droppableProvided: DroppableProvided) => (
                <TableBody ref={droppableProvided.innerRef}{...droppableProvided.droppableProps}>
                  {merchantList?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9}>There is no merchants</TableCell>
                    </TableRow>
                  )}
                  {merchantList?.length > 0 && merchantList?.map((merchant: any, index: number) => (
                    <Draggable key={merchant.id} draggableId={merchant.id} index={index}>
                      {(draggableProvided: DraggableProvided) => {
                        return (
                          <TableRow
                            ref={draggableProvided.innerRef}
                            style={{ ...draggableProvided.draggableProps.style }}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            {windowWidth <= 991 ?
                              <>
                                <Accordion expanded={expanded === merchant.name} onChange={handleChangePanel(merchant.name)} sx={{ marginBottom: 2 }} key={merchant.id}>
                                  <AccordionSummary
                                    expandIcon={<ExpandMore />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                  >
                                    <Typography sx={{ flexShrink: 0 }}>
                                      {merchant.name}
                                    </Typography>
                                  </AccordionSummary>
                                  <AccordionDetails>
                                    {tableContent(merchant)}
                                  </AccordionDetails>
                                </Accordion>
                              </>
                              :
                              tableContent(merchant)}
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