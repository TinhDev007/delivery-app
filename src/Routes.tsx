import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";

import HomePage from "./pages/HomePage";
import UserSignupPage from "./pages/Auth/UserSignup";
import MerchantSignupPage from "./pages/Auth/MerchantSignup";

import MerchantListPage from "./pages/Merchants";
import MerchantDetailPage from "./pages/Merchants/details";
import MerchantProductsPage from "./pages/Stocks";

import CartPage from "./pages/CartPage";
import DeliveryInfoPage from "./pages/DeliveryInfoPage";
import PaymentPage from "./pages/Payment";
import QRCodePage from "./pages/QRCode";

import CategoryListPage from "./pages/Category";

import Header from "./components/Header";

import { RootState } from './redux/store';

type ProtectedRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
  outlet: JSX.Element;
};

function ProtectedRoute({isAuthenticated, authenticationPath, outlet}: ProtectedRouteProps) {
  if(isAuthenticated) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }
};

const RoutesList = () => {
  const [loggedIn, setLoggedIn] = useState(true);

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    isAuthenticated: !!loggedIn,
    authenticationPath: '/',
  };

  const themeMode = useSelector((state: RootState) => state.settings.theme);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          background: {
            default: themeMode === 'light' ? '#eee' : '#161616'
          }
        },
      }),
    [themeMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <>
          <Header /> 
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<UserSignupPage />} />
            <Route path="/signup/merchant" element={<MerchantSignupPage />} />
            <Route path="/merchants" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<MerchantListPage />}/>} />
            <Route path="/merchants/:id" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<MerchantDetailPage />}/>} />
            <Route path="/merchants/:id/products" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<MerchantProductsPage />}/>} /> 
            <Route path="/cart" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<CartPage />}/>} />
            <Route path="/delivery-info" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<DeliveryInfoPage />}/>} />
            <Route path="/payment-methods" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<PaymentPage />}/>} />
            <Route path="/qr-codes" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<QRCodePage />}/>} />
            <Route path="/categories" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<CategoryListPage />}/>} />
          </Routes>
        </>
      </Router>
    </ThemeProvider> 
  );
};

export default RoutesList;
