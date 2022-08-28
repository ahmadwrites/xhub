import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Button,
  InputAdornment,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { Link as RouterLink, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const signout = async () => {
    try {
      dispatch(logout());
      await axios.post("/auth/signout");
      navigate("");
    } catch (error) {
      console.log(error);
    }
  };

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
                  <>
                    <Box>
                      <Avatar
                        sx={{
                          height: "36px",
                          width: "36px",
                          cursor: "pointer",
                        }}
                        onClick={handleClick}
                        src={currentUser.img}
                      />
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={handleClose}>
                          <ListItemIcon>
                            <PersonIcon />
                          </ListItemIcon>
                          <ListItemText>Profile</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={signout}>
                          <ListItemIcon>
                            <LogoutIcon />
                          </ListItemIcon>
                          <ListItemText>Logout</ListItemText>
                        </MenuItem>
                      </Menu>
                    </Box>
                  </>
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
