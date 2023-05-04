import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchFromApi } from "../utils/fetchFromApi";
import ReactPlayer from "react-player";
import { Box, Stack, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Videos } from "./";

const VideoDetail = () => {
  const [videoDetail, setvideoDetail] = useState(null);
  const [videos, setvidoes] = useState(null);
  const { id } = useParams();
  console.log(videoDetail);
  useEffect(() => {
    fetchFromApi(`videos?part=snippet,statistics&id=${id}`).then((data) => {
      setvideoDetail(data.items[0]);
    });
    fetchFromApi(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => {
        setvidoes(data.items);
      }
    );
  }, [id]);
  if (!videoDetail?.snippet) return "loading...";
  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;
  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              className="react-player"
            />
            <Typography color="#fff" variant="h5" p={2} fontWeight="bold">
              {title}
            </Typography>
            <Stack
              direction="row"
              px={2}
              py={1}
              justifyContent="space-between"
              sx={{ color: "#fff" }}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{ sm: "subtitle", md: "h6" }} color="#fff">
                  {channelTitle}
                  <CheckCircle
                    sx={{ color: "gray", fontSize: "12px", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ Opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} Views
                </Typography>
                <Typography variant="body1" sx={{ Opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} Likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ xs: 4, sm: 2, md: 1 }}
          
          margin="auto"
          justifyContent="center"
        >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
