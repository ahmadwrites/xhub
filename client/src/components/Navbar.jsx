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
import { Link as RouterLink, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import DrawerComp from "./DrawerComp";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import ProfileCircle from "./ProfileCircle";
import { useState } from "react";

const PAGES = [
  { id: 0, name: "Home", to: "/" },
  { id: 1, name: "Trending", to: "/trending" },
  { id: 2, name: "Groups", to: "/groups" },
];

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const theme = useTheme();
  const navigate = useNavigate();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [search, setSearch] = useState("");

  const handleSubmit = () => {
    navigate(`/search?title=${search}`);
    setSearch("");
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
            <Typography
              variant="h6"
              color="primary"
              sx={{ fontWeight: 600 }}
              ml={1}
            >
              X
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Lab
            </Typography>
          </Link>
          <TextField
            sx={{
              backgroundColor: "white",
              marginLeft: "auto",
              width: { xs: "160px", s: "200px", md: "400px" },
              borderRadius: "5px",
            }}
            size="small"
            value={search}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
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
                    <Link
                      to="/create"
                      component={RouterLink}
                      underline="none"
                      sx={{ color: "inherit" }}
                    >
                      Create
                    </Link>
                    <ProfileCircle />
                  </>
                ) : (
                  <Button
                    component={RouterLink}
                    to="/signup"
                    variant="contained"
                  >
                    Login
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
