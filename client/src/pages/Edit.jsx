import {
  Autocomplete,
  Avatar,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import AboutSide from "../components/AboutSide";
import LinksSide from "../components/LinksSide";
import RulesSide from "../components/RulesSide";
import SERVER_URL from "../serverUrl";

const Edit = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [group, setGroup] = useState(null);
  const [contents, setContents] = useState(null);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/")[2];

  const [currentPost, setCurrentPost] = useState({});

  const loading = open && options.length === 0;

  function handleChange(content) {
    setContents(content);
  }

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/posts/find/${location}`);
        setCurrentPost(res.data);
        setTitle(res.data.title);
        setGroup(res.data.groupId);
        setContents(res.data.content);
      } catch (error) {
        console.log(error);
      }
    };

    getPost();
  }, [location]);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    const fetchGroups = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/groups`);
        if (active) setOptions(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGroups();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `${SERVER_URL}/posts/${currentPost._id}`,
        {
          title,
          groupId: group,
          content: contents,
        },
        { withCredentials: true }
      );
      navigate(`/post/${res.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (!currentUser) return navigate("/signup");

  return (
    <Container sx={{ paddingTop: "2rem", paddingBottom: "2rem" }} maxWidth="xl">
      <Grid container sx={{ gap: "2rem", justifyContent: "center" }}>
        <Grid
          item
          xs={12}
          md={8}
          sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Edit a post
          </Typography>
          <Divider />
          <Autocomplete
            id="asynchronous-demo"
            sx={{ width: 300 }}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            onChange={(event, value) => setGroup(value)}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select a group"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: group ? (
                    <Avatar sx={{ marginRight: ".5rem" }} src={group?.img} />
                  ) : null,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
          <TextField
            name="title"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {contents ? (
            <SunEditor
              lang="en"
              setContents={contents}
              placeholder=""
              setDefaultStyle="font-family: inherit; font-size: inherit; min-height: 200px;"
              setOptions={{
                buttonList: [
                  [
                    "undo",
                    "redo",
                    "font",
                    "fontSize",
                    "formatBlock",
                    "paragraphStyle",
                    "blockquote",
                    "bold",
                    "underline",
                    "italic",
                    "strike",
                    "subscript",
                    "superscript",
                    "fontColor",
                    "hiliteColor",
                    "textStyle",
                    "removeFormat",
                    "outdent",
                    "indent",
                    "align",
                    "horizontalRule",
                    "list",
                    "lineHeight",
                    "table",
                    "link",
                    "image",
                    "video",
                    "audio" /** 'math', */, // You must add the 'katex' library at options to use the 'math' plugin.
                    /** 'imageGallery', */ // You must add the "imageGalleryUrl".
                    "fullScreen",
                    "showBlocks",
                    "codeView",
                    "preview",
                    "print",
                    "save",
                    /** 'dir', 'dir_ltr', 'dir_rtl' */ // "dir": Toggle text direction, "dir_ltr": Right to Left, "dir_rtl": Left to Right
                  ],
                ],
              }}
              onChange={handleChange}
            />
          ) : (
            <CircularProgress color="inherit" size={20} />
          )}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleSubmit} variant="contained">
              Submit
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={3}>
          {group && (
            <>
              <AboutSide
                group={group}
                name={group?.name}
                desc={group?.desc}
                create
              />
              <LinksSide group={group} />
            </>
          )}
          <RulesSide />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Edit;
