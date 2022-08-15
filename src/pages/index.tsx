import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/elements/header";
import styles from "../styles/Home.module.css";
import styled from "styled-components";
import BaseLayout from "../components/layout/base";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { getMe } from "../utils/api";
import { UserOpaque } from "../types/types";
import LoadingRotation from "../components/elements/loading";
import { useRouter } from "next/router";

const Container = styled.div`
  align-items: center;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1em;
  height: 100%;
  width: 100%;
`;

const MainTitle = styled.h2`
  font-family: "Averia Serif Libre", "Sans-Serif";
  font-size: 3rem;
`;

const SubTitle = styled.h3`
  font-family: "Averia Serif Libre", "Sans-Serif";
`;

const Button = styled.button`
  background-color: yellow;
  border-radius: 1rem;
  padding: 0.5em;
  text-align: center;
  width: 100%;
`;

const Home: NextPage = () => {
  const router = useRouter();
  const { data, status } = useQuery<UserOpaque | undefined>(["me"], getMe, {
    retry: 1,
  });

  if (status === "success") {
    window.location.href = "/alarms";
  }

  if (status === "error") {
    return (
      <BaseLayout>
        <Container>
          <MainTitle>Insomnia?</MainTitle>
          <SubTitle>We can help with that</SubTitle>
          <Button onClick={() => router.push("/login")}>Join Now</Button>
        </Container>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <LoadingRotation />
    </BaseLayout>
  );
};

export default Home;
