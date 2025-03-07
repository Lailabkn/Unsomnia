import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../utils/api";

interface IDropdown {
  show: boolean;
}

const Main = styled.div`
  align-items: center;
  background-color: #00537a;
  color: white;
  display: flex;
  justify-content: center;
  padding: 0.5em 1em;
  width: 100%;
`;

const Heading = styled.h1`
  /* border: solid 1px white; */
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const ButtonStyled = styled.div`
  background-color: rgba(0, 0, 0, 0);
  pointer-events: auto;
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const Dropdown = styled.div<IDropdown>`
  position: absolute;
  display: ${({ show }) => (show ? "flex" : "none")};
  top: 100%;
  right: 0;
  pointer-events: none;
`;

const ButtonContainer = styled.div`
  align-items: end;
  background-color: white;
  border-radius: 0.25em;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1em;
  padding: 0.5em;
`;

function AccountButton() {
  const queryClient = useQueryClient();
  const {
    data,
    isError,
    error,
    isLoading,
    mutateAsync: logoutAndMutate,
  } = useMutation(logout, {
    onSuccess: () => {
      queryClient.invalidateQueries(["me"]);
      window.location.href = "./";
    },
  });
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <DropdownContainer>
      <ButtonStyled
        onClick={() => setShowDropdown((prevShowDropdown) => !prevShowDropdown)}
      >
        <FontAwesomeIcon icon={faCircleUser} fontSize={"2em"} />
      </ButtonStyled>
      <Dropdown show={showDropdown}>
        <ButtonContainer>
          <p onClick={() => logoutAndMutate()}>Logout</p>
        </ButtonContainer>
      </Dropdown>
    </DropdownContainer>
  );
}

export default function Header({ showAccount }: { showAccount: boolean }) {
  return (
    <Main>
      <Heading
        onClick={() => {
          window.location.href = "./";
        }}
      >
        Unsomnia
      </Heading>
      <Spacer />
      {/* <FontAwesomeIcon icon={faCircleUser} fontSize={"2em"} /> */}
      {showAccount ? <AccountButton /> : null}
    </Main>
  );
}
