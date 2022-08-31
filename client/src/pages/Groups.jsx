import React from "react";
import axios from "axios";
import { Box } from "@mui/system";
import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import GroupsIcon from "@mui/icons-material/Groups";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Groups = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/groups/`);
        setGroups(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGroups();
  }, []);

  return (
    <>
      <Box>
        <Grid container>
          {groups.map((group) => (
            <Grid
              xs={6}
              md={3}
              sx={{
                background: `url(${group.img}) center`,
                height: { xs: "200px", md: "400px" },
                backgroundSize: "cover",
                overflow: "hidden",
              }}
              key={group._id}
              item
            >
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to={`/groups/${group._id}`}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "flex-end",
                    background:
                      "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0,0,0,0.3))",
                    "&:hover": {
                      transform: "scale(1.01)",
                      overflow: "hidden",
                      transition: ".3s ease-in-out",
                    },
                  }}
                >
                  <Box sx={{ padding: { xs: "1rem", md: "2rem" } }}>
                    <Grid container sx={{ color: "white" }}>
                      <GroupsIcon />{" "}
                      <Typography ml={1} mr="auto">
                        {group?.subscribedUsers?.length}
                      </Typography>
                      {currentUser &&
                      group?.subscribedUsers?.includes(currentUser._id) ? (
                        <>
                          <Button size="small" variant="text" color="error">
                            <RemoveIcon /> Unfollow
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button size="small" variant="text">
                            <AddIcon /> Follow
                          </Button>
                        </>
                      )}
                    </Grid>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: "white",
                      }}
                      variant="h6"
                    >
                      {group.name}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#ddd",
                        display: { xs: "none", md: "block" },
                      }}
                      variant="p"
                    >
                      {group.desc}
                    </Typography>
                  </Box>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Groups;
