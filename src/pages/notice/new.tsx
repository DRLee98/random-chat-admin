import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGetPassword } from "@/context/PasswordContext";
import useCreateNotice from "@/graphql/hooks/notice/useCreateNotice";

import styled from "styled-components";
import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";

import { NoticeCategory } from "@/graphql/__generated__/graphql";

import type { CreateNoticeInput } from "@/graphql/__generated__/graphql";

interface FormValues extends Omit<CreateNoticeInput, "password"> {}

const NewNoticePage = () => {
  const navigate = useNavigate();
  const password = useGetPassword();
  const [createNotice, { loading }] = useCreateNotice();

  const { register, handleSubmit, formState } = useForm<FormValues>();

  const onSubmit = async (values: FormValues) => {
    if (!password || loading) return;

    const { data } = await createNotice({
      variables: {
        input: {
          ...values,
          password,
        },
      },
    });

    if (data?.createNotice.ok) {
      navigate("/");
    }

    if (data?.createNotice.error) {
      alert(data.createNotice.error);
    }
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Label>공지 제목</Label>
      <Input {...register("title", { required: true })} />
      <div />
      <Label>공지 카테고리</Label>
      <FlexBox>
        <label>
          <input
            type="radio"
            {...register("category", { required: true })}
            value={NoticeCategory.Info}
          />
          Info
        </label>
        <label>
          <input
            type="radio"
            {...register("category", { required: true })}
            value={NoticeCategory.Event}
          />
          Event
        </label>
        <label>
          <input
            type="radio"
            {...register("category", { required: true })}
            value={NoticeCategory.Update}
          />
          Update
        </label>
        <label>
          <input
            type="radio"
            {...register("category", { required: true })}
            value={NoticeCategory.Inspection}
          />
          Inspection
        </label>
      </FlexBox>
      <div />
      <Label>공지 내용</Label>
      <Textarea {...register("content", { required: true })} />
      <div />
      <label>
        <FlexBox>
          <input type="checkbox" {...register("pinned")} />
          <Label>공지 상단 고정</Label>
        </FlexBox>
      </label>
      <div />
      <Button disabled={!formState.isValid || loading}>작성하기</Button>
    </Container>
  );
};

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;

  padding: 20px;
`;

const Label = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.gray100.default};
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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

export default NewNoticePage;
