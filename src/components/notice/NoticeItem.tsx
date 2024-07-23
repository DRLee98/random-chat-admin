import styled from "styled-components";

import { NavLink } from "react-router-dom";
import { AiFillPushpin } from "react-icons/ai";

import { getDateString } from "@/utils/date";

import type { NoticeBaseFragment } from "@/graphql/__generated__/graphql";

interface NoticeItemProps {
  notice: NoticeBaseFragment;
}

const NoticeItem = ({ notice }: NoticeItemProps) => {
  return (
    <Container>
      <button>
        <PinnedIcon pinned={Boolean(notice.pinned)} />
      </button>
      <div>
        <NavLink to={`/notice/${notice.id}`}>
          <Title>{notice.title}</Title>
        </NavLink>
        <Date>{getDateString(notice.updatedAt)}</Date>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 20px 1fr;
  align-items: center;
  gap: 20px;

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

interface PinnedIconProps {
  pinned: boolean;
}

const PinnedIcon = styled(AiFillPushpin)<PinnedIconProps>`
  color: ${({ theme, pinned }) =>
    pinned ? theme.primary.default : theme.gray500.default};
  font-size: 20px;

  &:hover {
    color: ${({ theme }) => theme.primary.accessible};
  }
`;

export default NoticeItem;
