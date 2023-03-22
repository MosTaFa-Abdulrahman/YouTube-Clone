import styled from "styled-components";
import { useState, useEffect } from "react";
import { publicRequest } from "../requestMethod";
import CardVideo from "./CardVideo";

const Container = styled.div`
  flex: 2;
`;

function Reccomendition({ tags }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const res = await publicRequest.get(`video/tags?tags=${tags}`);
        setVideos(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getVideos();
  }, [tags]);

  return (
    <Container>
      {videos.map((video) => (
        <CardVideo type="sm" key={video._id} video={video} />
      ))}
    </Container>
  );
}

export default Reccomendition;
