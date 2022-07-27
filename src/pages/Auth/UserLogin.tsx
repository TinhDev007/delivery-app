import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { Button, TextField, Link, Grid, Typography, Container, Box } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { userLogin } from "../../actions/authActions";

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

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const classes = useStyles();
  const [userData, setUserData] = useState<IUserData>({
    email: "",
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

    const formData = {
      email: userData.email
    };

    dispatch(userLogin(formData));

    // localStorage.setItem("role", 'admin');
    // navigate('/merchants');
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <Box sx={{ minWidth: 375 }}>
        <Typography component="h1" variant="h5" sx={{ marginBottom: 4 }}>
          Log In
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
                value={userData.email}
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
            onClick={() => handleSignup()}
          >
            Log In
          </Button>
        </Box>        
      </Box>
    </Container>
  );
};

export default SignUp
