import type { NextPage } from "next";
import styled from "styled-components";
import BaseLayout from "../components/layout/base";
import { useQuery } from "@tanstack/react-query";
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
  font-size: 3rem;
`;

const SubTitle = styled.h3``;

const Button = styled.button`
  background-color: #ffe16b;
  border-radius: 1rem;
  padding: 0.5em;
  text-align: center;
  width: 100%;
`;

const Home: NextPage = () => {
  const router = useRouter();
  const { data, status } = useQuery<UserOpaque | undefined>(["me"], getMe, {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // return (
  //   <BaseLayout>
  //     <LoadingRotation />
  //   </BaseLayout>
  // );

  if (status === "loading") {
    return (
      <BaseLayout>
        <LoadingRotation />
      </BaseLayout>
    );
  }

  if (status === "success") {
    window.location.href = "/alarms";
  }

  return (
    <BaseLayout>
      <Container>
        <MainTitle>Insomnia?</MainTitle>
        <SubTitle>We can help with that</SubTitle>
        <Button onClick={() => router.push("/login")}>Join Now</Button>
      </Container>
    </BaseLayout>
  );
};

export default Home;
