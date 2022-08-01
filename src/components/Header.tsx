import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from '@mui/material/styles';
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Avatar, useMediaQuery, Tooltip } from "@mui/material";
import { ShoppingCart, Brightness4, Brightness7, Storefront, Category, Login, PowerSettingsNew } from "@mui/icons-material";
import { toggleTheme } from "../redux/reducer/settingsReducer";

import Logo from '../assets/images/logos/logo2.png';

import { RootState } from "../redux/store";

const Header = () => {
  const theme = useTheme();
  const dispatch: Dispatch<any> = useDispatch();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const themeMode = useSelector((state: RootState) => state.settings.theme);
  const userRole = useSelector((state: RootState) => state.auth.role);
  const isAuthed = useSelector((state: RootState) => state.auth.authenticated);

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
            {userRole === 'admin' && (
              <Tooltip title="Categories">
                <IconButton sx={{ mr: 2 }} color="inherit" onClick={goToCategoryPage}>
                  <Category />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Merchants">
              <IconButton sx={{ mr: 2 }} color="inherit" onClick={goToMerchantPage}>
                <Storefront />
              </IconButton>
            </Tooltip>
            <Tooltip title="Carts">
              <IconButton sx={{ mr: 2 }} color="inherit" onClick={goToCartPage}>
                <ShoppingCart />
              </IconButton>
            </Tooltip>            
            <Tooltip title={themeMode === 'dark' ? 'Light Mode' : 'Dark Mode'}>
              <IconButton sx={{ mr: 2 }} color="inherit" onClick={handleToggelTheme}>
                {themeMode === 'dark' ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>
            {isAuthed ? (
              <Tooltip title="Log out">
                <IconButton onClick={() => handleLogout()} color="inherit">
                  <PowerSettingsNew />
                </IconButton>
              </Tooltip>              
            ) : (
              <Tooltip title="Log In">
                <IconButton component={Link} to="/login" color="inherit">
                  <Login />
                </IconButton>
              </Tooltip>              
            )} 
          </Box>   
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
