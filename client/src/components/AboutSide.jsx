import React from "react";
import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import GroupsIcon from "@mui/icons-material/Groups";

const AboutSide = (props) => {
  return (
    <Paper elevation={1}>
      <Box sx={{ backgroundColor: "#333", padding: "1rem" }}>
        <Typography color="white" sx={{ fontWeight: "bold" }}>
          About {props.name}
        </Typography>
      </Box>
      <Box sx={{ padding: "1rem" }}>
        <Typography>{props.desc}</Typography>
        {props.group && (
          <>
            <Divider variant="middle" sx={{ margin: "1rem 0" }} />
            <Grid container alignItems="center">
              <Button
                variant="outlined"
                size="small"
                sx={{ marginRight: "auto" }}
              >
                Join
              </Button>
              <Typography sx={{ display: "flex", alignItems: "center" }}>
                <GroupsIcon sx={{ marginRight: ".5rem" }} />{" "}
                {props.group?.subscribedUsers?.length}
              </Typography>
            </Grid>
          </>
        )}
        <Divider variant="middle" sx={{ margin: "1rem 0" }} />
        <Button variant="contained" fullWidth>
          Create Post
        </Button>
      </Box>
    </Paper>
  );
};

export default AboutSide;