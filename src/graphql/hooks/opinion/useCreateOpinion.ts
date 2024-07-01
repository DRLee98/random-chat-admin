import { useMutation } from "@apollo/client";
import { graphql } from "@/graphql/__generated__";

import type { MutationHookOptions } from "@apollo/client";
import type {
  CreateOpinionMutation,
  MutationCreateOpinionArgs,
} from "@/graphql/__generated__/graphql";

const CREATE_OPINION = graphql(`
  mutation createOpinion($input: CreateOpinionInput!) {
    createOpinion(input: $input) {
      ok
      error
      opinion {
        ...OpinionBase
      }
    }
  }
`);

const useCreateOpinion = (
  options?: MutationHookOptions<
    CreateOpinionMutation,
    MutationCreateOpinionArgs
  >,
) => {
  return useMutation<CreateOpinionMutation, MutationCreateOpinionArgs>(
    CREATE_OPINION,
    options,
  );
};

export default useCreateOpinion;
