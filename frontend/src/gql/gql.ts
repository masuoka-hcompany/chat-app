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
    "query AvailableUsersForRoom($roomId: ID!, $first: Int, $after: String) {\n  availableUsersForRoom(roomId: $roomId, first: $first, after: $after) {\n    edges {\n      cursor\n      node {\n        ...UserProfileFragment\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    totalCount\n  }\n}": typeof types.AvailableUsersForRoomDocument,
    "mutation CreateMessage($input: CreateMessageInput!) {\n  createMessage(input: $input) {\n    id\n    sender {\n      profile {\n        name\n      }\n    }\n    contents\n    createdAt\n    updatedAt\n  }\n}": typeof types.CreateMessageDocument,
    "mutation CreateRoom($input: CreateRoomInput!) {\n  createRoom(input: $input) {\n    id\n    name\n    description\n    createdAt\n    updatedAt\n    createUserId\n    updateUserId\n  }\n}": typeof types.CreateRoomDocument,
    "mutation InviteUserToRoom($input: InviteUserToRoomInput!) {\n  inviteUserToRoom(input: $input) {\n    id\n    name\n    description\n    createdAt\n    updatedAt\n  }\n}": typeof types.InviteUserToRoomDocument,
    "query IsJoinedRoom($roomId: ID!) {\n  isJoinedRoom(roomId: $roomId)\n}": typeof types.IsJoinedRoomDocument,
    "mutation JoinRoom($input: JoinRoomInput!) {\n  joinRoom(input: $input) {\n    id\n    name\n  }\n}": typeof types.JoinRoomDocument,
    "subscription MessageAdded {\n  messageAdded {\n    ...MessageItemFragment\n  }\n}": typeof types.MessageAddedDocument,
    "fragment MessageItemFragment on Message {\n  id\n  contents\n  sender {\n    id\n    profile {\n      name\n      profileImageUrl\n    }\n  }\n}": typeof types.MessageItemFragmentFragmentDoc,
    "query MessagesByRoom($roomId: ID!, $first: Int, $last: Int, $after: String, $before: String) {\n  messagesConnectionByRoom(\n    roomId: $roomId\n    first: $first\n    last: $last\n    after: $after\n    before: $before\n  ) {\n    totalCount\n    edges {\n      cursor\n      node {\n        ...MessageItemFragment\n        createdAt\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}": typeof types.MessagesByRoomDocument,
    "query Room($roomId: ID!) {\n  room(id: $roomId) {\n    name\n  }\n}": typeof types.RoomDocument,
    "query RoomsConnection($first: Int, $after: String, $filter: RoomFilterInput) {\n  roomsConnection(first: $first, after: $after, filter: $filter) {\n    edges {\n      cursor\n      node {\n        id\n        name\n        description\n        createdAt\n        updatedAt\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}": typeof types.RoomsConnectionDocument,
    "fragment UserProfileFragment on User {\n  id\n  profile {\n    name\n    profileImageUrl\n  }\n}": typeof types.UserProfileFragmentFragmentDoc,
};
const documents: Documents = {
    "query AvailableUsersForRoom($roomId: ID!, $first: Int, $after: String) {\n  availableUsersForRoom(roomId: $roomId, first: $first, after: $after) {\n    edges {\n      cursor\n      node {\n        ...UserProfileFragment\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    totalCount\n  }\n}": types.AvailableUsersForRoomDocument,
    "mutation CreateMessage($input: CreateMessageInput!) {\n  createMessage(input: $input) {\n    id\n    sender {\n      profile {\n        name\n      }\n    }\n    contents\n    createdAt\n    updatedAt\n  }\n}": types.CreateMessageDocument,
    "mutation CreateRoom($input: CreateRoomInput!) {\n  createRoom(input: $input) {\n    id\n    name\n    description\n    createdAt\n    updatedAt\n    createUserId\n    updateUserId\n  }\n}": types.CreateRoomDocument,
    "mutation InviteUserToRoom($input: InviteUserToRoomInput!) {\n  inviteUserToRoom(input: $input) {\n    id\n    name\n    description\n    createdAt\n    updatedAt\n  }\n}": types.InviteUserToRoomDocument,
    "query IsJoinedRoom($roomId: ID!) {\n  isJoinedRoom(roomId: $roomId)\n}": types.IsJoinedRoomDocument,
    "mutation JoinRoom($input: JoinRoomInput!) {\n  joinRoom(input: $input) {\n    id\n    name\n  }\n}": types.JoinRoomDocument,
    "subscription MessageAdded {\n  messageAdded {\n    ...MessageItemFragment\n  }\n}": types.MessageAddedDocument,
    "fragment MessageItemFragment on Message {\n  id\n  contents\n  sender {\n    id\n    profile {\n      name\n      profileImageUrl\n    }\n  }\n}": types.MessageItemFragmentFragmentDoc,
    "query MessagesByRoom($roomId: ID!, $first: Int, $last: Int, $after: String, $before: String) {\n  messagesConnectionByRoom(\n    roomId: $roomId\n    first: $first\n    last: $last\n    after: $after\n    before: $before\n  ) {\n    totalCount\n    edges {\n      cursor\n      node {\n        ...MessageItemFragment\n        createdAt\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}": types.MessagesByRoomDocument,
    "query Room($roomId: ID!) {\n  room(id: $roomId) {\n    name\n  }\n}": types.RoomDocument,
    "query RoomsConnection($first: Int, $after: String, $filter: RoomFilterInput) {\n  roomsConnection(first: $first, after: $after, filter: $filter) {\n    edges {\n      cursor\n      node {\n        id\n        name\n        description\n        createdAt\n        updatedAt\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}": types.RoomsConnectionDocument,
    "fragment UserProfileFragment on User {\n  id\n  profile {\n    name\n    profileImageUrl\n  }\n}": types.UserProfileFragmentFragmentDoc,
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
export function graphql(source: "query AvailableUsersForRoom($roomId: ID!, $first: Int, $after: String) {\n  availableUsersForRoom(roomId: $roomId, first: $first, after: $after) {\n    edges {\n      cursor\n      node {\n        ...UserProfileFragment\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    totalCount\n  }\n}"): (typeof documents)["query AvailableUsersForRoom($roomId: ID!, $first: Int, $after: String) {\n  availableUsersForRoom(roomId: $roomId, first: $first, after: $after) {\n    edges {\n      cursor\n      node {\n        ...UserProfileFragment\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    totalCount\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateMessage($input: CreateMessageInput!) {\n  createMessage(input: $input) {\n    id\n    sender {\n      profile {\n        name\n      }\n    }\n    contents\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["mutation CreateMessage($input: CreateMessageInput!) {\n  createMessage(input: $input) {\n    id\n    sender {\n      profile {\n        name\n      }\n    }\n    contents\n    createdAt\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateRoom($input: CreateRoomInput!) {\n  createRoom(input: $input) {\n    id\n    name\n    description\n    createdAt\n    updatedAt\n    createUserId\n    updateUserId\n  }\n}"): (typeof documents)["mutation CreateRoom($input: CreateRoomInput!) {\n  createRoom(input: $input) {\n    id\n    name\n    description\n    createdAt\n    updatedAt\n    createUserId\n    updateUserId\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation InviteUserToRoom($input: InviteUserToRoomInput!) {\n  inviteUserToRoom(input: $input) {\n    id\n    name\n    description\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["mutation InviteUserToRoom($input: InviteUserToRoomInput!) {\n  inviteUserToRoom(input: $input) {\n    id\n    name\n    description\n    createdAt\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query IsJoinedRoom($roomId: ID!) {\n  isJoinedRoom(roomId: $roomId)\n}"): (typeof documents)["query IsJoinedRoom($roomId: ID!) {\n  isJoinedRoom(roomId: $roomId)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation JoinRoom($input: JoinRoomInput!) {\n  joinRoom(input: $input) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation JoinRoom($input: JoinRoomInput!) {\n  joinRoom(input: $input) {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription MessageAdded {\n  messageAdded {\n    ...MessageItemFragment\n  }\n}"): (typeof documents)["subscription MessageAdded {\n  messageAdded {\n    ...MessageItemFragment\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment MessageItemFragment on Message {\n  id\n  contents\n  sender {\n    id\n    profile {\n      name\n      profileImageUrl\n    }\n  }\n}"): (typeof documents)["fragment MessageItemFragment on Message {\n  id\n  contents\n  sender {\n    id\n    profile {\n      name\n      profileImageUrl\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query MessagesByRoom($roomId: ID!, $first: Int, $last: Int, $after: String, $before: String) {\n  messagesConnectionByRoom(\n    roomId: $roomId\n    first: $first\n    last: $last\n    after: $after\n    before: $before\n  ) {\n    totalCount\n    edges {\n      cursor\n      node {\n        ...MessageItemFragment\n        createdAt\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}"): (typeof documents)["query MessagesByRoom($roomId: ID!, $first: Int, $last: Int, $after: String, $before: String) {\n  messagesConnectionByRoom(\n    roomId: $roomId\n    first: $first\n    last: $last\n    after: $after\n    before: $before\n  ) {\n    totalCount\n    edges {\n      cursor\n      node {\n        ...MessageItemFragment\n        createdAt\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Room($roomId: ID!) {\n  room(id: $roomId) {\n    name\n  }\n}"): (typeof documents)["query Room($roomId: ID!) {\n  room(id: $roomId) {\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query RoomsConnection($first: Int, $after: String, $filter: RoomFilterInput) {\n  roomsConnection(first: $first, after: $after, filter: $filter) {\n    edges {\n      cursor\n      node {\n        id\n        name\n        description\n        createdAt\n        updatedAt\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}"): (typeof documents)["query RoomsConnection($first: Int, $after: String, $filter: RoomFilterInput) {\n  roomsConnection(first: $first, after: $after, filter: $filter) {\n    edges {\n      cursor\n      node {\n        id\n        name\n        description\n        createdAt\n        updatedAt\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment UserProfileFragment on User {\n  id\n  profile {\n    name\n    profileImageUrl\n  }\n}"): (typeof documents)["fragment UserProfileFragment on User {\n  id\n  profile {\n    name\n    profileImageUrl\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;