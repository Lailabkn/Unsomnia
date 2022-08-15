import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import styled from "styled-components";
import BaseLayout from "../components/layout/base";
import { register } from "../utils/api";

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

export default function Register() {
  const queryClient = useQueryClient();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkerPassword, setCheckerPassword] = useState("");

  const {
    isError,
    error,
    mutateAsync: registerAndMutate,
  } = useMutation(register, {
    onSuccess: () => {
      queryClient.invalidateQueries(["me"]);
      window.location.href = "./";
    },
    onError: () => {
      setUsername("");
      setPassword("");
      setEmail("");
      setCheckerPassword("");
    },
  });

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    if (password === checkerPassword) {
      await registerAndMutate({ username, email, password });
    }
  }

  return (
    <BaseLayout>
      <Main>
        <FormContainer>
          <FormStyled onSubmit={(e) => handleRegister(e)}>
            <InputContainer>
              <label htmlFor="username" style={{color:'white'}}>Username</label>
              <input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <label htmlFor="email" style={{color:'white'}}>Email</label>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <label htmlFor="password" style={{color:'white'}}>Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <label htmlFor="checkerPassword" style={{color:'white'}}>Repeat Password</label>
              <input
                id="checkerPassword"
                type="password"
                value={checkerPassword}
                onChange={(e) => setCheckerPassword(e.target.value)}
              />
            </InputContainer>
            <button type="submit" style={{background:'yellow', borderRadius:'16px', alignSelf:'center', width:'100%', marginTop:'0.5rem'}}>Register</button>
          </FormStyled>
          <p>
            Already have an account? <a href="./login">Log In</a>
          </p>
        </FormContainer>
      </Main>
    </BaseLayout>
  );
}
