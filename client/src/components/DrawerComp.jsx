import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useNavigate } from "react-router-dom";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import axios from "axios";
import { logout } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Logout from "@mui/icons-material/Logout";

const LIST_ONE = [
  { id: 0, name: "Home", to: "/", icon: <HomeIcon /> },
  {
    id: 1,
    name: "Trending",
    to: "/trending",
    icon: <LocalFireDepartmentIcon />,
  },
  { id: 2, name: "Groups", to: "/groups", icon: <GroupsIcon /> },
  { id: 3, name: "About", to: "/about", icon: <InfoIcon /> },
  {
    id: 4,
    name: "Login",
    to: "/signup",
    icon: <LoginIcon />,
  },
  { id: 5, name: "Register", to: "/signup", icon: <AppRegistrationIcon /> },
];

const LIST_TWO = [
  { id: 0, name: "Home", to: "/", icon: <HomeIcon /> },
  {
    id: 1,
    name: "Trending",
    to: "/trending",
    icon: <LocalFireDepartmentIcon />,
  },
  { id: 2, name: "Groups", to: "/groups", icon: <GroupsIcon /> },
  { id: 3, name: "About", to: "/about", icon: <InfoIcon /> },
  {
    id: 4,
    name: "Profile",
    to: "/profile",
    icon: <PersonIcon />,
  },
  {
    id: 5,
    name: "Logout",
    to: "",
    icon: <Logout />,
  },
];

const DrawerComp = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();

  const signout = async () => {
    try {
      dispatch(logout());
      setOpenDrawer(false);
      await axios.post("/auth/signout");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List sx={{ minWidth: "220px" }}>
          {!currentUser
            ? LIST_ONE.map((page) => (
                <>
                  {page.id === 4 && <Divider />}
                  <ListItemButton
                    component={Link}
                    to={page.to}
                    onClick={() => setOpenDrawer(false)}
                    key={page.id}
                  >
                    <ListItemIcon>{page.icon}</ListItemIcon>
                    <ListItemText>{page.name}</ListItemText>
                  </ListItemButton>
                </>
              ))
            : LIST_TWO.map((page) => (
                <>
                  {page.id === 4 && <Divider />}
                  <ListItemButton
                    component={Link}
                    to={page.to}
                    onClick={
                      page.name === "Logout"
                        ? signout
                        : () => setOpenDrawer(false)
                    }
                    key={page.id}
                  >
                    <ListItemIcon>{page.icon}</ListItemIcon>
                    <ListItemText>{page.name}</ListItemText>
                  </ListItemButton>
                </>
              ))}
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default DrawerComp;
