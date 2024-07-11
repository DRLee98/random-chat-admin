import { graphql } from "@/graphql/__generated__";
import { useMutation } from "@apollo/client";

import type { MutationHookOptions } from "@apollo/client";
import type {
  UpdateAccusationStatusMutation,
  MutationUpdateAccusationStatusArgs,
} from "@/graphql/__generated__/graphql";

const UPDATE_ACCUSATION_STATUS = graphql(`
  mutation updateAccusationStatus($input: UpdateAccusationStatusInput!) {
    updateAccusationStatus(input: $input) {
      ok
      error
    }
  }
`);

const useUpdateAccusationStatus = (
  options?: MutationHookOptions<
    UpdateAccusationStatusMutation,
    MutationUpdateAccusationStatusArgs
  >,
) => {
  return useMutation(UPDATE_ACCUSATION_STATUS, options);
};

export default useUpdateAccusationStatus;
