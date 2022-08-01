import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from '@mui/material/styles';
import { Container, Typography, Grid, Box, ToggleButtonGroup,ToggleButton, Button, useMediaQuery } from "@mui/material";
import { List, GridView } from '@mui/icons-material';
import UserStockItem from "../../components/Card/UserStockItem";
import { IStock } from "../../types/StockTypes";
import TableView from "../Stocks/components/Table";
import ProductsGridView from "./components/ProductsGridView";
import StockForm from "../Stocks/components/StockForm";
import { RootState } from "../../redux/store";
import { ShoppingCart } from "@mui/icons-material";
import { makeStyles } from '@mui/styles';
import { getAllProducts } from "../../actions/productActions";

const useStyles = makeStyles((theme) => (
  {
    checkoutInfo: {
      display: 'flex',
      maxWidth: 500,
      minWidth: 350,
      position: 'fixed',
      alignItems: 'center',
      justifyContent: 'space-between',
      bottom: 20,
      left: 'calc(50% - 175px)',
      cursor: 'pointer'
    },
    checkoutBox: {
      backgroundColor: 'black',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 'calc(100% - 50px)',
      padding: 10
    },
    shoppingCounts: {
      width: 16,
      height: 16,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      textAlign: 'center',
      position: 'absolute',
      top: 5,
      left: 10,
      fontSize: 11,
      fontWeight: 'bold',
      color: '#fff'
    }
  }
));

const MerchantDetail = () => {
  const { id } = useParams();
  const dispatch: Dispatch<any> = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [viewMode, setViewMode] = useState("list");
  const [showCheckoutPopup, setCheckoutPopup] = useState(false);
  const [createStockModal, setCreateStockModal] = useState(false);
  const userRole = localStorage.getItem("role");
  const [subTotal, setSubTotal] = useState(0);
  const [shoppingProductsCount, setShoppingProductsCount] = useState(0);

  const products = useSelector((state: RootState) => state.products.list).filter((item) => item.merchantid?.toString() === id);
  const shoppingProducts = useSelector((state: RootState) => state.cart.list);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (shoppingProducts.length > 0) {
      setCheckoutPopup(true);      
      const total = shoppingProducts.map((item) => {    
        const total = item.price * item.carts_quantity;
        return total;
      }).reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);
      setSubTotal(total);
      setShoppingProductsCount(shoppingProducts.map((item) => item.carts_quantity).reduce((accumulator, a) => accumulator + a, 0));
    } else {
      setCheckoutPopup(false);
    }
  }, [shoppingProducts])

  const handleCloseModal = () => {
    setCreateStockModal(false);
  };

  const goToCartPage = () => {
    navigate('/cart');
  };

  const goToProductGroups = () => {
    navigate(`/merchants/` + id + `/product-groups`);
  };

  return (
    <>
      <Box sx={{ paddingY: 8, position: 'relative' }}>
        <Container>
          <Box>
            <Typography variant="h2" sx={{ marginY: 5, textAlign: `${matches ? 'center' : 'left'}` }}>
              Store Information
            </Typography>            
          </Box>
        </Container>
        {products.length > 0 && (
          <Container>
            <Typography variant="h4" sx={{ marginY: 5, textAlign: `${matches ? 'center' : 'left'}` }}>
              Featured Products
            </Typography>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
              {products.slice(0, 4).map((stock: IStock) => (
                <Grid item xs={12} sm={6} md={4} key={stock.id}>
                  <UserStockItem stock={stock} />
                </Grid>
              ))}
            </Grid>
          </Container>
        )}        
        <Container sx={{ marginY: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: `${matches ? 'column' : 'row'}`}}>
            <Typography variant="h4" sx={{ marginY: 5, textAlign: `${matches ? 'center' : 'left'}` }}>
              Our Store's Products
            </Typography>
            {userRole === "admin" && (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: `${matches ? '20px' : 0}` }}>
                <Button variant="contained" sx={{ marginRight: 2 }} onClick={() => setCreateStockModal(true)}>Create</Button>
                <Button variant="contained" sx={{ marginRight: 2 }} onClick={() => goToProductGroups()}>Product Groups</Button>
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
            <ProductsGridView />
          ) : (
            <TableView />
          )}      
        </Container>
        {showCheckoutPopup && (
          <Box className={classes.checkoutInfo} onClick={() => goToCartPage()}>
            <Box sx={{ position: 'relative' }}>
              <ShoppingCart fontSize="large" />
              <Box className={classes.shoppingCounts}>
                {shoppingProductsCount}
              </Box>
            </Box>
            <Box className={classes.checkoutBox}>
              <Typography variant="h6">
                Checkout
              </Typography>
              <Typography variant="h6">
                ${subTotal}
              </Typography>
            </Box>
          </Box>
        )}
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

export default MerchantDetail;
