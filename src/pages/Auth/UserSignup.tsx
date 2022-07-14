import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Link, Grid, Typography, Container, Box } from "@mui/material";
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
  email: string,
  password: string
}

const SignUp = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [userData, setUserData] = useState<IUserData>({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: ""
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
    handleValidate(fieldName, event.target.value);
    setUserData((userData) => {return {...userData, [fieldName]: event.target.value }});
  };

  const handleSignup = () => {
    const result = Object.keys(userData).map((key) => {
      return handleValidate(key, userData[key as keyof IUserData]);
    });

    const isInvalid = result.filter((r) => !r).length > 0;

    if (isInvalid) {
      return;
    }

    localStorage.setItem("role", 'admin');
    navigate('/merchants');
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <Box>
        <Typography component="h1" variant="h5" sx={{ marginBottom: 4 }}>
          Log In
        </Typography>
        <Box>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={userData.email}
                onChange={(event) => handleChange(event, 'email')}
                error={errors.email !== ""}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={userData.password}
                onChange={(event) => handleChange(event, 'password')}
                error={errors.password !== ""}
                helperText={errors.password}
              />
            </Grid>            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"            
            sx={{ margin: '15px 0' }}
            onClick={() => handleSignup()}
          >
            Log In
          </Button>
        </Box>
        {/* <Grid>
          <Grid item>
            <Link href="/signup/merchant" variant="body2">
              If you want be a Merchant, please click here.
            </Link>
          </Grid>
        </Grid> */}
      </Box>
    </Container>
  );
};

export default SignUp
