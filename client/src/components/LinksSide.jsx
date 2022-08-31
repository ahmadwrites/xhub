import React from "react";
import {
  Avatar,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import Link from "@mui/material/Link";

import { Box } from "@mui/system";

const LinksSide = (props) => {
  return (
    <Paper elevation={1} sx={{ marginTop: "1rem" }}>
      <Box sx={{ backgroundColor: "#333", padding: "1rem" }}>
        <Typography color="white" sx={{ fontWeight: "bold" }}>
          Important Links
        </Typography>
      </Box>
      <Box sx={{ padding: "1rem" }}>
        <List disablePadding>
          <ListItemButton
            component={Link}
            target={props.group?.instagram ? "_blank" : "_self"}
            href={
              props.group?.instagram
                ? `https://instagram.com/${props.group?.instagram}`
                : "#!"
            }
          >
            <ListItemAvatar>
              <Avatar src="https://toppng.com/uploads/preview/instagram-logo-circle-11549679754rhbcorxntv.png" />
            </ListItemAvatar>
            <ListItemText
              primary="Instagram"
              secondary={
                props.group?.instagram ? props.group?.instagram : "Coming Soon."
              }
            />
          </ListItemButton>
          <Divider />
          <ListItemButton
            component={Link}
            target={props.group?.discord ? "_blank" : "_self"}
            href={
              props.group?.discord
                ? `https://discord.com/${props.group?.discord}`
                : "#!"
            }
          >
            <ListItemAvatar>
              <Avatar src="https://www.freepnglogos.com/uploads/discord-logo-png/discord-logo-logodownload-download-logotipos-1.png" />
            </ListItemAvatar>
            <ListItemText
              primary="Discord"
              secondary={
                props.group?.discord ? props.group?.discord : "Coming Soon."
              }
            />
          </ListItemButton>
        </List>
      </Box>
    </Paper>
  );
};

export default LinksSide;
