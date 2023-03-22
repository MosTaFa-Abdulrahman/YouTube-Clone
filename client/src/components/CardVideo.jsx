import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethod";

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "350px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 95%;
  height: ${(props) => (props.type === "sm" ? "118px" : "202px")};
  object-fit: cover;
  background-color: #999;
  border: none;
  border-radius: 10px;
`;

const ChannelDetails = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
`;
const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;
const ChannelTexts = styled.div``;
const ChannelTitle = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;
const ChannelInfo = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

function CardVideo({ type, video }) {
  const [channel, setChannel] = useState({});

  //  Get ((User))
  useEffect(() => {
    const getUser = async () => {
      const res = await publicRequest.get(`user/get/${video.userId}`);
      setChannel(res.data);
    };
    getUser();
  }, [video.userId]);

  return (
    <NavLink to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image type={type} src={video.imgUrl} />

        <ChannelDetails type={type}>
          <ChannelImage type={type} src={channel.img} />
          <ChannelTexts>
            <ChannelTitle>{video.title}</ChannelTitle>
            <ChannelName>{channel.username}</ChannelName>
            <ChannelInfo>
              {video.views} Views • {format(video.createdAt)}
            </ChannelInfo>
          </ChannelTexts>
        </ChannelDetails>
      </Container>
    </NavLink>
  );
}

export default CardVideo;
