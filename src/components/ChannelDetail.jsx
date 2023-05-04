import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Videos, ChannelCard } from "./";
import { fetchFromApi } from "../utils/fetchFromApi";

const ChannelDetail = () => {
  const [channelDetail, setchannelDetail] = useState(null);
  const [videos, setvideos] = useState([]);
  const { id } = useParams();
  console.log(channelDetail);
  console.log(videos);
  useEffect(() => {
    fetchFromApi(`channels?part=sinppet&id=${id}`).then((data) => {
      setchannelDetail(data.items[0]);
    });

    fetchFromApi(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => {
        setvideos(data.items);
      }
    );
  }, [id]);
  return (
    <Box minHeight="92vh">
      <Box>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(41,215,226,1) 0%, rgba(236,50,219,1) 0%, rgba(37,218,240,1) 98%)",
            zIndex: 10,
            height: "300px",
          }}
        />
        <ChannelCard marginTop="-110px" channelDetail={channelDetail} />
      </Box>
      <Box display="flex" p="2">
        {/* <Box sx={{ mr: { sm: "40px" } }} /> */}
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
