import useNoticeList from "@/graphql/hooks/notice/useNoticeList";

import InfiniteScroll from "../common/InfiniteScroll";
import NoticeItem from "./NoticeItem";

const NoticeList = () => {
  const { noticeList, fetchMore } = useNoticeList();

  return (
    <InfiniteScroll fetchMore={fetchMore}>
      {noticeList.map((item) => (
        <NoticeItem key={item.id} notice={item} />
      ))}
    </InfiniteScroll>
  );
};

export default NoticeList;
