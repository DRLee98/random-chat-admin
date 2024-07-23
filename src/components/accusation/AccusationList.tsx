import { useEffect } from "react";
import { useGetPassword } from "@/context/PasswordContext";
import useViewAccusations from "@/graphql/hooks/accusation/useViewAccusations";

import styled from "styled-components";
import InfiniteScroll from "../common/InfiniteScroll";
import AccusationItem from "./AccusationItem";

const AccusationList = () => {
  const [viewAccusations, { data, loading, fetchMore }] = useViewAccusations({
    fetchPolicy: "network-only",
  });

  const password = useGetPassword();

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

  useEffect(() => {
    if (password) {
      onLoad();
    }
  }, [password]);

  return (
    <Container>
      <InfiniteScroll fetchMore={fetchMore}>
        {password &&
          data?.viewAccusations.accusations?.map((accusation) => (
            <AccusationItem
              key={accusation.id}
              accusation={accusation}
              password={password}
            />
          ))}
      </InfiniteScroll>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export default AccusationList;
