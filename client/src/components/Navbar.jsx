import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  AccountCircleOutlined,
  SearchOutlined,
  VideoCallOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useState } from "react";
import Upload from "./Upload";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  position: sticky;
  top: 0;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
  color: ${({ theme }) => theme.text};
`;
const Input = styled.input`
  width: 80%;
  border: none;
  outline: none;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  margin-right: 20px;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

function Navbar() {
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
            />
            <SearchOutlined
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/search?q=${q}`)}
            />
          </Search>

          {currentUser ? (
            <>
              <User>
                <VideoCallOutlined
                  style={{ cursor: "pointer" }}
                  onClick={() => setOpen(true)}
                />
                <Avatar src={currentUser.img} />
                {currentUser.username}
              </User>
            </>
          ) : (
            <NavLink
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button>
                <AccountCircleOutlined />
                SIGN IN
              </Button>
            </NavLink>
          )}
        </Wrapper>
      </Container>

      {open && <Upload setOpen={setOpen} />}
    </>
  );
}

export default Navbar;
