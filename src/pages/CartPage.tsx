import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Typography, Box, Divider, Button } from "@mui/material";
import { RootState } from "../redux/store";

const CartPage = () => {
  const navigate = useNavigate();
  const cartProducts = useSelector((state: RootState) => state.cart.list);

  const subTotal = cartProducts.map((item) => {    
      const total = item.price * item.carts_quantity;
      return total;
    }).reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);

  const goToCheckoutPage = () => {
    navigate("/payment-methods");
  };

  return (
    <Box sx={{ paddingY: 10 }}>
      <Container>
        {cartProducts.length > 0 ? (
          <>          
            <Box sx={{ marginTop: 5 }}>
              <Typography variant="h4" sx={{ marginY: 2 }}>
                SubTotal
              </Typography>
              {cartProducts.map((item) => (
                <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h5" sx={{ marginY: 2 }}>
                    {item.name}
                  </Typography>
                  <Typography variant="h6" sx={{ marginY: 2 }}>
                    €{item.price * item.carts_quantity}
                  </Typography>
                </Box>
              ))}
              <Divider />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5" sx={{ marginY: 2 }} />
                <Typography variant="h6" sx={{ marginY: 2 }}>
                  €{subTotal}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Button variant="contained" onClick={() => goToCheckoutPage()}>Checkout</Button>
              </Box>
            </Box>
          </>
        ) : (
          <Typography variant="h4" sx={{ marginY: 2 }}>
            Your Cart is empty.
          </Typography>
        )}
        
      </Container>
    </Box>
  );
};

export default CartPage;
