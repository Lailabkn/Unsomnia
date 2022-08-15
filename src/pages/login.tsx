import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FormEvent, useState } from "react";
import styled from "styled-components";
import BaseLayout from "../components/layout/base";
import { UserLogin } from "../types/types";
import { login } from "../utils/api";

export const Main = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: center;
`;

export const FormContainer = styled.div`
  align-items: center;
  border: solid 2px #ffe16b;
  border-radius: 0.25em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: center;
  padding: 0.5em;
`;

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  width: 100%;
`;

export const InputContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 0.25em;
  justify-content: center;
  width: 100%;
`;

export const InputText = styled.input`
  outline: none;
  padding: 0.25em;
  width: 100%;
`;

export const SubmitButton = styled.button`
  border-radius: 0.5em;
  background-color: #ffe16b;
  padding: 0.25em 0;
  font-size: 1em;
`;

export const Spacer = styled.div`
  flex-grow: 1;
`;

export default function Login() {
  const queryClient = useQueryClient();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {
    data,
    isError,
    error,
    isLoading,
    mutateAsync: loginAndMutate,
  } = useMutation(login, {
    onSuccess: () => {
      queryClient.invalidateQueries(["me"]);
      window.location.href = "./";
    },
    onError: () => {
      setUsername("");
      setPassword("");
    },
  });

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    await loginAndMutate({ username, password });
  }

  return (
    <BaseLayout>
      <Main>
        <FontAwesomeIcon icon={faUser} size='2x' />
        <FormContainer>
          <FormStyled onSubmit={(e) => handleLogin(e)}>
            <InputContainer>
              <label htmlFor='username' style={{ color: "white" }}>
                Username
              </label>
              <InputText
                id='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <label
                htmlFor='password'
                style={{ color: "white", marginTop: "0.5rem" }}
              >
                Password
              </label>
              <InputText
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputContainer>
            <SubmitButton type='submit'>Log In</SubmitButton>
          </FormStyled>
          <p style={{ color: "white" }}>
            Don&apos;t have an account yet?{" "}
            <a
              href='./register'
              style={{ color: "white", textDecoration: "underline" }}
            >
              Register
            </a>
          </p>
        </FormContainer>
      </Main>
    </BaseLayout>
  );
}
