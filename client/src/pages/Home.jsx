import {
  Alert,
  Avatar,
  Button,
  Grid,
  Paper,
  Snackbar,
  TextField,
} from "@mui/material";
import Link from "@mui/material/Link";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { Box, Container } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PostCard from "../components/PostCard";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useCallback } from "react";
import AboutSide from "../components/AboutSide";
import LinksSide from "../components/LinksSide";
import RulesSide from "../components/RulesSide";
import SERVER_URL from "../serverUrl";
import { subscription } from "../redux/userSlice";

const Home = ({ type }) => {
  const { currentUser } = useSelector((state) => state.user);
  const path = useLocation().pathname.split("/")[1];
  const groupPath = useLocation().pathname.split("/")[2];
  const [posts, setPosts] = useState([]);
  const [group, setGroup] = useState(null);
  const dispatch = useDispatch();

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
        if (currentUser) {
          const res = await axios.get(`${SERVER_URL}/posts/following`, {
            withCredentials: true,
          });
          setPosts(res.data);
        } else {
          const res = await axios.get(`${SERVER_URL}/posts`);
          setPosts(res.data);
        }
      } else if (path === "trending") {
        const res = await axios.get(`${SERVER_URL}/posts/trending`);
        setPosts(res.data);
      } else {
        const res = await axios.get(`${SERVER_URL}/posts/group/${groupPath}`);
        const groupRes = await axios.get(`${SERVER_URL}/groups/${groupPath}`);
        setPosts(res.data);
        setGroup(groupRes.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [path, groupPath, currentUser]);

  const handleSubscribe = async () => {
    if (currentUser?.subscribedGroups?.includes(groupPath)) {
      await axios.put(
        `${SERVER_URL}/users/unfollow/${groupPath}`,
        {},
        {
          withCredentials: true,
        }
      );
    } else {
      await axios.put(
        `${SERVER_URL}/users/follow/${groupPath}`,
        {},
        {
          withCredentials: true,
        }
      );
    }
    dispatch(subscription(groupPath));
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async (postId) => {
    try {
      setOpen(true);
      setAlert({ message: "Post deleted successfully.", severity: "success" });
      await axios.delete(`${SERVER_URL}/posts/${postId}`, {
        withCredentials: true,
      });
      fetchPosts();
    } catch (error) {
      setOpen(true);
      setAlert({ message: "Something went wrong.", severity: "error" });
      console.log(error);
    }
  };

  const handleLike = async (postId) => {
    try {
      await axios.put(
        `${SERVER_URL}/users/like/${postId}`,
        {},
        { withCredentials: true }
      );
      setOpen(true);
      setAlert({ message: "Post liked successfully.", severity: "success" });
      fetchPosts();
    } catch (error) {
      setOpen(true);
      setAlert({ message: "Something went wrong.", severity: "error" });
      console.log(error);
    }
  };

  const handleDislike = async (postId) => {
    try {
      await axios.put(
        `${SERVER_URL}/users/dislike/${postId}`,
        {},
        { withCredentials: true }
      );
      setOpen(true);
      setAlert({ message: "Post disliked successfully.", severity: "success" });
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
            height: { xs: "100px", md: "150px", xl: "200px" },
          }}
        ></Box>
      )}
      <Container sx={{ marginTop: "2rem", marginBottom: "2rem" }} maxWidth="xl">
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
                component={RouterLink}
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
                handleLike={handleLike}
                handleDislike={handleDislike}
                handleDelete={handleDelete}
                key={post._id}
                post={post}
                inGroup={type === "group" ? true : false}
              />
            ))}
          </Grid>
          <Grid item xs={12} md={3}>
            {type === "group" ? (
              <AboutSide
                handleSubscribe={handleSubscribe}
                group={group}
                name={group?.name}
                desc={group?.desc}
              />
            ) : (
              <AboutSide
                name="XLab"
                desc="Posts for the XMUM zone. Contains all types of posts across all
                of the spaces in the XMUM zone. Create your own post by clicking
                on 'create post' or use one of the available tools."
              />
            )}
            {type === "group" && <LinksSide group={group} />}
            <RulesSide />
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
