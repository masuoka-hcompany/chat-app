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
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "subscription MessageAdded {\n  messageAdded {\n    ...MessageItemFragment\n  }\n}": typeof types.MessageAddedDocument,
    "fragment MessageItemFragment on Message {\n  id\n  contents\n  sender {\n    profile {\n      name\n      profileImageUrl\n    }\n  }\n}": typeof types.MessageItemFragmentFragmentDoc,
    "query MessagesByRoom {\n  messagesConnectionByRoom(\n    roomId: \"6508a8a7-2b77-49ee-947e-f01260a1e295\"\n    last: 10\n  ) {\n    totalCount\n    edges {\n      cursor\n      node {\n        ...MessageItemFragment\n        createdAt\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}": typeof types.MessagesByRoomDocument,
};
const documents: Documents = {
    "subscription MessageAdded {\n  messageAdded {\n    ...MessageItemFragment\n  }\n}": types.MessageAddedDocument,
    "fragment MessageItemFragment on Message {\n  id\n  contents\n  sender {\n    profile {\n      name\n      profileImageUrl\n    }\n  }\n}": types.MessageItemFragmentFragmentDoc,
    "query MessagesByRoom {\n  messagesConnectionByRoom(\n    roomId: \"6508a8a7-2b77-49ee-947e-f01260a1e295\"\n    last: 10\n  ) {\n    totalCount\n    edges {\n      cursor\n      node {\n        ...MessageItemFragment\n        createdAt\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}": types.MessagesByRoomDocument,
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
export function graphql(source: "subscription MessageAdded {\n  messageAdded {\n    ...MessageItemFragment\n  }\n}"): (typeof documents)["subscription MessageAdded {\n  messageAdded {\n    ...MessageItemFragment\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment MessageItemFragment on Message {\n  id\n  contents\n  sender {\n    profile {\n      name\n      profileImageUrl\n    }\n  }\n}"): (typeof documents)["fragment MessageItemFragment on Message {\n  id\n  contents\n  sender {\n    profile {\n      name\n      profileImageUrl\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query MessagesByRoom {\n  messagesConnectionByRoom(\n    roomId: \"6508a8a7-2b77-49ee-947e-f01260a1e295\"\n    last: 10\n  ) {\n    totalCount\n    edges {\n      cursor\n      node {\n        ...MessageItemFragment\n        createdAt\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}"): (typeof documents)["query MessagesByRoom {\n  messagesConnectionByRoom(\n    roomId: \"6508a8a7-2b77-49ee-947e-f01260a1e295\"\n    last: 10\n  ) {\n    totalCount\n    edges {\n      cursor\n      node {\n        ...MessageItemFragment\n        createdAt\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;