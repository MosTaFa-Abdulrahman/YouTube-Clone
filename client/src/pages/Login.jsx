import styled from "styled-components";
import { useState } from "react";
import { publicRequest } from "../requestMethod";
import { useDispatch } from "react-redux";
import {
  loginFaulire,
  loginStart,
  loginSuccess,
  registerFaulire,
  registerStart,
  registerSuccess,
} from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { Google } from "@mui/icons-material";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 140px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [img, setImg] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      if (username && password) {
        const res = await publicRequest.post("auth/login", {
          username,
          password,
        });
        dispatch(loginSuccess(res.data));
      } else alert("Please Enter Your Data ~!");
    } catch (error) {
      dispatch(loginFaulire());
      alert(error.message);
    }
  };

  // Login With Google
  const handleLoginGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        publicRequest
          .post("/auth/google", {
            username: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            console.log(res);
            dispatch(loginSuccess(res.data));
          });
      })
      .catch((error) => {
        dispatch(loginFaulire());
        console.log(error);
        alert(error.message);
      });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(registerStart());
    try {
      if (username && password && email) {
        const res = publicRequest.post("auth/register", {
          username,
          email,
          password,
          img,
        });
        dispatch(registerSuccess(res.data));
      } else alert("Please Enter Your Data ~!");
    } catch (err) {
      dispatch(registerFaulire());
      console.log(err);
      alert(err.message);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to DarshTube</SubTitle>
        <Input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Sign in</Button>
        <Title>OR</Title>
        <Button onClick={handleLoginGoogle}>
          Google <Google style={{ color: "blue", marginLeft: "5px" }} />
        </Button>

        <Title>OR</Title>
        <Input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input placeholder="Image" onChange={(e) => setImg(e.target.value)} />
        <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleRegister}>Sign up</Button>
      </Wrapper>

      <More>
        English(UK)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
}

export default Login;
