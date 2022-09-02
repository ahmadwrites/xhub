import {
  Avatar,
  Button,
  Grid,
  Link,
  Menu,
  Container,
  MenuItem,
  Paper,
  Typography,
  TextField,
  Divider,
} from "@mui/material";
import { Box } from "@mui/system";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ShareIcon from "@mui/icons-material/Share";

import { format } from "timeago.js";

import EditIcon from "@mui/icons-material/Edit";

import DeleteIcon from "@mui/icons-material/Delete";

import { useSelector } from "react-redux";
import AboutSide from "../components/AboutSide";
import LinksSide from "../components/LinksSide";
import RulesSide from "../components/RulesSide";
import SERVER_URL from "../serverUrl";
import CommentCard from "../components/CommentCard";

const PostDetail = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [post, setPost] = useState();
  const [group, setGroup] = useState(null);
  const path = useLocation().pathname.split("/")[2];
  const [user, setUser] = useState("");
  const [comments, setComments] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`${SERVER_URL}/posts/${postId}`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/posts/find/${path}`);
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getGroup = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/groups/${post?.groupId}`);
        setGroup(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getUser = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/users/find/${post?.userId}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getComments = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/comments/${post?._id}`);
        setComments(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
    getPost();
    getGroup();
    getComments();
  }, [path, post?.groupId, post?.userId, post?._id]);

  return (
    <>
      <Box
        sx={{
          background: `url(${group?.img}) center`,
          backgroundSize: "cover",
          height: { xs: "100px", md: "150px", xl: "200px" },
        }}
      ></Box>
      <Container sx={{ marginTop: "2rem" }} maxWidth="xl">
        <Grid container sx={{ gap: "2rem", justifyContent: "center" }}>
          <Grid item xs={12} md={8}>
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
                      "&:hover": { color: "success.main" },
                    }}
                  >
                    <ArrowUpwardIcon /> {post?.likes.length}
                  </Typography>
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      "&:hover": { color: "error.main" },
                    }}
                  >
                    <ArrowDownwardIcon /> {post?.dislikes.length}
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Box
                    sx={{ display: "flex", gap: ".5rem", alignItems: "center" }}
                  >
                    <Link
                      component={RouterLink}
                      to={`/groups/${group?._id}`}
                      underline="none"
                      sx={{ display: "flex", gap: ".5rem" }}
                    >
                      <Avatar
                        src={group?.img}
                        sx={{ height: "24px", width: "24px" }}
                      />
                      <Typography>g/{group?.name}</Typography>
                    </Link>
                    <Typography color="text.secondary">
                      Posted by u/{user?.username}
                    </Typography>
                    <Typography color="text.secondary">
                      {format(post?.createdAt)}
                    </Typography>
                  </Box>

                  <Typography variant="h6" mt={1}>
                    {post?.title}
                  </Typography>
                  <Typography>{post?.content}</Typography>
                  <Grid container mt={1}>
                    <Button
                      color="inherit"
                      href="#comments"
                      component={Link}
                      variant="text"
                    >
                      <ChatBubbleOutlineIcon sx={{ marginRight: ".25rem" }} />
                      {comments.length} Comments
                    </Button>
                    <Button color="inherit" variant="text">
                      <ShareIcon sx={{ marginRight: ".25rem" }} /> Share
                    </Button>
                    {post?.userId === currentUser?._id && (
                      <>
                        <Button
                          id="basic-button"
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={handleClick}
                          color="inherit"
                          variant="text"
                        >
                          <MoreHorizIcon />
                        </Button>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuItem
                            component={RouterLink}
                            to={`/edit/${post?._id}`}
                            onClick={handleClose}
                          >
                            <EditIcon sx={{ marginRight: ".25rem" }} />
                            Edit
                          </MenuItem>
                          <MenuItem onClick={() => handleDelete(post?._id)}>
                            <DeleteIcon sx={{ marginRight: ".25rem" }} />
                            Delete
                          </MenuItem>
                        </Menu>
                      </>
                    )}
                  </Grid>
                </Grid>
              </Grid>

              {/* Comments */}
              <Grid item xs={12} sx={{ padding: { xs: ".5rem", md: "1rem" } }}>
                {currentUser && (
                  <>
                    Comment as{" "}
                    <Typography component="span" color="primary.main">
                      {currentUser.username}
                    </Typography>
                    <Box component="form" noValidate autoComplete="off">
                      <div>
                        <TextField multiline fullWidth />
                        <Button sx={{ marginTop: "1rem" }} variant="contained">
                          Comment
                        </Button>
                      </div>
                    </Box>
                  </>
                )}
                <Divider sx={{ margin: "1rem 0" }} />
                <Box
                  id="comments"
                  sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                >
                  {comments.map((comment) => (
                    <CommentCard comment={comment} key={comment._id} />
                  ))}
                </Box>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <AboutSide group={group} name={group?.name} desc={group?.desc} />
            <LinksSide group={group} />
            <RulesSide />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PostDetail;
