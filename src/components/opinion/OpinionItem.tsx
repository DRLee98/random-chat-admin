import styled from "styled-components";

import { NavLink } from "react-router-dom";

import { getDateString } from "@/utils/date";
import {
  OpinionCategory,
  OpinionStatus,
} from "@/graphql/__generated__/graphql";

import type { ViewOpinionsQuery } from "@/graphql/__generated__/graphql";
import type { RequiredItem } from "types/utils";

interface OpinionItemProps {
  opinion: RequiredItem<ViewOpinionsQuery["viewOpinions"], "opinions">;
  password: string;
}

const OpinionItem = ({ opinion, password }: OpinionItemProps) => {
  const formatStatus = (status: string) => {
    switch (status) {
      case OpinionStatus.Waiting:
        return "대기 중";
      case OpinionStatus.Read:
        return "확인 중";
      case OpinionStatus.Answered:
        return "답변 완료";
      default:
        return "알 수 없음";
    }
  };

  const formatCategory = (category: string) => {
    switch (category) {
      case OpinionCategory.Imporve:
        return "개선";
      case OpinionCategory.Inquiry:
        return "문의";
      case OpinionCategory.Bug:
        return "버그";
      case OpinionCategory.Etc:
        return "기타";
      default:
        return "알 수 없음";
    }
  };

  return (
    <Container>
      <div>
        <NavLink to={`/opinion/${opinion.id}`} state={{ password }}>
          <Title>{opinion.title}</Title>
        </NavLink>
        <Category>{formatCategory(opinion.category)}</Category>
        <Date>{getDateString(opinion.updatedAt)}</Date>
      </div>
      <StatusText>{formatStatus(opinion.status)}</StatusText>
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
  word-break: break-word;
  line-height: 1.5;
`;

const Category = styled.small`
  display: block;
  margin-top: 2px;
  margin-bottom: 5px;

  font-size: 0.9rem;
  color: ${({ theme }) => theme.primary.default};
`;

const Date = styled.time`
  display: block;

  font-size: 0.8rem;
  color: ${({ theme }) => theme.gray100.default};
`;

const StatusText = styled.span`
  width: max-content;
  min-width: max-content;
  display: inline-block;

  font-size: 0.9rem;
  color: ${({ theme }) => theme.gray200.default};
`;

export default OpinionItem;
