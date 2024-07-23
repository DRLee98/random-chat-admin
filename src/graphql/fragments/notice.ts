import { graphql } from "../__generated__";

export const NOTICE_BASE = graphql(`
  fragment NoticeBase on NoticeObjectType {
    id
    title
    category
    pinned
    createdAt
    updatedAt
  }
`);
