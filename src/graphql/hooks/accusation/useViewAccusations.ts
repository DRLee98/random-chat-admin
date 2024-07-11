import { useLazyQuery } from "@apollo/client";
import { graphql } from "@/graphql/__generated__";

import type {
  LazyQueryHookOptions,
  QueryResult,
  LazyQueryExecFunction,
} from "@apollo/client";
import type {
  Exact,
  QueryViewAccusationsArgs,
  ViewAccusationsInput,
  ViewAccusationsQuery,
} from "@/graphql/__generated__/graphql";

export const VIEW_ACCUSATIONS = graphql(`
  query viewAccusations($input: ViewAccusationsInput!) {
    viewAccusations(input: $input) {
      ok
      error
      hasNext
      accusations {
        id
        content
        status
        createdAt
        updatedAt
      }
    }
  }
`);

type Fn = LazyQueryExecFunction<
  ViewAccusationsQuery,
  Exact<{ input: ViewAccusationsInput }>
>;
type Result = Omit<
  QueryResult<ViewAccusationsQuery, QueryViewAccusationsArgs>,
  "fetchMore"
> & { fetchMore: () => Promise<void> };

const useViewAccusations = (
  options?: Omit<
    LazyQueryHookOptions<ViewAccusationsQuery, QueryViewAccusationsArgs>,
    "variables"
  >,
): [Fn, Result] => {
  const [viewAccusations, result] = useLazyQuery(VIEW_ACCUSATIONS, {
    ...options,
  });

  const fetchMore = async () => {
    if (result.networkStatus !== 7) return;
    if (!result.data?.viewAccusations.hasNext) return;

    await result.fetchMore({
      variables: {
        input: {
          ...result.variables?.input,
          skip: result.data.viewAccusations.accusations?.length ?? 0,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!prev.viewAccusations.accusations) return prev;
        if (!fetchMoreResult.viewAccusations.accusations) return prev;
        return {
          viewAccusations: {
            ...fetchMoreResult.viewAccusations,
            accusations: [
              ...prev.viewAccusations.accusations,
              ...fetchMoreResult.viewAccusations.accusations,
            ],
          },
        };
      },
    });
  };

  return [viewAccusations, { ...result, fetchMore }];
};

export default useViewAccusations;
