import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPassword } from "@/context/PasswordContext";
import useOpinionDetail from "@/graphql/hooks/opinion/useOpinionDetail";
import useUpdateOpinionStatus from "@/graphql/hooks/opinion/useUpdateOpinionStatus";
import useViewComments, {
  useUpdateViewComments,
} from "@/graphql/hooks/comment/useViewComments";
import useCreateComment from "@/graphql/hooks/comment/useCreateComment";

import styled from "styled-components";
import Input from "@/components/common/Input";

import { getDateTimeString } from "@/utils/date";

import {
  OpinionCategory,
  OpinionStatus,
} from "@/graphql/__generated__/graphql";

const OpinionDetailPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const password = useGetPassword();

  const { opinion, updateQuery } = useOpinionDetail({
    id: params.id ?? "",
  });
  const { comments } = useViewComments({
    postId: params.id ?? "",
  });
  const { appendViewComment } = useUpdateViewComments({
    postId: params.id ?? "",
  });

  const [createComment] = useCreateComment();
  const [updateOpinionStatus] = useUpdateOpinionStatus();

  const [value, setValue] = useState("");

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

  const nextStatus = (status: string) => {
    switch (status) {
      case OpinionStatus.Waiting:
        return OpinionStatus.Read;
      case OpinionStatus.Read:
        return OpinionStatus.Answered;
      default:
        return OpinionStatus.Waiting;
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

  const onKeyDown = async (e: React.KeyboardEvent) => {
    if (!params.id) return;

    if (e.key === "Enter") {
      const { data } = await createComment({
        variables: {
          input: {
            postId: params.id,
            text: value,
          },
        },
      });

      if (data?.createComment.comment) {
        appendViewComment(data.createComment.comment);
        setValue("");
      }
    }
  };

  const onUpdateStatus = async () => {
    if (!opinion || !params.id || !password) return;
    const status = nextStatus(opinion.status);
    const { data } = await updateOpinionStatus({
      variables: {
        input: {
          id: params.id,
          status,
          password: password,
        },
      },
    });

    if (data?.updateOpinionStatus.ok) {
      if (status === OpinionStatus.Answered) {
        return navigate("/");
      }
      updateQuery(
        (prev) =>
          prev?.opinionDetail && {
            ...prev,
            opinionDetail: {
              ...prev.opinionDetail,
              opinion: {
                ...prev.opinionDetail.opinion,
                status,
              },
            },
          },
      );
    }

    if (data?.updateOpinionStatus.error) {
      alert(data.updateOpinionStatus.error);
    }
  };

  return (
    <Container>
      <Label>제목</Label>
      <div>{opinion?.title}</div>
      <div />
      <Label>상태</Label>
      <FlexBox>
        <div>{formatStatus(opinion?.status ?? "")}</div>
        {opinion?.status !== OpinionStatus.Answered && (
          <Button onClick={onUpdateStatus}>
            {formatStatus(nextStatus(opinion?.status ?? ""))}
          </Button>
        )}
      </FlexBox>
      <div />
      <Label>카테고리</Label>
      <div>{formatCategory(opinion?.category ?? "")}</div>
      <div />
      <Label>내용</Label>
      <p>{opinion?.content}</p>
      <div />
      {(opinion?.imageUrls ?? []).length > 0 && (
        <>
          <Label>이미지</Label>
          <ImageBox>
            {(opinion?.imageUrls ?? []).map((url, index) => (
              <img key={index} src={url} alt="이미지" />
            ))}
          </ImageBox>
        </>
      )}
      <div />
      <Label>댓글</Label>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <div />
      {comments.map((comment) => (
        <div key={`comment-${comment.id}`}>
          <FlexBox>
            <UserNicname>{comment.user.nickname}</UserNicname>
            <CommentCreatedAt>
              {getDateTimeString(comment.createdAt)}
            </CommentCreatedAt>
          </FlexBox>
          <div>{comment.text}</div>
        </div>
      ))}
      <div />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  padding: 20px;
`;

const Label = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.gray100.default};
`;

const ImageBox = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;

  width: 80%;
  img {
    width: 100%;
    background-color: ${({ theme }) => theme.gray300.default};
  }
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserNicname = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.gray100.default};
`;

const CommentCreatedAt = styled.time`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.gray100.default};
`;

const Button = styled.button`
  width: 100px;
  padding: 10px;
  border-radius: 10px;

  background-color: ${({ theme, disabled }) =>
    disabled ? theme.gray300.default : theme.primary.default};
  color: ${({ theme }) => theme.bgColor};

  font-weight: bold;
`;

export default OpinionDetailPage;
