import { QueryHookOptions, useQuery } from "@apollo/client";
import { getFragmentData, graphql } from "@/graphql/__generated__";

import { NOTICE_BASE } from "@/graphql/fragments/notice";

import type {
  NoticeListInput,
  NoticeListQuery,
  QueryNoticeListArgs,
} from "@/graphql/__generated__/graphql";

export const NOTICE_LIST = graphql(`
  query noticeList($input: NoticeListInput!) {
    noticeList(input: $input) {
      ok
      error
      hasNext
      noticeList {
        ...NoticeBase
      }
    }
  }
`);

const useNoticeList = (
  input?: NoticeListInput,
  options?: Omit<
    QueryHookOptions<NoticeListQuery, QueryNoticeListArgs>,
    "variables"
  >,
) => {
  const { data, ...result } = useQuery<NoticeListQuery, QueryNoticeListArgs>(
    NOTICE_LIST,
    {
      ...options,
      variables: { input: input ?? {} },
    },
  );

  const noticeList =
    getFragmentData(NOTICE_BASE, data?.noticeList.noticeList) ?? [];

  const fetchMore = async () => {
    if (result.networkStatus !== 7) return;
    if (!data?.noticeList.hasNext) return;

    await result.fetchMore({
      variables: {
        input: {
          ...input,
          skip: data.noticeList.noticeList?.length ?? 0,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!prev.noticeList.noticeList) return prev;
        if (!fetchMoreResult.noticeList.noticeList) return prev;
        return {
          noticeList: {
            ...fetchMoreResult.noticeList,
            noticeList: [
              ...prev.noticeList.noticeList,
              ...fetchMoreResult.noticeList.noticeList,
            ],
          },
        };
      },
    });
  };

  return {
    ...result,
    fetchMore,
    noticeList,
  };
};

export default useNoticeList;
