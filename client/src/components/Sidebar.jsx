import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  Home,
  ExploreOutlined,
  SubscriptionsOutlined,
  VideoLibraryOutlined,
  HistoryOutlined,
  AccountCircleOutlined,
  LibraryMusicOutlined,
  SportsBasketballOutlined,
  SportsEsportsOutlined,
  MovieOutlined,
  ArticleOutlined,
  LiveTvOutlined,
  SettingsOutlined,
  FlagOutlined,
  HelpOutlineOutlined,
  SettingsBrightnessOutlined,
  ExitToAppOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/userSlice";
import { publicRequest } from "../requestMethod";

const Container = styled.div`
  flex: 1.2;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  height: 100vh;
  font-size: 14px;
  position: sticky;
  top: 0;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background-color: #eee;
  }
  ::-webkit-scrollbar-thumb {
    background-color: gray;
  }
`;
const Wrapper = styled.div`
  padding: 18px 26px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;
const Img = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 25%;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 7px 0px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;
const Hr = styled.hr`
  margin: 10px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;
const Button = styled.button`
  padding: 5px 10px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;
const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 10px;
`;

function Sidebar({ darkMode, setDarkMode }) {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch;

  const handleLogout = () => {
    dispatch(logOut());
  };

  // const handleLogout = async () => {
  //   try {
  //     await publicRequest.post("auth/logout");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Container>
      <Wrapper>
        <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/YouTube_social_red_square_%282017%29.svg/2048px-YouTube_social_red_square_%282017%29.svg.png" />
            DarshTube
          </Logo>

          <Item>
            <Home />
            Home
          </Item>
        </NavLink>

        <NavLink
          to="/trends"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <ExploreOutlined />
            Explore
          </Item>
        </NavLink>

        <NavLink
          to="/subs"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <SubscriptionsOutlined />
            Subscriptions
          </Item>
        </NavLink>

        <Hr />
        <Item>
          <VideoLibraryOutlined />
          Library
        </Item>
        <Item>
          <HistoryOutlined />
          History
        </Item>
        <Hr />

        {currentUser ? (
          <Button
            style={{
              color: "red",
              border: "1px solid red",
              borderRadius: "5px",
              marginLeft: "6px",
            }}
            onClick={handleLogout}
          >
            <ExitToAppOutlined />
            Logout
          </Button>
        ) : (
          <NavLink
            to="/login"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Login>
              Sign in to like videos, comment, and subscribe.
              <Button>
                <AccountCircleOutlined />
                SIGN IN
              </Button>
            </Login>
          </NavLink>
        )}

        <Hr />
        {currentUser ? (
          <Title>Best Of {currentUser.username} Tube</Title>
        ) : (
          <Title>Best Of Name Tube</Title>
        )}

        <Item>
          <LibraryMusicOutlined />
          Music
        </Item>
        <Item>
          <SportsBasketballOutlined />
          Sports
        </Item>
        <Item>
          <SportsEsportsOutlined />
          Gaming
        </Item>
        <Item>
          <MovieOutlined />
          Movies
        </Item>
        <Item>
          <ArticleOutlined />
          News
        </Item>
        <Item>
          <LiveTvOutlined />
          Live
        </Item>
        <Hr />
        <Item>
          <SettingsOutlined />
          Settings
        </Item>
        <Item>
          <FlagOutlined />
          Report
        </Item>
        <Item>
          <HelpOutlineOutlined />
          Help
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlined />
          {darkMode ? "Ligth" : "Dark"} Mode
        </Item>
      </Wrapper>
    </Container>
  );
}

export default Sidebar;
