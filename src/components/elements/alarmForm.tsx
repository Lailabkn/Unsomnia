import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FormEvent, ReactNode, useEffect, useState } from "react";
import { Alarm, Urgency } from "../../types/types";
import {
  FormContainer,
  FormStyled,
  InputContainer,
  InputText,
  Main,
  SubmitButton,
} from "../../pages/login";

interface RadioButtonProps {
  typeOfUrgency: Urgency;
  selected: boolean;
}

const MainAlarm = styled(Main)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: solid 2px var(--yellow-color);
  border-radius: 0.25em;
  padding: 1em;
`;

const RadioContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 0.25em;
`;

const RadioButton = styled.button<RadioButtonProps>`
  background-color: ${({ typeOfUrgency, selected }) =>
    selected ? `var(--${typeOfUrgency})` : "white"};
  color: ${({ selected }) => (selected ? "white" : "black")};
  border: none;
  border-radius: 0.5em;
  padding: 0.25em 0.5em;
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

export default function AlarmForm({
  functionToAdd,
}: {
  functionToAdd: (arg1: Alarm) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState("low" as Urgency);
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");

  useEffect(() => {
    if (parseInt(hour) >= 24 || parseInt(hour) < 0) {
      setHour("0");
    }
  }, [hour]);

  useEffect(() => {
    if (parseInt(minute) >= 60 || parseInt(minute) < 0) {
      setMinute("0");
    }
  }, [minute]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const createdAlarm = {
      Title: title,
      Description: description,
      Hour: parseInt(hour),
      Minute: parseInt(minute),
      Difficulty: urgency,
    } as Alarm;

    functionToAdd(createdAlarm);
  }

  return (
    <MainAlarm>
      <FontAwesomeIcon icon={faClock} size='2x' />
      <FormStyled onSubmit={(e) => handleSubmit(e)}>
        <InputContainer>
          <label htmlFor='alarmName' style={{ color: "white" }}>
            Title
          </label>
          <InputText
            id='alarmName'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor='alarmDescription' style={{ color: "white" }}>
            Description
          </label>
          <InputText
            id='alarmDescription'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </InputContainer>
        <RadioContainer>
          <p>Urgency</p>
          <Spacer />
          <RadioContainer>
            <RadioButton
              selected={urgency === "low"}
              typeOfUrgency='low'
              type='button'
              onClick={() => setUrgency("low")}
            >
              Low
            </RadioButton>
            <RadioButton
              selected={urgency === "med"}
              type='button'
              typeOfUrgency='med'
              onClick={() => setUrgency("med")}
            >
              Med
            </RadioButton>
            <RadioButton
              selected={urgency === "high"}
              type='button'
              typeOfUrgency='high'
              onClick={() => setUrgency("high")}
            >
              High
            </RadioButton>
          </RadioContainer>
        </RadioContainer>
        <InputContainer>
          <label htmlFor='alarmHour' style={{ color: "white" }}>
            Hour
          </label>
          <InputText
            id='alarmHour'
            type='number'
            min='0'
            max='24'
            value={hour}
            onChange={(e) => setHour(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor='alarmMinute' style={{ color: "white" }}>
            Minute
          </label>
          <InputText
            id='alarmMinute'
            type='number'
            min='0'
            max='60'
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
          />
        </InputContainer>
        <SubmitButton type='submit'>Create Alarm</SubmitButton>
      </FormStyled>
    </MainAlarm>
  );
}
