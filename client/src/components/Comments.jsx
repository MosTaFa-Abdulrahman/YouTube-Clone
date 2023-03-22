import styled from "styled-components";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethod";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommentFaulire,
  addCommentStart,
  addCommentSuccess,
} from "../redux/commentSlice";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;
const Input = styled.input`
  width: 100%;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  border: none;
  outline: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  padding: 5px;
`;
const Button = styled.button`
  color: white;
  background-color: #055c9d;
  width: 75px;
  padding: 12px;
  margin: 1px;
  outline: none;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

function Comments({ videoId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [desc, setDesc] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await publicRequest.get(`comment/get/${videoId}`);
        setComments(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, [videoId]);

  const handleAddComment = async (e) => {
    dispatch(addCommentStart());
    try {
      if (desc) {
        const res = await publicRequest.post("comment/create", {
          desc,
          videoId,
        });
        dispatch(addCommentSuccess(res.data));
      } else alert("Please Enter Your Message ☻");
    } catch (error) {
      dispatch(addCommentFaulire());
      console.log(error.message);
      alert(error.message);
    }
  };

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.img} />
        <Input
          placeholder="Enter Your Comment... ☻"
          onChange={(e) => setDesc(e.target.value)}
        />
        <Button onClick={handleAddComment}>ADD</Button>
      </NewComment>

      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
}

export default Comments;
