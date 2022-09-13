import {
  Alert,
  Box,
  Container,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import SERVER_URL from "../serverUrl";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import GroupCard from "../components/GroupCard";

const Search = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [posts, setPosts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ message: "", severity: "success" });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const [searchParams] = useSearchParams();
  searchParams.get("title");

  const handleDelete = async (postId) => {
    try {
      setOpen(true);
      setAlert({ message: "Post deleted successfully.", severity: "success" });
      await axios.delete(`${SERVER_URL}/posts/${postId}`, {
        withCredentials: true,
      });
      getPosts();
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
      getPosts();
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
      getPosts();
    } catch (error) {
      setOpen(true);
      setAlert({ message: "Something went wrong.", severity: "error" });
      console.log(error);
    }
  };

  const getPosts = useCallback(async () => {
    try {
      const res = await axios.get(
        `${SERVER_URL}/posts/search?q=${searchParams.get("title")}`
      );
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [searchParams]);

  const getGroups = useCallback(async () => {
    try {
      const res = await axios.get(
        `${SERVER_URL}/groups/search?q=${searchParams.get("title")}`
      );
      setGroups(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [searchParams]);

  useEffect(() => {
    getPosts();
    getGroups();
  }, [getPosts, getGroups]);

  console.log(groups);

  return (
    <Container sx={{ marginTop: "2rem", marginBottom: "2rem" }} maxWidth="xl">
      <Grid
        container
        sx={{
          gap: "2rem",
          justifyContent: "center",
          flexDirection: { xs: "column-reverse", md: "row" },
        }}
      >
        <Grid
          item
          xs={12}
          md={8}
          sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}
        >
          <Typography variant="h6">
            Searching for {searchParams.get("title")}:
          </Typography>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="Posts">
                <Tab label="Posts" value="1" />
                <Tab label="Groups" value="2" />
              </TabList>
            </Box>
            <TabPanel
              sx={{
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
              value="1"
            >
              {posts?.length === 0
                ? `No posts yet related to ${searchParams.get("title")}...`
                : posts?.map((post) => (
                    <PostCard
                      handleDelete={handleDelete}
                      handleDislike={handleDislike}
                      handleLike={handleLike}
                      key={post?._id}
                      post={post}
                    />
                  ))}
            </TabPanel>
            <TabPanel
              sx={{
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
              value="2"
            >
              {groups.map((group) => (
                <GroupCard key={group?._id} group={group} />
              ))}
            </TabPanel>
          </TabContext>
        </Grid>
        <Grid item xs={12} md={3}>
          {/* <Paper elevation={1}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
                gap: ".5rem",
                textAlign: "center",
                flexDirection: "column",
              }}
            ></Box>
          </Paper> */}
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
  );
};

export default Search;
