/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment CommentBase on CommentObjectType {\n    id\n    text\n    createdAt\n    updatedAt\n    user {\n      id\n      nickname\n      profileUrl\n      profileBgColor\n      profileTextColor\n    }\n  }\n": types.CommentBaseFragmentDoc,
    "\n  fragment OpinionBase on OpinionObjectType {\n    id\n    title\n    content\n    imageUrls\n    category\n    status\n    createdAt\n    updatedAt\n  }\n": types.OpinionBaseFragmentDoc,
    "\n  fragment BlockUser on UserObjectType {\n    id\n    nickname\n    profileUrl\n    profileBgColor\n    profileTextColor\n    bio\n  }\n": types.BlockUserFragmentDoc,
    "\n  mutation updateAccusationStatus($input: UpdateAccusationStatusInput!) {\n    updateAccusationStatus(input: $input) {\n      ok\n      error\n    }\n  }\n": types.UpdateAccusationStatusDocument,
    "\n  query viewAccusation($input: ViewAccusationInput!) {\n    viewAccusation(input: $input) {\n      ok\n      error\n      accusation {\n        id\n        content\n        imageUrls\n        status\n        createdAt\n        updatedAt\n        info {\n          user {\n            id\n            nickname\n          }\n        }\n      }\n    }\n  }\n": types.ViewAccusationDocument,
    "\n  query viewAccusations($input: ViewAccusationsInput!) {\n    viewAccusations(input: $input) {\n      ok\n      error\n      hasNext\n      accusations {\n        id\n        content\n        status\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.ViewAccusationsDocument,
    "\n  query commentCount($input: CommentCountInput!) {\n    commentCount(input: $input) {\n      ok\n      error\n      count\n    }\n  }\n": types.CommentCountDocument,
    "\n  mutation createComment($input: CreateCommentInput!) {\n    createComment(input: $input) {\n      ok\n      error\n      comment {\n        ...CommentBase\n      }\n    }\n  }\n": types.CreateCommentDocument,
    "\n  mutation deleteComment($input: DeleteCommentInput!) {\n    deleteComment(input: $input) {\n      ok\n      error\n    }\n  }\n": types.DeleteCommentDocument,
    "\n  mutation editComment($input: EditCommentInput!) {\n    editComment(input: $input) {\n      ok\n      error\n      comment {\n        ...CommentBase\n      }\n    }\n  }\n": types.EditCommentDocument,
    "\n  query viewComments($input: ViewCommentsInput!) {\n    viewComments(input: $input) {\n      ok\n      error\n      hasNext\n      comments {\n        ...CommentBase\n      }\n    }\n  }\n": types.ViewCommentsDocument,
    "\n  query notice($input: NoticeInput!) {\n    notice(input: $input) {\n      ok\n      error\n      notice {\n        id\n        title\n        content\n        pinned\n        createdAt\n      }\n    }\n  }\n": types.NoticeDocument,
    "\n  query noticeList($input: NoticeListInput!) {\n    noticeList(input: $input) {\n      ok\n      error\n      hasNext\n      noticeList {\n        id\n        title\n        pinned\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.NoticeListDocument,
    "\n  mutation createOpinion($input: CreateOpinionInput!) {\n    createOpinion(input: $input) {\n      ok\n      error\n      opinion {\n        ...OpinionBase\n      }\n    }\n  }\n": types.CreateOpinionDocument,
    "\n  mutation deleteOpinion($input: DeleteOpinionInput!) {\n    deleteOpinion(input: $input) {\n      ok\n      error\n    }\n  }\n": types.DeleteOpinionDocument,
    "\n  mutation editOpinion($input: EditOpinionInput!) {\n    editOpinion(input: $input) {\n      ok\n      error\n      opinion {\n        ...OpinionBase\n      }\n    }\n  }\n": types.EditOpinionDocument,
    "\n  query myOpinions($input: MyOpinionsInput!) {\n    myOpinions(input: $input) {\n      ok\n      error\n      hasNext\n      opinions {\n        id\n        title\n        category\n        status\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.MyOpinionsDocument,
    "\n  query opinionDetail($input: OpinionDetailInput!) {\n    opinionDetail(input: $input) {\n      ok\n      error\n      opinion {\n        ...OpinionBase\n      }\n    }\n  }\n": types.OpinionDetailDocument,
    "\n  query login($input: LoginInput!) {\n    login(input: $input) {\n      ok\n      error\n      token\n    }\n  }\n": types.LoginDocument,
    "\n  query me {\n    me {\n      ok\n      error\n      me {\n        id\n        nickname\n        profileUrl\n        profileBgColor\n        profileTextColor\n        blockUserIds\n      }\n    }\n  }\n": types.MeDocument,
    "\n  query meDetail {\n    meDetail {\n      ok\n      error\n      me {\n        id\n        nickname\n        profileUrl\n        profileBgColor\n        profileTextColor\n        bio\n        socialPlatform\n        noti\n        allowMessage\n        language\n        autoTranslation\n        blockUsers {\n          ...BlockUser\n        }\n      }\n    }\n  }\n": types.MeDetailDocument,
    "\n  query userProfile($input: UserProfileInput!) {\n    userProfile(input: $input) {\n      ok\n      error\n      user {\n        id\n        nickname\n        profileUrl\n        profileBgColor\n        profileTextColor\n        bio\n      }\n    }\n  }\n": types.UserProfileDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CommentBase on CommentObjectType {\n    id\n    text\n    createdAt\n    updatedAt\n    user {\n      id\n      nickname\n      profileUrl\n      profileBgColor\n      profileTextColor\n    }\n  }\n"): (typeof documents)["\n  fragment CommentBase on CommentObjectType {\n    id\n    text\n    createdAt\n    updatedAt\n    user {\n      id\n      nickname\n      profileUrl\n      profileBgColor\n      profileTextColor\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment OpinionBase on OpinionObjectType {\n    id\n    title\n    content\n    imageUrls\n    category\n    status\n    createdAt\n    updatedAt\n  }\n"): (typeof documents)["\n  fragment OpinionBase on OpinionObjectType {\n    id\n    title\n    content\n    imageUrls\n    category\n    status\n    createdAt\n    updatedAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BlockUser on UserObjectType {\n    id\n    nickname\n    profileUrl\n    profileBgColor\n    profileTextColor\n    bio\n  }\n"): (typeof documents)["\n  fragment BlockUser on UserObjectType {\n    id\n    nickname\n    profileUrl\n    profileBgColor\n    profileTextColor\n    bio\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateAccusationStatus($input: UpdateAccusationStatusInput!) {\n    updateAccusationStatus(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation updateAccusationStatus($input: UpdateAccusationStatusInput!) {\n    updateAccusationStatus(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query viewAccusation($input: ViewAccusationInput!) {\n    viewAccusation(input: $input) {\n      ok\n      error\n      accusation {\n        id\n        content\n        imageUrls\n        status\n        createdAt\n        updatedAt\n        info {\n          user {\n            id\n            nickname\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query viewAccusation($input: ViewAccusationInput!) {\n    viewAccusation(input: $input) {\n      ok\n      error\n      accusation {\n        id\n        content\n        imageUrls\n        status\n        createdAt\n        updatedAt\n        info {\n          user {\n            id\n            nickname\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query viewAccusations($input: ViewAccusationsInput!) {\n    viewAccusations(input: $input) {\n      ok\n      error\n      hasNext\n      accusations {\n        id\n        content\n        status\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query viewAccusations($input: ViewAccusationsInput!) {\n    viewAccusations(input: $input) {\n      ok\n      error\n      hasNext\n      accusations {\n        id\n        content\n        status\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query commentCount($input: CommentCountInput!) {\n    commentCount(input: $input) {\n      ok\n      error\n      count\n    }\n  }\n"): (typeof documents)["\n  query commentCount($input: CommentCountInput!) {\n    commentCount(input: $input) {\n      ok\n      error\n      count\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createComment($input: CreateCommentInput!) {\n    createComment(input: $input) {\n      ok\n      error\n      comment {\n        ...CommentBase\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createComment($input: CreateCommentInput!) {\n    createComment(input: $input) {\n      ok\n      error\n      comment {\n        ...CommentBase\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteComment($input: DeleteCommentInput!) {\n    deleteComment(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation deleteComment($input: DeleteCommentInput!) {\n    deleteComment(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation editComment($input: EditCommentInput!) {\n    editComment(input: $input) {\n      ok\n      error\n      comment {\n        ...CommentBase\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation editComment($input: EditCommentInput!) {\n    editComment(input: $input) {\n      ok\n      error\n      comment {\n        ...CommentBase\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query viewComments($input: ViewCommentsInput!) {\n    viewComments(input: $input) {\n      ok\n      error\n      hasNext\n      comments {\n        ...CommentBase\n      }\n    }\n  }\n"): (typeof documents)["\n  query viewComments($input: ViewCommentsInput!) {\n    viewComments(input: $input) {\n      ok\n      error\n      hasNext\n      comments {\n        ...CommentBase\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query notice($input: NoticeInput!) {\n    notice(input: $input) {\n      ok\n      error\n      notice {\n        id\n        title\n        content\n        pinned\n        createdAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query notice($input: NoticeInput!) {\n    notice(input: $input) {\n      ok\n      error\n      notice {\n        id\n        title\n        content\n        pinned\n        createdAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query noticeList($input: NoticeListInput!) {\n    noticeList(input: $input) {\n      ok\n      error\n      hasNext\n      noticeList {\n        id\n        title\n        pinned\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query noticeList($input: NoticeListInput!) {\n    noticeList(input: $input) {\n      ok\n      error\n      hasNext\n      noticeList {\n        id\n        title\n        pinned\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createOpinion($input: CreateOpinionInput!) {\n    createOpinion(input: $input) {\n      ok\n      error\n      opinion {\n        ...OpinionBase\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createOpinion($input: CreateOpinionInput!) {\n    createOpinion(input: $input) {\n      ok\n      error\n      opinion {\n        ...OpinionBase\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteOpinion($input: DeleteOpinionInput!) {\n    deleteOpinion(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation deleteOpinion($input: DeleteOpinionInput!) {\n    deleteOpinion(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation editOpinion($input: EditOpinionInput!) {\n    editOpinion(input: $input) {\n      ok\n      error\n      opinion {\n        ...OpinionBase\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation editOpinion($input: EditOpinionInput!) {\n    editOpinion(input: $input) {\n      ok\n      error\n      opinion {\n        ...OpinionBase\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query myOpinions($input: MyOpinionsInput!) {\n    myOpinions(input: $input) {\n      ok\n      error\n      hasNext\n      opinions {\n        id\n        title\n        category\n        status\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query myOpinions($input: MyOpinionsInput!) {\n    myOpinions(input: $input) {\n      ok\n      error\n      hasNext\n      opinions {\n        id\n        title\n        category\n        status\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query opinionDetail($input: OpinionDetailInput!) {\n    opinionDetail(input: $input) {\n      ok\n      error\n      opinion {\n        ...OpinionBase\n      }\n    }\n  }\n"): (typeof documents)["\n  query opinionDetail($input: OpinionDetailInput!) {\n    opinionDetail(input: $input) {\n      ok\n      error\n      opinion {\n        ...OpinionBase\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query login($input: LoginInput!) {\n    login(input: $input) {\n      ok\n      error\n      token\n    }\n  }\n"): (typeof documents)["\n  query login($input: LoginInput!) {\n    login(input: $input) {\n      ok\n      error\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query me {\n    me {\n      ok\n      error\n      me {\n        id\n        nickname\n        profileUrl\n        profileBgColor\n        profileTextColor\n        blockUserIds\n      }\n    }\n  }\n"): (typeof documents)["\n  query me {\n    me {\n      ok\n      error\n      me {\n        id\n        nickname\n        profileUrl\n        profileBgColor\n        profileTextColor\n        blockUserIds\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query meDetail {\n    meDetail {\n      ok\n      error\n      me {\n        id\n        nickname\n        profileUrl\n        profileBgColor\n        profileTextColor\n        bio\n        socialPlatform\n        noti\n        allowMessage\n        language\n        autoTranslation\n        blockUsers {\n          ...BlockUser\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query meDetail {\n    meDetail {\n      ok\n      error\n      me {\n        id\n        nickname\n        profileUrl\n        profileBgColor\n        profileTextColor\n        bio\n        socialPlatform\n        noti\n        allowMessage\n        language\n        autoTranslation\n        blockUsers {\n          ...BlockUser\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query userProfile($input: UserProfileInput!) {\n    userProfile(input: $input) {\n      ok\n      error\n      user {\n        id\n        nickname\n        profileUrl\n        profileBgColor\n        profileTextColor\n        bio\n      }\n    }\n  }\n"): (typeof documents)["\n  query userProfile($input: UserProfileInput!) {\n    userProfile(input: $input) {\n      ok\n      error\n      user {\n        id\n        nickname\n        profileUrl\n        profileBgColor\n        profileTextColor\n        bio\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;