import styled from "styled-components";
import CardVideo from "../components/CardVideo";
import { useState, useEffect } from "react";
import { publicRequest } from "../requestMethod";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

function Home({ type }) {
  const [videos, setVideos] = useState([]);

  // Get ((Random,Trend,Sub)) Videos
  useEffect(() => {
    const getVideos = async () => {
      const res = await publicRequest.get(`video/${type}`);
      setVideos(res.data);
    };
    getVideos();
  }, [type]);

  return (
    <Container>
      {videos.map((video) => (
        <CardVideo key={video._id} video={video} />
      ))}
    </Container>
  );
}

export default Home;
