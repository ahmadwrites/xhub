import React, { useState } from "react";
import {
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";
import xmum from "../img/xmum.jpg";

const Signup = () => {
  const theme = useTheme();
  const [isSignup, setIsSignup] = useState(true);
  const toolbarHeight = theme.mixins.toolbar.minHeight;

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
              placeholder="Email"
              label="Email"
              sx={{ width: { xs: "350px", md: "500px" } }}
            />
          )}
          <TextField
            placeholder="Username"
            label="Username"
            sx={{ width: { xs: "350px", md: "500px" } }}
          />
          <TextField
            placeholder="Password"
            label="Password"
            type="password"
            sx={{ width: { xs: "350px", md: "500px" } }}
          />
          {isSignup ? (
            <Button
              size="large"
              variant="contained"
              color="primary"
              sx={{ width: { xs: "350px", md: "500px" } }}
            >
              Register
            </Button>
          ) : (
            <Button
              size="large"
              variant="contained"
              color="primary"
              sx={{ width: { xs: "350px", md: "500px" } }}
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
      </Grid>
    </Grid>
  );
};

export default Signup;
