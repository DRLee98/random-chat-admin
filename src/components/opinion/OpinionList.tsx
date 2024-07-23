import { useEffect } from "react";
import { useGetPassword } from "@/context/PasswordContext";
import useViewOpinions from "@/graphql/hooks/opinion/useViewOpinions";

import styled from "styled-components";
import InfiniteScroll from "../common/InfiniteScroll";
import OpinionItem from "./OpinionItem";

const OpinionList = () => {
  const [viewOpinions, { data, loading, fetchMore }] = useViewOpinions({
    fetchPolicy: "network-only",
  });

  const password = useGetPassword();

  const onLoad = () => {
    if (!password || loading) return;

    viewOpinions({
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
          data?.viewOpinions.opinions?.map((opinion) => (
            <OpinionItem
              key={opinion.id}
              opinion={opinion}
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

export default OpinionList;
