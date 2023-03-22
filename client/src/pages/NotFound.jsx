import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyMessage = styled.h1`
  background-color: white;
  color: red;
  text-align: center;
  padding: 10px;
  border: 2px solid brown;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: brown;
    color: white;
    text-align: center;
    padding: 20px;
    border: 4px solid red;
    border-radius: 10px;
    font-style: italic;
    transition: 1s ease;
    cursor: pointer;
  }
`;

function NotFound() {
  return (
    <Container>
      <MyMessage>404 NotFound !!!</MyMessage>
    </Container>
  );
}

export default NotFound;
