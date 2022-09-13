import {
  Alert,
  Button,
  Container,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/userSlice";
import SERVER_URL from "../serverUrl";

const EditProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [form, setForm] = useState({ ...currentUser });
  const [openAlert, setOpenAlert] = useState(false);
  const [alert, setAlert] = useState({ message: "", severity: "success" });
  const dispatch = useDispatch();

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      if (form.username.trim() === "" || form.email.trim() === "") {
        setAlert({
          message: "Please fill in all fields.",
          severity: "error",
        });
        setOpenAlert(true);
      } else {
        const res = await axios.put(
          `${SERVER_URL}/users/edit/${currentUser?._id}`,
          { ...form },
          { withCredentials: true }
        );
        setAlert({
          message: "Successfully edited profile.",
          severity: "success",
        });
        setOpenAlert(true);
        dispatch(loginSuccess(res.data));
      }
    } catch (error) {
      console.log(error);
      setAlert({
        message: "Something went wrong.",
        severity: "error",
      });
      setOpenAlert(true);
    }
  };

  useEffect(() => {
    if (!currentUser) navigate("/");
  }, [currentUser, navigate]);

  return (
    <Container sx={{ marginTop: "2rem", marginBottom: "2rem" }} maxWidth="xl">
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid
          item
          xs={12}
          md={8}
          sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}
        >
          <Typography variant="h6">Edit your profile</Typography>
          <Paper
            sx={{
              padding: { xs: ".5rem", md: "1rem" },
              display: "flex",
              flexDirection: "column",
              gap: { xs: ".5rem", md: "1rem" },
            }}
            elevation={1}
          >
            <TextField
              label="Username"
              name="username"
              placeholder="Username"
              fullWidth
              onChange={handleForm}
              value={form.username}
            />
            <TextField
              label="Email"
              name="email"
              placeholder="Email"
              fullWidth
              onChange={handleForm}
              value={form.email}
            />
            <TextField
              multiline
              minRows={2}
              label="Description"
              placeholder="Sommething to describe yourself"
              name="desc"
              fullWidth
              onChange={handleForm}
              value={form.desc}
            />
            <TextField
              label="Profile Image"
              placeholder="Valid external image link only"
              name="img"
              fullWidth
              onChange={handleForm}
              value={form.img}
            />
            <Grid
              container
              sx={{ gap: { xs: ".5rem" }, justifyContent: "flex-end" }}
            >
              <Button
                component={Link}
                to={`/profile/${currentUser?._id}`}
                variant="contained"
                color="inherit"
              >
                Cancel
              </Button>
              <Button onClick={submitForm} variant="contained" color="primary">
                Save
              </Button>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}></Grid>
      </Grid>
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EditProfile;
