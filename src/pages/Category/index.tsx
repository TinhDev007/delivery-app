import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Box,
  Typography,
  Dialog,
  DialogContent, DialogContentText, DialogActions, Button, Accordion, AccordionSummary, AccordionDetails
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
import CategoryForm from "./CategoryForm";

// Import Types
import { ICategory } from "../../types/CategoryTypes";

// Import Actions
import { getAllCategories, deleteCategory } from "../../actions/categoryActions";
import '../responsiveTable.css';
import { isWindow, resizeFun } from "../../components/common";

const CategoryListPage = () => {
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState('Create');
  const [selectedCategory, setSelectedCategory] = useState<ICategory>();
  const [visibleConfirmModal, setVisibleConfirmModal] = useState(false);
  const [visibleCategoryForm, setVisibleCategoryForm] = useState(false);
  const [categoryList, setCategoryList] = useState<any>();
  const [windowWidth, setWindowWidth] = useState<any>();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const categories = useAppSelector((state) => state.categories.list);
  const userRole = useAppSelector((state) => state.auth.role);

  const [expanded, setExpanded] = useState<string | false>(categories[0]?.name)

  const handleChangePanel =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const showEditModal = (category: ICategory) => {
    setVisibleCategoryForm(true);
    setMode("Edit");
    setSelectedCategory(category);
  };

  const showDeleteConfirmModal = (category: ICategory) => {
    setSelectedCategory(category);
    setVisibleConfirmModal(true);
  };

  const handleDeleteCategory = () => {
    setVisibleConfirmModal(false);
    dispatch(deleteCategory(selectedCategory?.id));
  };

  const handleCloseFormModal = () => {
    setVisibleCategoryForm(false);
  };

  useEffect(() => {
    if (categories && categories.length > 0) {
      let data = [...categories]
      const sortList = data?.sort((a: ICategory, b: ICategory) => {
        return a.name > b.name ? 1 : -1;
      })
      setCategoryList(sortList);
    }
  }, [categories])

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    setCategoryList((prev: any) => {
      const category = [...prev];
      const d = category[result.destination!.index];
      category[result.destination!.index] = category[result.source.index];
      category[result.source.index] = d;
      return category;
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

  const tableContent = (category: ICategory) => {
    return <>
      <TableCell>{category.name}</TableCell>
      <TableCell ><img src={category.image} alt="" height={120} /></TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton aria-label="edit" color="primary" onClick={() => showEditModal(category)}>
            <Edit />
          </IconButton>
          <IconButton aria-label="delete" color="secondary" onClick={() => showDeleteConfirmModal(category)}>
            <Delete />
          </IconButton>
        </Box>
      </TableCell></>
  }

  return (
    <>
      <Container sx={{ marginY: 10 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography className="category-title" variant="h3" sx={{ marginY: 5 }}>
            Categories
          </Typography>
          {userRole === "admin" && (
            <Button variant="contained" sx={{ marginRight: 2 }} onClick={() => setVisibleCategoryForm(true)}>Create</Button>
          )}
        </Box>
        <TableContainer component={Paper} className="category-container" style={{ boxShadow: "none", backgroundColor: windowWidth <= 991 ? "#eee" : "#fff" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" className="category_table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable" direction="vertical">
                {(droppableProvided: DroppableProvided) => (
                  <TableBody ref={droppableProvided.innerRef}{...droppableProvided.droppableProps}>
                    {categoryList?.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3}>There is no categories</TableCell>
                      </TableRow>
                    )}
                    {categoryList?.length > 0 && categoryList?.map((category: ICategory, index: number) => (
                      <Draggable key={category.id} draggableId={category.id} index={index}>
                        {(draggableProvided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
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
                                  <Accordion expanded={expanded === category.name} onChange={handleChangePanel(category.name)} sx={{ marginBottom: 2 }} key={category.id}>
                                    <AccordionSummary
                                      expandIcon={<ExpandMore />}
                                      aria-controls="panel1bh-content"
                                      id="panel1bh-header"
                                    >
                                      <Typography sx={{ flexShrink: 0 }}>
                                        {category.name}
                                      </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      {tableContent(category)}
                                    </AccordionDetails>
                                  </Accordion>
                                </>
                                : tableContent(category)}
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
      </Container>
      {visibleConfirmModal && (
        <Dialog open={visibleConfirmModal} onClose={() => setVisibleConfirmModal(false)}>
          <DialogContent>
            <DialogContentText>
              Are you sure to delete this category?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setVisibleConfirmModal(false)}>No</Button>
            <Button onClick={() => handleDeleteCategory()}>Yes</Button>
          </DialogActions>
        </Dialog>
      )}
      {visibleCategoryForm && (
        <CategoryForm
          open={visibleCategoryForm}
          mode={mode}
          closeModal={() => handleCloseFormModal()}
          category={selectedCategory}
        />
      )}
    </>
  );
};

export default CategoryListPage;
