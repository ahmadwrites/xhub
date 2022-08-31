import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Avatar,
  Button,
  Divider,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Link from "@mui/material/Link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GroupsIcon from "@mui/icons-material/Groups";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { Box, Container } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PostCard from "../components/PostCard";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useCallback } from "react";

const About = (props) => {
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

const Links = (props) => {
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
  const groupPath = useLocation().pathname.split("/")[2];
  const [posts, setPosts] = useState([]);
  const [group, setGroup] = useState(null);

  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ message: "", severity: "success" });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const fetchPosts = useCallback(async () => {
    try {
      if (path === "") {
        const res = await axios.get("/posts");
        setPosts(res.data);
      } else if (path === "trending") {
        const res = await axios.get("/posts/trending");
        setPosts(res.data);
      } else {
        const res = await axios.get(`/posts/group/${groupPath}`);
        const groupRes = await axios.get(`/groups/${groupPath}`);
        setPosts(res.data);
        setGroup(groupRes.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [path, groupPath]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async (postId) => {
    try {
      setOpen(true);
      setAlert({ message: "Post deleted successfully.", severity: "success" });
      await axios.delete(`/posts/${postId}`);
      fetchPosts();
    } catch (error) {
      setOpen(true);
      setAlert({ message: "Something went wrong.", severity: "error" });
      console.log(error);
    }
  };

  return (
    <>
      {groupPath && (
        <Box
          sx={{
            background: `url(${group?.img}) center`,
            backgroundSize: "cover",
            height: { xs: "100px", md: "150px" },
          }}
        ></Box>
      )}
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
            {posts.map((post) => (
              <PostCard
                handleDelete={handleDelete}
                key={post._id}
                post={post}
              />
            ))}
          </Grid>
          <Grid item xs={12} md={3}>
            {type === "group" ? (
              <About group={group} name={group?.name} desc={group?.desc} />
            ) : (
              <About
                name="XLab"
                desc="Posts for the XMUM zone. Contains all types of posts across all
                of the spaces in the XMUM zone. Create your own post by clicking
                on 'create post' or use one of the available tools."
              />
            )}
            {type === "group" && <Links group={group} />}
            <Rules />
          </Grid>
        </Grid>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={alert.severity}
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default Home;
