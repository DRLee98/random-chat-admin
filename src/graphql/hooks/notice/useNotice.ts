import { QueryHookOptions, useQuery } from "@apollo/client";
import { getFragmentData, graphql } from "@/graphql/__generated__";

import { NOTICE_BASE } from "@/graphql/fragments/notice";

import type {
  NoticeInput,
  NoticeQuery,
  QueryNoticeArgs,
} from "@/graphql/__generated__/graphql";

export const NOTICE = graphql(`
  query notice($input: NoticeInput!) {
    notice(input: $input) {
      ok
      error
      notice {
        id
        title
        content
        category
        pinned
        createdAt
        updatedAt
      }
    }
  }
`);

const useNotice = (
  input: NoticeInput,
  options?: Omit<QueryHookOptions<NoticeQuery, QueryNoticeArgs>, "variables">,
) => {
  const { data, ...result } = useQuery<NoticeQuery, QueryNoticeArgs>(NOTICE, {
    ...options,
    variables: { input },
  });

  return { notice: data?.notice.notice, ...result };
};

export default useNotice;
