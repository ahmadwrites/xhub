import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { Box, Container } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import PostCard from "../components/PostCard";
import { Link as RouterLink } from "react-router-dom";

const About = (props) => {
  return (
    <Paper elevation={1}>
      <Box sx={{ backgroundColor: "#333", padding: "1rem" }}>
        <Typography color="white" sx={{ fontWeight: "bold" }}>
          {props.name}
        </Typography>
      </Box>
      <Box sx={{ padding: "1rem" }}>
        <Typography>{props.desc}</Typography>
        <Divider variant="middle" sx={{ margin: "1rem 0" }} />
        <Button variant="contained" fullWidth>
          Create Post
        </Button>
      </Box>
    </Paper>
  );
};

const Rules = () => {
  return (
    <Paper elevation={1} sx={{ marginTop: "1rem" }}>
      <Box sx={{ backgroundColor: "#333", padding: "1rem" }}>
        <Typography color="white" sx={{ fontWeight: "bold" }}>
          Rules & Regulations
        </Typography>
      </Box>
      <Box sx={{ padding: "1rem" }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>1. Be Civil and Respectful</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              There are obvious reasons why we don't allow people to personally
              insult others, and doing so will get you banned. It makes everyone
              feel a little less welcome.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>2. No Racist Language or Behaviour</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Do not post or comment with the purpose of trolling or inciting
              reactions from other users. This will lead to a ban. Don't be
              offensive just to be offensive.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>
              3. Titles Must be High-Effort and Descriptive
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              No posts to communicate with another student. Calling out other
              users is prohibited*.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Paper>
  );
};

const Home = ({ type }) => {
  const { currentUser } = useSelector((state) => state.user);
  const path = useLocation().pathname.split("/")[1];

  return (
    <Container sx={{ marginTop: "2rem" }} maxWidth="xl">
      <Grid container sx={{ gap: "2rem", justifyContent: "center" }}>
        <Grid
          item
          xs={12}
          md={8}
          sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}
        >
          <Paper
            elevation={1}
            sx={{
              padding: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Avatar
              src={
                currentUser
                  ? currentUser.img
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU"
              }
            />
            <Link
              style={{
                textDecoration: "none",
                cursor: "pointer",
                width: "100%",
              }}
              to="/create"
            >
              <TextField
                size="small"
                fullWidth
                placeholder="Create a post..."
              />
            </Link>
          </Paper>
          <Paper
            elevation={1}
            sx={{
              padding: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Button
              component={RouterLink}
              to="/"
              size="small"
              variant={path === "" ? "contained" : "text"}
            >
              <FlashOnIcon sx={{ marginRight: ".25rem" }} />
              New
            </Button>
            <Button
              component={RouterLink}
              to="/trending"
              size="small"
              variant={path === "trending" ? "contained" : "text"}
            >
              <LocalFireDepartmentIcon sx={{ marginRight: ".25rem" }} />
              Trending
            </Button>
          </Paper>
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </Grid>
        <Grid item xs={12} md={3}>
          {type === "home" ? (
            <About
              name="About XLab"
              desc="Posts for the XMUM zone. Contains all types of posts across all
                of the spaces in the NBA zone. Create your own post by clicking
                on 'create post' or use one of the available tools."
            />
          ) : (
            <About name="About Group" desc="Desc" />
          )}
          <Rules />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
