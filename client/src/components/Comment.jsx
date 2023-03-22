import styled from "styled-components";
import { useState, useEffect } from "react";
import { publicRequest } from "../requestMethod";
import { format } from "timeago.js";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDispatch } from "react-redux";
import {
  deleteCommentFauilure,
  deleteCommentStart,
  deleteCommentSuccess,
} from "../redux/commentSlice";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 24px 0;
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;
const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 7px;
`;
const Text = styled.span`
  font-size: 14px;
`;

function Comment({ comment }) {
  const [channel, setchannel] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await publicRequest.get(`user/get/${comment.userId}`);
        setchannel(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [comment.userId]);

  // Problem in BackEnd~!
  const handleDeleteComment = async () => {
    dispatch(deleteCommentStart());
    try {
      const res = await publicRequest.delete(
        `comment/delete/${comment.userId}`,
        { desc: comment.desc, videoId: comment.videoId }
      );
      dispatch(deleteCommentSuccess(res.data));
    } catch (err) {
      dispatch(deleteCommentFauilure());
      console.log(err.message);
      alert(err.message);
    }
  };

  return (
    <Container>
      <Avatar src={channel?.img} />
      <Details>
        <Name>
          {channel.username} <Date>{format(comment.createdAt)}</Date>
        </Name>
        <Text>{comment?.desc}</Text>
      </Details>

      <DeleteOutlineOutlinedIcon
        style={{ color: "red", cursor: "pointer" }}
        onClick={handleDeleteComment}
      />
    </Container>
  );
}

export default Comment;
