import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Typography, Box, IconButton, Card, Dialog, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';

import { IStock } from "../../types/StockTypes";

import { addProductToCart, removeAllProductFromCart, removeProductFromCart } from "../../redux/reducer/cartReducer";

interface IProps {
  stock: IStock | undefined
}

const UserStockItem = (props: IProps) => {
  const dispatch = useAppDispatch();
  const { stock } = props;

  const cartProducts = useAppSelector((state) => state.cart.list);
  const currentCartMerchant = useAppSelector((state) => state.cart.currentMerchant);

  const [currentProduct, setCurrentProduct] = useState<IStock>();
  const [visibleConfirmModal, setVisibleConfirmModal] = useState(false);

  const handleAddProductToCart = async () => {
    if (currentCartMerchant !== stock?.merchantid && cartProducts.length >= 0) {
      await dispatch(removeAllProductFromCart({ product: [] }));
      await dispatch(addProductToCart({ product: stock }));
      setVisibleConfirmModal(false);
    }
    if (currentCartMerchant === stock?.merchantid && cartProducts.length >= 0) {
      // await dispatch(removeAllProductFromCart({ product: [] }));
      await dispatch(addProductToCart({ product: stock }));
      setVisibleConfirmModal(false);
    }
  };

  const handleRemoveProductFromCart = () => {
    dispatch(removeProductFromCart({ product: stock }));
  };

  useEffect(() => {
    const cartProductIDs = cartProducts.map((product) => product.id);
    if (cartProductIDs.includes(stock?.id)) {
      setCurrentProduct(cartProducts.find((product) => product.id === stock?.id));
    } else {
      setCurrentProduct(stock);
    }
  }, [cartProducts, stock]);

  return (
    <Card
      sx={{ padding: 2, borderRadius: 7, boxShadow: 10 }}
    >
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h6">
              {currentProduct?.name}
            </Typography>
            <Typography variant="body2">
              {currentProduct?.description}
            </Typography>
          </Box>
          <Box sx={{
            width: 130,
            marginLeft: 3
          }}>
            <img src={currentProduct?.image} alt="" width="100%" height="100px" style={{ objectFit: 'contain', borderRadius: 8 }} />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h6">
              €{currentProduct?.price}
            </Typography>
          </Box>
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            {!!currentProduct?.carts_quantity && currentProduct?.carts_quantity > 0 && (
              <>
                <IconButton onClick={() => handleRemoveProductFromCart()}>
                  <RemoveCircleSharpIcon />
                </IconButton>
                <Typography variant="h6">
                  {currentProduct?.carts_quantity}
                </Typography>
              </>
            )}

            <IconButton disabled={currentProduct?.quantity === 0} onClick={() => setVisibleConfirmModal(true)}>
              <AddCircleSharpIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      {currentProduct?.quantity === 0 ? <p style={{ margin: '0px', color: "#00000042" }}>sold out</p> : ""}
      {visibleConfirmModal && (
        <Dialog open={visibleConfirmModal} onClose={() => setVisibleConfirmModal(false)}>
          <DialogContent>
            <DialogContentText>
              The new cart will be created.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setVisibleConfirmModal(false)}>No</Button>
            <Button onClick={() => { handleAddProductToCart() }}>Yes</Button>
          </DialogActions>
        </Dialog>
      )}
    </Card>
  );
};

export default UserStockItem;
