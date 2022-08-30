import { Avatar, Button, Grid, Link, Paper, Typography } from "@mui/material";
import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Box } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";

const PostCard = () => {
  return (
    <Paper elevation={1}>
      <Grid container sx={{ padding: { xs: ".5rem", md: "1rem" } }}>
        <Grid
          item
          xs={2}
          md={1}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: ".5rem",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              "&:hover": { color: "primary.main" },
            }}
          >
            <ArrowUpwardIcon /> 7
          </Typography>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              "&:hover": { color: "error.main" },
            }}
          >
            <ArrowDownwardIcon /> 3
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Box sx={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
            <Link
              component={RouterLink}
              to="/groups"
              underline="none"
              sx={{ display: "flex", gap: ".5rem" }}
            >
              <Avatar sx={{ height: "24px", width: "24px" }} />
              <Typography>g/General</Typography>
            </Link>
            <Typography color="text.secondary">Posted by u/user</Typography>
            <Typography color="text.secondary">3 days ago</Typography>
          </Box>
          <Link
            component={RouterLink}
            underline="none"
            to="/post/"
            sx={{ color: "inherit" }}
          >
            <Typography variant="h6" mt={1}>
              A title for this post
            </Typography>
            <Typography
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: "3",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad
              repellendus ut magnam officia cupiditate? Exercitationem sit nihil
              quae maxime laboriosam dolorem commodi dolore reiciendis mollitia
              saepe doloremque corrupti architecto provident modi totam,
              perspiciatis nesciunt veritatis molestias enim iusto nobis
              voluptates dicta? Nisi autem culpa molestiae commodi sequi ut!
              Officiis, at.
            </Typography>
          </Link>
          <Grid container mt={1} sx={{ gap: "1rem" }}>
            <Button
              color="inherit"
              to="/post"
              component={RouterLink}
              variant="text"
            >
              <ChatBubbleOutlineIcon sx={{ marginRight: ".25rem" }} /> 4
              Comments
            </Button>
            <Button color="inherit" variant="text">
              <ShareIcon sx={{ marginRight: ".25rem" }} /> Share
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PostCard;
