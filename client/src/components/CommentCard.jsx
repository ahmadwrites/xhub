import { Avatar, Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";

import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import axios from "axios";
import SERVER_URL from "../serverUrl";
import { format } from "timeago.js";

const CommentCard = ({ comment }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `${SERVER_URL}/users/find/${comment?.userId}`
        );
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [comment?.userId]);

  return (
    <Paper
      sx={{
        padding: {
          xs: ".5rem",
          md: "1rem",
        },
        display: "flex",
        flexDirection: "column",
        gap: ".5rem",
      }}
      elevation={0}
    >
      <Box
        component={RouterLink}
        to={`/profile/${user?._id}`}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: ".5rem",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <Avatar src={user?.img} sx={{ height: "24px", width: "24px" }} />
        <Typography variant="body2" color="text.secondary">
          {user?.username}
        </Typography>
        <Typography variant="body2" color="text.disabled    ">
          {format(comment.createdAt)}
        </Typography>
        {currentUser?._id === comment?.userId && (
          <Button
            sx={{ marginLeft: "auto" }}
            size="small"
            color="error"
            variant="text"
          >
            <DeleteIcon /> Delete
          </Button>
        )}
      </Box>
      <Typography>{comment?.desc}</Typography>
    </Paper>
  );
};

export default CommentCard;
