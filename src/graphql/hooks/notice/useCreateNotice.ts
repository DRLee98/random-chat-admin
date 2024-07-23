import { graphql } from "@/graphql/__generated__";
import { useMutation } from "@apollo/client";

const CREATE_NOTICE = graphql(`
  mutation createNotice($input: CreateNoticeInput!) {
    createNotice(input: $input) {
      ok
      error
      notice {
        ...NoticeBase
      }
    }
  }
`);

const useCreateNotice = () => {
  return useMutation(CREATE_NOTICE);
};

export default useCreateNotice;
