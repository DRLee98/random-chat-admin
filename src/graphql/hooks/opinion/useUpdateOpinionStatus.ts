import { graphql } from "@/graphql/__generated__";
import { useMutation } from "@apollo/client";

const UPDATE_OPINION_STATUS = graphql(`
  mutation updateOpinionStatus($input: UpdateOpinionStatusInput!) {
    updateOpinionStatus(input: $input) {
      ok
      error
    }
  }
`);

const useUpdateOpinionStatus = () => {
  return useMutation(UPDATE_OPINION_STATUS);
};

export default useUpdateOpinionStatus;
