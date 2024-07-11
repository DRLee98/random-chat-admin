import { useState } from "react";
import useUpdateAccusationStatus from "@/graphql/hooks/accusation/useUpdateAccusationStatus";
import useViewAccusation from "@/graphql/hooks/accusation/useViewAccusation";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";
import Input from "@/components/common/Input";

import { AccusationStatus } from "@/graphql/__generated__/graphql";

const AccusationPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { data, loading, error } = useViewAccusation({
    id: id ?? "",
    password: location.state.password,
  });

  const [updateAccusationStatus] = useUpdateAccusationStatus();
  const [answer, setAnswer] = useState("");

  const updateAccusationStatusFn = async (status: AccusationStatus) => {
    const result = await updateAccusationStatus({
      variables: {
        input: {
          id: id ?? "",
          status,
          password: location.state.password,
          answer,
        },
      },
    });
    if (result.data?.updateAccusationStatus.ok) {
      const ok = window.confirm("신고 처리가 완료되었습니다.");
      ok && navigate("/");
    } else {
      window.alert("신고 처리에 실패했습니다.");
    }
  };

  return (
    <Container>
      <Label>신고 대상</Label>
      <div>{data?.viewAccusation.accusation?.info.user.nickname}</div>
      <div />
      <Label>신고 내용</Label>
      <p>{data?.viewAccusation.accusation?.content}</p>
      <div />
      {(data?.viewAccusation.accusation?.imageUrls ?? []).length > 0 && (
        <>
          <Label>신고 이미지</Label>
          <ImageBox>
            {(data?.viewAccusation.accusation?.imageUrls ?? []).map(
              (url, index) => (
                <img key={index} src={url} alt="신고 이미지" />
              ),
            )}
          </ImageBox>
        </>
      )}
      <div />
      <div />
      <Label>신고 답변</Label>
      <Input value={answer} onChange={(e) => setAnswer(e.target.value)} />
      <div />
      <ButtonBox>
        <button
          onClick={() => updateAccusationStatusFn(AccusationStatus.Accept)}
        >
          승인
        </button>
        <button
          onClick={() => updateAccusationStatusFn(AccusationStatus.Reject)}
        >
          거부
        </button>
      </ButtonBox>
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

  width: 100%;
  img {
    width: 100%;
    background-color: ${({ theme }) => theme.gray300.default};
  }
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 10px;

  button {
    width: 100px;
    padding: 10px;
    border-radius: 10px;
    color: ${({ theme }) => theme.bgColor};
    font-weight: bold;
    &:first-of-type {
      background-color: ${({ theme }) => theme.green.default};
    }
    &:last-of-type {
      background-color: ${({ theme }) => theme.red.default};
    }
  }
`;

export default AccusationPage;
