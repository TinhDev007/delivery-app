import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Grid, Typography, Container, Box } from "@mui/material";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    display: "flex !important",
    alignItems: "center",
    justifyContent: "center"
  }
});

interface IUserData {
  email: string
}

const MerchantSignup = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [merchantData, setMerchantData] = useState({
    email: ""
  });

  const [errors, setErrors] = useState({
    email: ""
  });

  const handleValidate = (fieldName: string, value: string) => {
    if(!value) {
      setErrors((errors) => ({ ...errors, [fieldName]: "This field should be not empty."}));
      return false;
    } else {
      if (fieldName === "email") {
        let regex = /\S+@\S+\.\S+/;        
        if (!regex.test(value)) {
          setErrors((errors) => ({ ...errors, [fieldName]: "Invalid email format."}));
          return false;
        }
        setErrors((errors) => ({ ...errors, [fieldName]: "" }));
        return true;
      } else {
        setErrors((errors) => ({ ...errors, [fieldName]: "" }));
        return true;
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, fieldName: string) => {
    handleValidate(event.target.value, fieldName);
    setMerchantData((merchantData) => {return {...merchantData, [fieldName]: event.target.value }});
  };

  const handleMerchantSignup = () => {    
    const result = Object.keys(merchantData).map((key) => {
      return handleValidate(key, merchantData[key as keyof IUserData]);
    });

    const isInvalid = result.filter((r) => !r).length > 0;

    if (isInvalid) {
      return;
    }

    console.log()

    // localStorage.setItem("role", 'merchant');
    // navigate('/merchants');
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <Box sx={{ minWidth: 375 }}>
        <Typography component="h1" variant="h5" sx={{ marginBottom: 4 }}>
          Sign up
        </Typography>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={merchantData.email}
                onChange={(event) => handleChange(event, 'email')}
                error={errors.email !== ""}
                helperText={errors.email}
              />
            </Grid>                       
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"            
            sx={{ margin: '15px 0' }}
            onClick={() => handleMerchantSignup()}
          >
            Sign Up
          </Button>
        </Box>        
      </Box>
    </Container>
  );
};

export default MerchantSignup;
