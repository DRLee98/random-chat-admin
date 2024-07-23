import { graphql } from "@/graphql/__generated__";
import { useMutation } from "@apollo/client";

const DELETE_NOTICE = graphql(`
  mutation deleteNotice($input: DeleteNoticeInput!) {
    deleteNotice(input: $input) {
      ok
      error
    }
  }
`);

const useDeleteNotice = () => {
  return useMutation(DELETE_NOTICE);
};

export default useDeleteNotice;
