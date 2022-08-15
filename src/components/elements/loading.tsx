import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const rotate = keyframes`
    from {
        transform : rotate(0deg);
    }

    to {
        transform : rotate(360deg);
    }
`;

const Main = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1em;
  justify-content: center;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 2rem;
`;

const Container = styled.div`
  align-items: center;
  animation: ${rotate} 2s linear infinite;
  display: flex;
  color: white;
  flex-direction: column;
  height: 4rem;
  justify-content: center;
  width: 4rem;

  /* border: solid 1px white; */
`;

export default function LoadingRotation() {
  return (
    <Main>
      <Container>
        <FontAwesomeIcon icon={faSpinner} size='10x' />
      </Container>
      <Title>Loading</Title>
    </Main>
  );
}
