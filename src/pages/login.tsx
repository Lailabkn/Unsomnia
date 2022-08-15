import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import styled from "styled-components";
import BaseLayout from "../components/layout/base";
import { UserLogin } from "../types/types";
import { login } from "../utils/api";

const Main = styled.div``;

const FormContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FormStyled = styled.form``;

const InputContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const Spacer = styled.div`
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
        <FormContainer>
          <FormStyled onSubmit={(e) => handleLogin(e)}>
            <InputContainer>
              <label htmlFor="username" style={{color:'white'}}>Username</label>
              <input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <label htmlFor="password" style={{color:'white', marginTop:'0.5rem'}}>Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputContainer>
            <button type="submit" style={{background:'yellow', borderRadius:'16px', alignSelf:'center', width:'100%', marginTop:'0.5rem'}}>Log In</button>
          </FormStyled>
          <p style={{color:'white'}}>
            Don&apos;t have an account yet? <a href="./register" style={{color:'white', textDecoration:'underline'}}>Register</a>
          </p>
        </FormContainer>
      </Main>
    </BaseLayout>
  );
}
