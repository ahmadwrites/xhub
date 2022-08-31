import {
  Avatar,
  Button,
  Grid,
  Link,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Box } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import { format } from "timeago.js";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useSelector } from "react-redux";
import SERVER_URL from "../serverURL";

const PostCard = ({ post, handleDelete }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState("");
  const [group, setGroup] = useState("");
  const [comments, setComments] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/users/find/${post.userId}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getPost = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/groups/${post.groupId}`);
        setGroup(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getComments = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/comments/${post._id}`);
        setComments(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
    getPost();
    getComments();
  }, [post.groupId, post.userId, post._id]);

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
              "&:hover": { color: "success.main" },
            }}
          >
            <ArrowUpwardIcon /> {post.likes.length}
          </Typography>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              "&:hover": { color: "error.main" },
            }}
          >
            <ArrowDownwardIcon /> {post.dislikes.length}
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Box sx={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
            <Link
              component={RouterLink}
              to={`/groups/${group._id}`}
              underline="none"
              sx={{ display: "flex", gap: ".5rem" }}
            >
              <Avatar src={group.img} sx={{ height: "24px", width: "24px" }} />
              <Typography>g/{group.name}</Typography>
            </Link>
            <Typography color="text.secondary">
              Posted by u/{user?.username}
            </Typography>
            <Typography color="text.secondary">
              {format(post.createdAt)}
            </Typography>
          </Box>
          <Link
            component={RouterLink}
            underline="none"
            to={`/post/${post._id}`}
            sx={{ color: "inherit" }}
          >
            <Typography variant="h6" mt={1}>
              {post.title}
            </Typography>
            <Typography
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {post.content}
            </Typography>
          </Link>
          <Grid container mt={1}>
            <Button
              color="inherit"
              to={`/post/${post._id}#comments`}
              component={RouterLink}
              variant="text"
            >
              <ChatBubbleOutlineIcon sx={{ marginRight: ".25rem" }} />
              {comments.length} Comments
            </Button>
            <Button color="inherit" variant="text">
              <ShareIcon sx={{ marginRight: ".25rem" }} /> Share
            </Button>
            {post.userId === currentUser?._id && (
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
                    to={`/edit/${post._id}`}
                    onClick={handleClose}
                  >
                    <EditIcon sx={{ marginRight: ".25rem" }} />
                    Edit
                  </MenuItem>
                  <MenuItem onClick={() => handleDelete(post._id)}>
                    <DeleteIcon sx={{ marginRight: ".25rem" }} />
                    Delete
                  </MenuItem>
                </Menu>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PostCard;
