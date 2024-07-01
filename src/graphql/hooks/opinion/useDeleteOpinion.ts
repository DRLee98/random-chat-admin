import { useMutation } from "@apollo/client";
import { graphql } from "@/graphql/__generated__";

import type { MutationHookOptions } from "@apollo/client";
import type {
  DeleteOpinionMutation,
  MutationDeleteOpinionArgs,
} from "@/graphql/__generated__/graphql";

const DELETE_OPINION = graphql(`
  mutation deleteOpinion($input: DeleteOpinionInput!) {
    deleteOpinion(input: $input) {
      ok
      error
    }
  }
`);

const useDeleteOpinion = (
  options?: MutationHookOptions<
    DeleteOpinionMutation,
    MutationDeleteOpinionArgs
  >,
) => {
  return useMutation<DeleteOpinionMutation, MutationDeleteOpinionArgs>(
    DELETE_OPINION,
    options,
  );
};

export default useDeleteOpinion;
