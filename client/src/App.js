import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./utils/Theme";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";
import Search from "./pages/Search";

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding: 22px 96px;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/" element={<Home type="random" />} />
                <Route
                  path="/trends"
                  element={
                    currentUser ? (
                      <Home type="trend" />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/subs"
                  element={
                    currentUser ? <Home type="sub" /> : <Navigate to="/login" />
                  }
                />
                <Route path="/video/:id" element={<Video />} />
                <Route path="/search" element={<Search />} />
                <Route
                  path="/login"
                  element={currentUser ? <Navigate to="/" /> : <Login />}
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
