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

const Container = styled.div`
  align-items: center;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const Home: NextPage = () => {
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
          <h2 style={{font:'Averia Serif Libre', marginBottom:"0px", fontSize:"48px"}}>Insomnia?</h2>
          <h3 style={{font:'Averia Serif Libre', marginTop:"0px"}}>We can help with that</h3>
          <a href={"/login"} style={{background: 'yellow', borderRadius:'16px', height:'35px', width:'100%', textAlign:'center', font: 'Averia Serif Libre'}}>Join Now</a>
        </Container>
      </BaseLayout>
    );
  }

  return <LoadingRotation />;
};

export default Home;
