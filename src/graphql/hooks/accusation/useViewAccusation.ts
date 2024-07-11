import { useQuery } from "@apollo/client";
import { graphql } from "@/graphql/__generated__";

import type { QueryHookOptions } from "@apollo/client";
import type {
  QueryViewAccusationArgs,
  ViewAccusationInput,
  ViewAccusationQuery,
} from "@/graphql/__generated__/graphql";

export const VIEW_ACCUSATION = graphql(`
  query viewAccusation($input: ViewAccusationInput!) {
    viewAccusation(input: $input) {
      ok
      error
      accusation {
        id
        content
        imageUrls
        status
        createdAt
        updatedAt
        info {
          user {
            id
            nickname
          }
        }
      }
    }
  }
`);

const useViewAccusation = (
  input: ViewAccusationInput,
  options?: Omit<
    QueryHookOptions<ViewAccusationQuery, QueryViewAccusationArgs>,
    "variables"
  >,
) => {
  const result = useQuery<ViewAccusationQuery, QueryViewAccusationArgs>(
    VIEW_ACCUSATION,
    {
      ...options,
      variables: { input },
    },
  );

  return result;
};

export default useViewAccusation;
