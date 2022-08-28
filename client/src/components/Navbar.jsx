import React from "react";
import {
  AppBar,
  Button,
  InputAdornment,
  Link,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import SearchIcon from "@mui/icons-material/Search";
import DrawerComp from "./DrawerComp";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";

const PAGES = [
  { id: 0, name: "Home", to: "/" },
  { id: 1, name: "Trending", to: "/trending" },
  { id: 2, name: "Groups", to: "/groups" },
];

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const signout = async () => {
    try {
      await axios.post("/auth/signout");
      dispatch(logout());
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  console.log(currentUser);

  return (
    <>
      <AppBar elevation={0} position="fixed" sx={{ backgroundColor: "#333" }}>
        <Toolbar>
          <Link
            component={RouterLink}
            to="/"
            underline="none"
            sx={{ color: "inherit", display: "flex", alignItems: "center" }}
          >
            <SchoolIcon />
            <Typography variant="h6" ml={2}>
              LabX
            </Typography>
          </Link>
          <TextField
            size="small"
            placeholder="Search..."
            sx={{
              backgroundColor: "white",
              marginLeft: "auto",
              width: { xs: "230px", md: "400px" },
              borderRadius: "5px",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {isMatch ? (
            <>
              <DrawerComp />
            </>
          ) : (
            <>
              <Box
                sx={{
                  marginLeft: "auto",
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                }}
              >
                {PAGES.map((page) => (
                  <Link
                    key={page.id}
                    component={RouterLink}
                    sx={{ color: "inherit" }}
                    to={page.to}
                    underline="none"
                  >
                    {page.name}
                  </Link>
                ))}
                {currentUser ? (
                  <Button onClick={signout} variant="contained">
                    Logout
                  </Button>
                ) : (
                  <Button
                    component={RouterLink}
                    to="/signup"
                    variant="contained"
                  >
                    Register
                  </Button>
                )}
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default Navbar;
