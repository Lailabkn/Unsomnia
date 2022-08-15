import styled from "styled-components";

import { Alarm, Urgency } from "../../types/types";

interface MainProps {
  typeOfUrgency: Urgency;
}

const Main = styled.div`
  align-items: center;
  background-color: rgba(217, 217, 217, 0.3);
  border-radius: 1.5em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  justify-content: center;
  width: 100%;
  padding: 1em;
`;

const MainText = styled.div<MainProps>`
  --main-color: ${({ typeOfUrgency }) => `var(--${typeOfUrgency})`};
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const UrgencyIndicator = styled.h4`
  background-color: var(--main-color);
  border-radius: 0.5em;
  padding: 0.25em;
`;

const DeleteButton = styled.button`
  background-color: #7a0000;
  border-radius: 0.5em;
  color: white;
  border: none;
  padding: 0.25em 0.5em;
`;

export default function AlarmComponent({
  alarm: {
    Title: title,
    Description: description,
    Difficulty: urgency,
    Minute: minute,
    Hour: hour,
  },
  functionToDelete,
}: {
  alarm: Alarm;
  functionToDelete: () => void;
}) {
  return (
    <Main>
      <MainText typeOfUrgency={urgency}>
        <TitleContainer>
          <h3>{title}</h3>
          <h4>{description}</h4>
        </TitleContainer>
        <Spacer />
        <InfoContainer>
          <h3>
            {hour}.{minute}
          </h3>
          <UrgencyIndicator>{`${urgency[0].toUpperCase()}${urgency.slice(
            1
          )}`}</UrgencyIndicator>
        </InfoContainer>
      </MainText>
      <DeleteButton onClick={functionToDelete}>Delete</DeleteButton>
    </Main>
  );
}
