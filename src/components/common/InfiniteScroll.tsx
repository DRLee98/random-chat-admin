import { useRef } from "react";

import styled from "styled-components";

import { throttle } from "@/utils/function";

interface InfiniteScrollProps {
  children: React.ReactNode;
  fetchMore: () => void;
}

const InfiniteScroll = ({ children, fetchMore }: InfiniteScrollProps) => {
  const prevScrollTopRef = useRef<number>(0);
  const throttleFetchMore = throttle(fetchMore);

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;

    if (
      scrollTop - prevScrollTopRef.current > 0 &&
      scrollTop + clientHeight >= scrollHeight - clientHeight * 0.2
    ) {
      throttleFetchMore();
    }

    prevScrollTopRef.current = scrollTop;
  };

  return (
    <Container onScroll={onScroll}>
      <ChildrenBox>{children}</ChildrenBox>
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  height: 100%;
  overflow-y: scroll;

  border: 1px solid ${({ theme }) => theme.gray300.default};
  border-radius: 10px;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const ChildrenBox = styled.div`
  position: absolute;

  width: 100%;
`;

export default InfiniteScroll;
