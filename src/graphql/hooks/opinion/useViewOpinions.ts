import { useLazyQuery } from "@apollo/client";
import { graphql } from "@/graphql/__generated__";

import type {
  LazyQueryHookOptions,
  QueryResult,
  LazyQueryExecFunction,
} from "@apollo/client";
import type {
  Exact,
  ViewOpinionsInput,
  ViewOpinionsQuery,
  QueryViewOpinionsArgs,
} from "@/graphql/__generated__/graphql";

export const VIEW_OPINIONS = graphql(`
  query viewOpinions($input: ViewOpinionsInput!) {
    viewOpinions(input: $input) {
      ok
      error
      hasNext
      opinions {
        id
        title
        category
        status
        createdAt
        updatedAt
      }
    }
  }
`);

type Fn = LazyQueryExecFunction<
  ViewOpinionsQuery,
  Exact<{ input: ViewOpinionsInput }>
>;
type Result = Omit<
  QueryResult<ViewOpinionsQuery, QueryViewOpinionsArgs>,
  "fetchMore"
> & { fetchMore: () => Promise<void> };

const useViewOpinions = (
  options?: Omit<
    LazyQueryHookOptions<ViewOpinionsQuery, QueryViewOpinionsArgs>,
    "variables"
  >,
): [Fn, Result] => {
  const [viewOpinions, result] = useLazyQuery(VIEW_OPINIONS, {
    ...options,
  });

  const fetchMore = async () => {
    if (result.networkStatus !== 7) return;
    if (!result.data?.viewOpinions.hasNext) return;

    await result.fetchMore({
      variables: {
        input: {
          ...result.variables?.input,
          skip: result.data.viewOpinions.opinions?.length ?? 0,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!prev.viewOpinions.opinions) return prev;
        if (!fetchMoreResult.viewOpinions.opinions) return prev;
        return {
          viewOpinions: {
            ...fetchMoreResult.viewOpinions,
            opinions: [
              ...prev.viewOpinions.opinions,
              ...fetchMoreResult.viewOpinions.opinions,
            ],
          },
        };
      },
    });
  };

  return [viewOpinions, { ...result, fetchMore }];
};

export default useViewOpinions;
