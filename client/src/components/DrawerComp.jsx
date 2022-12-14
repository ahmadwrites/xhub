import {
  Avatar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemAvatar,
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
import { Link, useNavigate } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import axios from "axios";
import { logout } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Logout from "@mui/icons-material/Logout";
import SERVER_URL from "../serverUrl";

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
];

const DrawerComp = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();

  const signout = async () => {
    try {
      setOpenDrawer(false);
      await axios.post(
        `${SERVER_URL}/auth/signout`,
        {},
        { withCredentials: true }
      );
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const LIST_TWO = [
    { id: 0, name: "Home", to: "/", icon: <HomeIcon /> },
    {
      id: 1,
      name: "Trending",
      to: "/trending",
      icon: <LocalFireDepartmentIcon />,
    },
    { id: 2, name: "Groups", to: "/groups", icon: <GroupsIcon /> },
    { id: 3, name: "Create", to: "/create", icon: <CreateIcon /> },
    { id: 4, name: "About", to: "/about", icon: <InfoIcon /> },
    {
      id: 5,
      name: "Profile",
      to: `/profile/${currentUser?._id}`,
    },
    {
      id: 6,
      name: "Logout",
      to: "",
      icon: <Logout />,
    },
  ];

  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List sx={{ minWidth: "220px" }}>
          {!currentUser
            ? LIST_ONE.map((page) => (
                <div key={page.id}>
                  {page.id === 4 && <Divider />}
                  <ListItemButton
                    component={Link}
                    to={page.to}
                    onClick={() => setOpenDrawer(false)}
                  >
                    <ListItemIcon>{page.icon}</ListItemIcon>
                    <ListItemText>{page.name}</ListItemText>
                  </ListItemButton>
                </div>
              ))
            : LIST_TWO.map((page) => (
                <div key={page.id}>
                  {page.id === 5 && <Divider />}
                  <ListItemButton
                    component={Link}
                    to={page.to}
                    onClick={
                      page.name === "Logout"
                        ? signout
                        : () => setOpenDrawer(false)
                    }
                  >
                    {page.icon ? (
                      <ListItemIcon>{page.icon}</ListItemIcon>
                    ) : (
                      <ListItemAvatar>
                        <Avatar
                          sx={{ height: "24px", width: "24px" }}
                          src={currentUser.img}
                        />
                      </ListItemAvatar>
                    )}
                    <ListItemText>{page.name}</ListItemText>
                  </ListItemButton>
                </div>
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
