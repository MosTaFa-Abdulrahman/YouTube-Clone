import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethod";
import CardVideo from "../components/CardVideo";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

function Search() {
  const [videos, setVideos] = useState([]);
  const q = useLocation().search;

  useEffect(() => {
    const getVideos = async () => {
      const res = await publicRequest.get(`video/search${q}`);
      setVideos(res.data);
    };
    getVideos();
  }, [q]);

  return (
    <Container>
      {videos.map((video) => (
        <CardVideo key={video._id} video={video} />
      ))}
    </Container>
  );
}

export default Search;
