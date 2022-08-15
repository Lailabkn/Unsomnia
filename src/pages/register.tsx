import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import styled from "styled-components";
import BaseLayout from "../components/layout/base";
import { register } from "../utils/api";
import {
  FormContainer,
  FormStyled,
  InputContainer,
  InputText,
  Main,
  SubmitButton,
} from "./login";

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
      window.location.href = "./";
      queryClient.invalidateQueries(["me"]);
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
        <FontAwesomeIcon icon={faUser} size='2x' />
        <FormContainer>
          <FormStyled onSubmit={(e) => handleRegister(e)}>
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
              <label htmlFor='email' style={{ color: "white" }}>
                Email
              </label>
              <InputText
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <label htmlFor='password' style={{ color: "white" }}>
                Password
              </label>
              <InputText
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <label htmlFor='checkerPassword' style={{ color: "white" }}>
                Repeat Password
              </label>
              <InputText
                id='checkerPassword'
                type='password'
                value={checkerPassword}
                onChange={(e) => setCheckerPassword(e.target.value)}
              />
            </InputContainer>
            <SubmitButton type='submit'>Register</SubmitButton>
          </FormStyled>
          <p style={{ color: "white" }}>
            Already have an account?{" "}
            <a
              href='./login'
              style={{ color: "white", textDecoration: "underline" }}
            >
              Log In
            </a>
          </p>
        </FormContainer>
      </Main>
    </BaseLayout>
  );
}
