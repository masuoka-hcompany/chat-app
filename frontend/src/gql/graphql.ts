/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type CreateMessageInput = {
  /** メッセージ内容 */
  contents: Scalars['String']['input'];
  /** チャットルーム ID */
  roomId: Scalars['ID']['input'];
  /** 投稿ユーザー ID */
  senderId: Scalars['ID']['input'];
};

export type Message = {
  __typename?: 'Message';
  /** メッセージ内容 */
  contents: Scalars['String']['output'];
  /** 作成日時 */
  createdAt: Scalars['DateTime']['output'];
  /** メッセージ ID */
  id: Scalars['ID']['output'];
  /** 投稿ユーザー */
  sender: User;
  /** 更新日時 */
  updatedAt: Scalars['DateTime']['output'];
};

export type MessageConnection = {
  __typename?: 'MessageConnection';
  /** メッセージのエッジのリスト */
  edges: Array<MessageEdge>;
  /** ページ情報 */
  pageInfo: PageInfo;
  /** 全体のアイテム数 */
  totalCount: Scalars['Int']['output'];
};

export type MessageEdge = {
  __typename?: 'MessageEdge';
  /** このエッジを一意に識別するカーソル */
  cursor: Scalars['String']['output'];
  /** メッセージ */
  node: Message;
};

export type Mutation = {
  __typename?: 'Mutation';
  createMessage: Message;
};


export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  /** 現在のページで最後の要素のカーソル */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** 次のページが存在するか */
  hasNextPage: Scalars['Boolean']['output'];
  /** 前のページが存在するか */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** 現在のページで最初の要素のカーソル */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Profile = {
  __typename?: 'Profile';
  /** 作成日時 */
  createdAt: Scalars['DateTime']['output'];
  /** ユーザー名 */
  name: Scalars['String']['output'];
  /** プロフィール画像 */
  profileImageUrl?: Maybe<Scalars['String']['output']>;
  /** 更新日時 */
  updatedAt: Scalars['DateTime']['output'];
  /** ユーザー ID */
  userId: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  messagesConnectionByRoom: MessageConnection;
  room?: Maybe<Room>;
};


export type QueryMessagesConnectionByRoomArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  roomId: Scalars['ID']['input'];
};


export type QueryRoomArgs = {
  id: Scalars['ID']['input'];
};

export type Room = {
  __typename?: 'Room';
  /** 作成ユーザーID */
  createUserId: Scalars['String']['output'];
  /** 作成日時 */
  createdAt: Scalars['DateTime']['output'];
  /** 作成ユーザー */
  creator: User;
  /** 説明 */
  description?: Maybe<Scalars['String']['output']>;
  /** チャットルーム ID */
  id: Scalars['ID']['output'];
  /** チャットルーム名 */
  name: Scalars['String']['output'];
  /** 更新ユーザーID */
  updateUserId: Scalars['String']['output'];
  /** 更新日時 */
  updatedAt: Scalars['DateTime']['output'];
  /** 更新ユーザー */
  updater: User;
};

export type Subscription = {
  __typename?: 'Subscription';
  messageAdded: Message;
};

export type User = {
  __typename?: 'User';
  /** 作成日時 */
  createdAt: Scalars['DateTime']['output'];
  /** メールアドレス */
  email: Scalars['String']['output'];
  /** ユーザー ID */
  id: Scalars['ID']['output'];
  /** プロフィール */
  profile?: Maybe<Profile>;
  /** 更新日時 */
  updatedAt: Scalars['DateTime']['output'];
  /** ユーザーステータス */
  userStatus: UserStatus;
};

export type UserStatus = {
  __typename?: 'UserStatus';
  /** 作成日時 */
  createdAt: Scalars['DateTime']['output'];
  /** ユーザーステータス ID */
  id: Scalars['ID']['output'];
  /** ユーザーステータス名 */
  name: Scalars['String']['output'];
  /** 並び順 */
  sortNo: Scalars['Int']['output'];
  /** 更新日時 */
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateMessageMutationVariables = Exact<{
  input: CreateMessageInput;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'Message', id: string, contents: string, createdAt: any, updatedAt: any, sender: { __typename?: 'User', profile?: { __typename?: 'Profile', name: string } | null } } };

export type MessageAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MessageAddedSubscription = { __typename?: 'Subscription', messageAdded: (
    { __typename?: 'Message' }
    & { ' $fragmentRefs'?: { 'MessageItemFragmentFragment': MessageItemFragmentFragment } }
  ) };

export type MessageConnectionPageInfoFragmentFragment = { __typename?: 'MessageConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } & { ' $fragmentName'?: 'MessageConnectionPageInfoFragmentFragment' };

export type MessageItemFragmentFragment = { __typename?: 'Message', id: string, contents: string, sender: { __typename?: 'User', profile?: { __typename?: 'Profile', name: string, profileImageUrl?: string | null } | null } } & { ' $fragmentName'?: 'MessageItemFragmentFragment' };

export type MessagesByRoomQueryVariables = Exact<{
  roomId: Scalars['ID']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
}>;


export type MessagesByRoomQuery = { __typename?: 'Query', messagesConnectionByRoom: (
    { __typename?: 'MessageConnection', totalCount: number, edges: Array<{ __typename?: 'MessageEdge', cursor: string, node: (
        { __typename?: 'Message', createdAt: any }
        & { ' $fragmentRefs'?: { 'MessageItemFragmentFragment': MessageItemFragmentFragment } }
      ) }> }
    & { ' $fragmentRefs'?: { 'MessageConnectionPageInfoFragmentFragment': MessageConnectionPageInfoFragmentFragment } }
  ) };

export const MessageConnectionPageInfoFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageConnectionPageInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MessageConnection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]}}]} as unknown as DocumentNode<MessageConnectionPageInfoFragmentFragment, unknown>;
export const MessageItemFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}}]}}]}}]}}]} as unknown as DocumentNode<MessageItemFragmentFragment, unknown>;
export const CreateMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateMessageMutation, CreateMessageMutationVariables>;
export const MessageAddedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"MessageAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageItemFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}}]}}]}}]}}]} as unknown as DocumentNode<MessageAddedSubscription, MessageAddedSubscriptionVariables>;
export const MessagesByRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MessagesByRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"last"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"before"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messagesConnectionByRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"last"},"value":{"kind":"Variable","name":{"kind":"Name","value":"last"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"before"},"value":{"kind":"Variable","name":{"kind":"Name","value":"before"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageItemFragment"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageConnectionPageInfoFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageConnectionPageInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MessageConnection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]}}]} as unknown as DocumentNode<MessagesByRoomQuery, MessagesByRoomQueryVariables>;