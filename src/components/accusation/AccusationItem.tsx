import styled from "styled-components";

import { NavLink } from "react-router-dom";

import { getDateString } from "@/utils/date";

import { AccusationStatus } from "@/graphql/__generated__/graphql";

import type { ViewAccusationsQuery } from "@/graphql/__generated__/graphql";
import type { RequiredItem } from "types/utils";

interface AccusationItemProps {
  accusation: RequiredItem<
    ViewAccusationsQuery["viewAccusations"],
    "accusations"
  >;
  password: string;
}

const AccusationItem = ({ accusation, password }: AccusationItemProps) => {
  const formatStatus = (status: string) => {
    switch (status) {
      case AccusationStatus.Wait:
        return "대기 중";
      case AccusationStatus.Reject:
        return "거부됨";
      case AccusationStatus.Accept:
        return "승인됨";
      default:
        return "알 수 없음";
    }
  };

  return (
    <Container>
      <div>
        <NavLink to={`/accusation/${accusation.id}`} state={{ password }}>
          <Title>
            {accusation.content.slice(0, 20)}
            {accusation.content.length > 20 ? "..." : ""}
          </Title>
        </NavLink>
        <Date>{getDateString(accusation.updatedAt)}</Date>
      </div>
      <StatusText>{formatStatus(accusation.status)}</StatusText>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.gray300.default};
`;

const Title = styled.h3`
  padding-bottom: 5px;
  line-height: 1.5;
`;

const Date = styled.time`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.gray100.default};
`;

const StatusText = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.gray200.default};
`;

export default AccusationItem;
