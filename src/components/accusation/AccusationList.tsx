import { useState } from "react";
import useViewAccusations from "@/graphql/hooks/accusation/useViewAccusations";

import styled from "styled-components";
import InfiniteScroll from "../common/InfiniteScroll";
import AccusationItem from "./AccusationItem";
import Input from "../common/Input";

const AccusationList = () => {
  const [viewAccusations, { data, loading, fetchMore }] = useViewAccusations({
    fetchPolicy: "network-only",
  });

  const [password, setPassword] = useState("");

  const onLoad = () => {
    if (!password || loading) return;

    viewAccusations({
      variables: {
        input: {
          password,
        },
      },
    });
  };

  return (
    <Container>
      <InfiniteScroll fetchMore={fetchMore}>
        {data?.viewAccusations.accusations?.map((accusation) => (
          <AccusationItem
            key={accusation.id}
            accusation={accusation}
            password={password}
          />
        ))}
      </InfiniteScroll>
      {!Boolean(data?.viewAccusations.ok) && (
        <Overlay>
          <Row>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ConfirmButton
              disabled={!Boolean(password) || loading}
              onClick={onLoad}
            >
              확인
            </ConfirmButton>
          </Row>
          {data?.viewAccusations.error && (
            <ErrorText>{data.viewAccusations.error}</ErrorText>
          )}
        </Overlay>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;

  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  width: 50%;
  max-width: 300px;
`;

const ConfirmButton = styled.button`
  width: max-content;
  min-width: max-content;
  height: 100%;

  padding: 10px;

  border-radius: 10px;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.gray300.default : theme.primary.default};
  color: ${({ theme }) => theme.bgColor};
`;

const ErrorText = styled.span`
  color: ${({ theme }) => theme.red.default};
`;

export default AccusationList;
