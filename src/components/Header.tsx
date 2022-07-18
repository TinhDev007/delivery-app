import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from '@mui/material/styles';
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Avatar, useMediaQuery } from "@mui/material";
import { ShoppingCart, Brightness4, Brightness7, Storefront, Category } from "@mui/icons-material";
import { toggleTheme } from "../redux/reducer/settingsReducer";

import Logo from '../assets/images/logos/logo2.png';

import { RootState } from "../redux/store";

const Header = () => {
  const theme = useTheme();
  const dispatch: Dispatch<any> = useDispatch();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [isAuthed, setIsAuthed] = useState(false);

  const themeMode = useSelector((state: RootState) => state.settings.theme);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (userRole) {
      setIsAuthed(true);
    } else {
      setIsAuthed(false);
    }
  }, [isAuthed]);

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate('/');
  };

  const handleToggelTheme = () => {
    dispatch(toggleTheme());
  };

  const goToCartPage = () => {
    navigate('/cart')
  };

  const goToMerchantPage = () => {
    navigate('/merchants');
  };

  const goToCategoryPage = () => {
    navigate('/categories');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate("/")}
          >
            <Avatar alt="Default logo" src={Logo} />
          </IconButton>
          {!matches && (
            <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
              <Button onClick={() => navigate("/")}>
                <Typography variant="h6" color="white">
                  Stock Managment App
                </Typography>
              </Button>
            </Box>
          )}                    
          <Box
            sx={{
              display: 'flex',                
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <IconButton sx={{ mr: 2 }} color="inherit" onClick={goToCategoryPage}>
              <Category />
            </IconButton>
            <IconButton sx={{ mr: 2 }} color="inherit" onClick={goToMerchantPage}>
              <Storefront />
            </IconButton>
            <IconButton sx={{ mr: 2 }} color="inherit" onClick={goToCartPage}>
              <ShoppingCart />
            </IconButton>
            <IconButton sx={{ mr: 2 }} color="inherit" onClick={handleToggelTheme}>
              {themeMode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            {isAuthed ? (
              <Button onClick={() => handleLogout()} variant="contained" color="primary">
                Log Out
              </Button>
            ) : (
              <Button component={Link} to="/login" variant="contained" color="primary">
                Log In
              </Button>
            )} 
          </Box>   
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
