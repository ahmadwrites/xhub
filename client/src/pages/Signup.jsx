import React, { useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import axios from "axios";
import xmum from "../img/xmum.jpg";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import SERVER_URL from "../serverUrl";

const Signup = () => {
  const { currentUser } = useSelector((state) => state.user);
  const theme = useTheme();
  const navigate = useNavigate();
  const toolbarHeight = theme.mixins.toolbar.minHeight;
  const dispatch = useDispatch();

  const [isSignup, setIsSignup] = useState(false);
  const [userForm, setUserForm] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ message: "", severity: "success" });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${SERVER_URL}/auth/signup`, userForm);
      setOpen(true);
      setIsSignup(false);
      setAlert({ message: res.data, severity: "success" });
    } catch (error) {
      setOpen(true);
      setAlert({
        message: error.response.data.message,
        severity: "error",
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart);

    try {
      setOpen(true);
      setAlert({ message: "Logged in.", severity: "success" });
      const res = await axios.post(`${SERVER_URL}/auth/signin`, userForm, {
        withCredentials: true,
      });
      dispatch(loginSuccess(res.data));
      // navigate("/");
      // window.location.href = "/";
    } catch (error) {
      dispatch(loginFailure());
      setOpen(true);
      setAlert({
        message: error.response.data.message,
        severity: "error",
      });
    }
  };

  // if (currentUser !== null) {
  //   window.location.href = "/";
  // }

  return (
    <Grid container sx={{ height: `calc(100vh - ${toolbarHeight}px)` }}>
      <Grid
        sx={{
          background: `url(${xmum}) center`,
          backgroundSize: "cover",
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
        }}
        md={6}
        item
      >
        <Box sx={{ padding: "3rem" }}>
          <Typography color="#fff" variant="h5"></Typography>
        </Box>
      </Grid>
      <Grid md={6} xs={12} item>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "0 3rem",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <Box>
            <Typography variant="h4">
              {isSignup ? "Register" : "Login"}
            </Typography>
            <Typography variant="p" color="text.secondary">
              {isSignup
                ? "Sign up today to unlock full features of the application!"
                : "Welcome back!"}
            </Typography>
          </Box>
          {isSignup && (
            <TextField
              onChange={handleChange}
              name="email"
              placeholder="Email"
              label="Email"
              type="email"
              sx={{ width: { xs: "100%", md: "400px", lg: "500px" } }}
            />
          )}
          <TextField
            onChange={handleChange}
            name="username"
            placeholder="Username"
            label="Username"
            sx={{ width: { xs: "100%", md: "400px", lg: "500px" } }}
          />
          <TextField
            onChange={handleChange}
            name="password"
            placeholder="Password"
            label="Password"
            type="password"
            sx={{ width: { xs: "100%", md: "400px", lg: "500px" } }}
          />
          {isSignup ? (
            <Button
              onClick={handleRegister}
              size="large"
              variant="contained"
              color="primary"
              sx={{ width: { xs: "100%", md: "400px", lg: "500px" } }}
            >
              Register
            </Button>
          ) : (
            <Button
              onClick={handleLogin}
              size="large"
              variant="contained"
              color="primary"
              sx={{ width: { xs: "100%", md: "500px" } }}
            >
              Login
            </Button>
          )}

          <Box>
            <Typography variant="body1">
              {isSignup ? "Already have an account? " : "Need an account? "}
              <Link
                underline="none"
                sx={{ cursor: "pointer" }}
                onClick={() => setIsSignup(!isSignup)}
              >
                {isSignup ? "Login here." : "Sign up here."}
              </Link>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              By using this website, you are agreeing to our terms and
              conditions.
            </Typography>
          </Box>
        </Box>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={alert.severity}
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  );
};

export default Signup;
