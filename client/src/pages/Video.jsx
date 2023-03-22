import styled from "styled-components";
import {
  ThumbUpOutlined,
  ThumbDownOutlined,
  SendOutlined,
  BookmarkBorderOutlined,
  ThumbUp,
  ThumbDown,
} from "@mui/icons-material";
import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { publicRequest } from "../requestMethod";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { subscription } from "../redux/userSlice";
import { format } from "timeago.js";
import Reccomendition from "../components/Reccomendition";

const Container = styled.div`
  display: flex;
  gap: 24px;
  color: ${({ theme }) => theme.text};
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const VideoTitle = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
`;
const VideoDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const VideoInfo = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;
const VideoButtons = styled.div`
  display: flex;
  gap: 20px;
`;
const VideoButton = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 10px 0px;
  border: 0.5px solid;
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;
const ChannelImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;
const ChannelDetails = styled.div`
  display: flex;
  flex-direction: column;
`;
const ChannelName = styled.span`
  font-weight: 500;
`;
const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;
const ChannelDesc = styled.p`
  font-size: 14px;
`;
const ChannelSubscribe = styled.button`
  font-weight: 500;
  background-color: #cc1a00;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 12px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 600px;
  width: 100%;
  background-color: burlywood;
  object-fit: cover;
`;

function Video() {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const [myVideo, setMyVideo] = useState({});
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await publicRequest.get(`video/get/${path}`);
        const channelRes = await publicRequest.get(
          `user/get/${videoRes.data.userId}`
        );

        // setMyVideo(videoRes.data);
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {}
    };
    fetchData();
  }, [path, dispatch]);

  const hanleLike = async () => {
    try {
      publicRequest.put(`user/like/${currentVideo._id}`);
      // publicRequest.put(`user/like/${myVideo._id}`);
      dispatch(like(currentUser._id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislike = async () => {
    try {
      publicRequest.put(`user/dislike/${currentVideo._id}`);
      // publicRequest.put(`user/dislike/${myVideo._id}`);
      dispatch(dislike(currentUser._id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSub = async () => {
    try {
      currentUser.subscribedUsers.includes(channel._id)
        ? publicRequest.put(`user/unsub/${channel._id}`)
        : publicRequest.put(`user/sub/${channel._id}`);
      dispatch(subscription(channel._id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo.videoUrl} controls />
          {/* <VideoFrame src={myVideo.videoUrl} controls /> */}
        </VideoWrapper>

        <VideoTitle>{currentVideo.title}</VideoTitle>
        {/* <VideoTitle>{myVideo.title}</VideoTitle> */}

        <VideoDetails>
          <VideoInfo>
            {currentVideo?.views} views * {format(currentVideo.createdAt)}
            {/* {myVideo?.views} views * {format(myVideo.createdAt)} */}
          </VideoInfo>
          <VideoButtons>
            <VideoButton onClick={hanleLike}>
              {/* {myVideo.likes?.includes(currentUser?._id) ? ( */}
              {currentVideo.likes?.includes(currentUser?._id) ? (
                <ThumbUp />
              ) : (
                <ThumbUpOutlined />
              )}{" "}
              {currentVideo.likes?.length}
              {/* {myVideo.likes?.length} */}
            </VideoButton>

            <VideoButton onClick={handleDislike}>
              {/* {myVideo.dislikes?.includes(currentUser?._id) ? ( */}
              {currentVideo.dislikes?.includes(currentUser?._id) ? (
                <ThumbDown />
              ) : (
                <ThumbDownOutlined />
              )}{" "}
              {currentVideo.dislikes?.length}
              {/* {myVideo.dislikes?.length} */}
            </VideoButton>
            <VideoButton>
              <SendOutlined />
              Share
            </VideoButton>
            <VideoButton>
              <BookmarkBorderOutlined />
              Save
            </VideoButton>
          </VideoButtons>
        </VideoDetails>
        <Hr />

        <Channel>
          <ChannelInfo>
            <ChannelImage src={channel.img} />
            <ChannelDetails>
              <ChannelName>{channel.username}</ChannelName>
              <ChannelCounter>{channel?.subscribers} Subscribes</ChannelCounter>
              <ChannelDesc>{currentVideo?.desc}</ChannelDesc>
              {/* <ChannelDesc>{myVideo?.desc}</ChannelDesc> */}
            </ChannelDetails>
          </ChannelInfo>
          <ChannelSubscribe onClick={handleSub}>
            {currentUser.subscribedUsers?.includes(channel._id)
              ? "Subscribed ▬↨"
              : "Subscribe"}
          </ChannelSubscribe>
        </Channel>
        <Hr />

        <Comments videoId={currentVideo._id} />
        {/* <Comments videoId={myVideo._id} /> */}
      </Content>

      <Reccomendition tags={currentVideo.tags} />
      {/* <Reccomendition tags={myVideo.tags} /> */}
    </Container>
  );
}

export default Video;
