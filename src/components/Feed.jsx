import React from "react";
import { useState, useEffect } from "react";
import { Stack, Box, Typography } from "@mui/material";
import { Sidebarr, Videos } from "./";
import { fetchFromApi } from "../utils/fetchFromApi";
const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetchFromApi(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => {
        setVideos(data.items);
      })
      .catch((err) => console.log(err.message));
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sm: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sm: "auto", md: "auto" },
          borderRight: "1px solid #3d3d3d",
          px: { sm: 0, md: 2 },
        }}
      >
        <Sidebarr
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
        >
          Copyright 2023 Amr Media
        </Typography>
      </Box>

      <Box px={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory} <span style={{ color: "#F31503" }}>videos</span>
        </Typography>
        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
