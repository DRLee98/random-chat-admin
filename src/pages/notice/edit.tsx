import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPassword } from "@/context/PasswordContext";
import useNotice from "@/graphql/hooks/notice/useNotice";
import useEditNotice from "@/graphql/hooks/notice/useEditNotice";
import useDeleteNotice from "@/graphql/hooks/notice/useDeleteNotice";

import styled from "styled-components";
import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";

import { NoticeCategory } from "@/graphql/__generated__/graphql";

import type { EditNoticeInput } from "@/graphql/__generated__/graphql";

interface FormValues extends Omit<EditNoticeInput, "password" | "id"> {}

const EditNoticePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const password = useGetPassword();

  const { notice } = useNotice({
    id: params.id ?? "",
  });
  const [editNotice, editData] = useEditNotice();
  const [deleteNotice, deleteData] = useDeleteNotice();

  const { register, handleSubmit, formState, setValue } = useForm<FormValues>();

  const onSubmit = async (values: FormValues) => {
    if (!password || !params.id || editData.loading || deleteData.loading)
      return;

    const { data } = await editNotice({
      variables: {
        input: {
          ...values,
          password,
          id: params.id,
        },
      },
    });

    if (data?.editNotice.ok) {
      navigate("/");
    }

    if (data?.editNotice.error) {
      alert(data.editNotice.error);
    }
  };

  const onDelete = async () => {
    const ok = window.confirm("정말 삭제하시겠습니까?");
    if (
      !ok ||
      !password ||
      !params.id ||
      editData.loading ||
      deleteData.loading
    )
      return;

    const { data } = await deleteNotice({
      variables: {
        input: {
          id: params.id,
          password,
        },
      },
    });

    if (data?.deleteNotice.ok) {
      navigate("/");
    }

    if (data?.deleteNotice.error) {
      alert(data.deleteNotice.error);
    }
  };

  useEffect(() => {
    if (notice) {
      setValue("title", notice.title);
      setValue("category", notice.category);
      setValue("content", notice.content);
      setValue("pinned", notice.pinned);
    }
  }, [notice]);

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
      <FlexBox>
        <Button
          disabled={
            !formState.isValid || editData.loading || deleteData.loading
          }
        >
          수정하기
        </Button>
        <Button
          type="button"
          onClick={onDelete}
          disabled={editData.loading || deleteData.loading}
        >
          삭제하기
        </Button>
      </FlexBox>
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

export default EditNoticePage;
