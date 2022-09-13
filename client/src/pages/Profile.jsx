import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SERVER_URL from "../serverUrl";
import axios from "axios";
import PostCard from "../components/PostCard";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const location = useLocation().pathname.split("/")[2];

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/posts/user/${location}`);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getUser = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/users/find/${location}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPosts();
    getUser();
  }, [location]);

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
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={1}>
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
            >
              <Avatar
                sx={{
                  height: "64px",
                  width: "64px",
                  border: "2px solid #1976d2",
                }}
                src={user?.img}
              />
              <Typography variant="h4">{user?.username}</Typography>
              <Typography>{user?.desc}</Typography>
              <Typography variant="body2" color="text.secondary">
                {posts?.length} Posts
              </Typography>
              {currentUser._id === location && (
                <Button
                  component={Link}
                  to="/profile/edit"
                  sx={{ width: "100%" }}
                  variant="contained"
                >
                  Edit Profile
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
