import React, { useEffect, useState } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, IconButton, Card } from "@mui/material";
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';

import { IStock } from "../../types/StockTypes";

import { addProductToCart, removeProductFromCart } from "../../redux/reducer/cartReducer";
import { RootState } from "../../redux/store";

interface IProps {
  stock: IStock | undefined
}

const UserStockItem = (props: IProps) => {
  const dispatch: Dispatch<any> = useDispatch();
  const { stock } = props;

  const cartProducts = useSelector((state: RootState) => state.cart.list);

  const [currentProduct, setCurrentProduct] = useState<IStock>();

  const handleAddProductToCart = () => {
    dispatch(addProductToCart({ product: stock }));
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
          <Box>
            <Typography variant="h6">
              ${currentProduct?.price}
            </Typography>
          </Box>
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
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
            <IconButton onClick={() => handleAddProductToCart()}>
              <AddCircleSharpIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Card> 
  );
};

export default UserStockItem;
