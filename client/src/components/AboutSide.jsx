import React from "react";
import { useSelector } from "react-redux";
import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import GroupsIcon from "@mui/icons-material/Groups";

const AboutSide = (props) => {
  const { currentUser } = useSelector((state) => state.user);

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
                color={
                  currentUser?.subscribedGroups.includes(props.group?._id)
                    ? "error"
                    : "primary"
                }
                size="small"
                onClick={props.handleSubscribe}
                sx={{ marginRight: "auto" }}
              >
                {currentUser?.subscribedGroups.includes(props.group?._id)
                  ? "Unfollow"
                  : "Join"}
              </Button>
              <Typography sx={{ display: "flex", alignItems: "center" }}>
                <GroupsIcon sx={{ marginRight: ".5rem" }} />{" "}
                {props.group?.subscribedUsers?.length}
              </Typography>
            </Grid>
          </>
        )}
        {!props.create && (
          <>
            <Divider variant="middle" sx={{ margin: "1rem 0" }} />
            <Button component={Link} to="/create" variant="contained" fullWidth>
              Create Post
            </Button>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default AboutSide;
