import React from "react";
import { Avatar, Grid, Typography, Paper, Chip } from "@mui/material";
import { Link } from "react-router-dom";

const GroupCard = ({ group }) => {
  return (
    <Paper
      component={Link}
      to={`/groups/${group._id}`}
      sx={{ textDecoration: "none" }}
      elevation={1}
    >
      <Grid container sx={{ gap: ".5rem" }} wrap="nowrap">
        <Grid
          item
          sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}
        >
          <Avatar
            sx={{ height: "128px", width: "128px" }}
            variant="rounded"
            src={group.img}
            alt={group.name}
          />
        </Grid>
        <Grid item sx={{ padding: { xs: ".5rem" } }}>
          <Typography variant="h6">
            <Chip
              color="primary"
              variant="outlined"
              size="small"
              label={group.shortName}
            />{" "}
            {group.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {group.desc}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default GroupCard;
