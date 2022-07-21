import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography, Grid, Box, ToggleButtonGroup,ToggleButton, Button } from "@mui/material";
import { List, GridView } from '@mui/icons-material';
import StockCard from "../../components/Card/Stock";
import TableView from "./components/Table";
import StockForm from "./components/StockForm";
import { getAllProducts } from "../../actions/productActions";
import { RootState } from "../../redux/store";
import { IStock } from "../../types/StockTypes";

const StockListPage = () => {
  const { id } = useParams();
  const dispatch: Dispatch<any> = useDispatch();
  const [viewMode, setViewMode] = useState("list");
  const [createStockModal, setCreateStockModal] = useState(false);

  const products = useSelector((state: RootState) => state.products.list).filter((item) => item.merchantid?.toString() === id);

  const handleCloseModal = () => {
    setCreateStockModal(false);
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const userRole = localStorage.getItem("role");

  return (
    <>
      <Box>
        <Container sx={{ marginY: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h3" sx={{ marginY: 5 }}>
              Our Store's Products
            </Typography>
            {userRole === "admin" && (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Button variant="contained" sx={{ marginRight: 2 }} onClick={() => setCreateStockModal(true)}>Create</Button>
                <ToggleButtonGroup
                  value={viewMode}
                  exclusive
                  onChange={(event, viewMode) => setViewMode(viewMode)}
                  aria-label="view mode"
                >
                  <ToggleButton value="tile" aria-label="tile view">
                    <List />
                  </ToggleButton>
                  <ToggleButton value="list" aria-label="list view">
                    <GridView />
                  </ToggleButton>            
                </ToggleButtonGroup>
              </Box>
            )}   
          </Box>
          {viewMode === 'list' ? (
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {products.map((stock: IStock) => (
                <Grid item xs={4} sm={4} md={4} key={stock.id}>
                  <StockCard stock={stock} />
                </Grid>
              ))}
            </Grid>            
          ) : (
            <TableView />
          )}        
        </Container>
      </Box>
      {createStockModal &&
        <StockForm
          open={createStockModal}
          mode="Create"
          closeModal={() => handleCloseModal()}
        />
      }
    </>
  );
};

export default StockListPage;
