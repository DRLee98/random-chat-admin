import { graphql } from "@/graphql/__generated__";
import { useMutation } from "@apollo/client";

const EDIT_NOTICE = graphql(`
  mutation editNotice($input: EditNoticeInput!) {
    editNotice(input: $input) {
      ok
      error
      notice {
        ...NoticeBase
      }
    }
  }
`);

const useEditNotice = () => {
  return useMutation(EDIT_NOTICE);
};

export default useEditNotice;
