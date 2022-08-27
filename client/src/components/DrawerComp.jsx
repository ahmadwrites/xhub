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
import { Link } from "react-router-dom";

const LIST = [
  { name: "Home", to: "/", icon: <HomeIcon /> },
  { name: "Trending", to: "/trending", icon: <LocalFireDepartmentIcon /> },
  { name: "Groups", to: "/groups", icon: <GroupsIcon /> },
  { name: "About", to: "/about", icon: <InfoIcon /> },
  { name: "Login", to: "/signin", icon: <LoginIcon /> },
];

const DrawerComp = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List sx={{ minWidth: "220px" }}>
          {LIST.map((page, index) => (
            <>
              {page.name === "Login" && <Divider />}
              <ListItemButton
                component={Link}
                to={page.to}
                onClick={() => setOpenDrawer(false)}
                key={index}
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
