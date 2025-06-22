# GraphQL スキーマ設計書

## Query 一覧

| Query 名        | 説明                           |
| --------------- | ------------------------------ |
| room            | チャットルームを単体取得       |
| roomsConnection | チャットルーム一覧用取得       |
| messagesByRoom  | チャットルームのメッセージ取得 |

```graphql
type Query {
  room(id: ID!): Room!
  roomsConnection(
    first: Int
    after: String
    last: Int
    before: String
  ): RoomConnection!
  messagesByRoom(
    roomId: ID!
    first: Int
    after: String
    last: Int
    before: String
  ): MessageConnection!
}
```

### 補足：Connection 取得用の引数

```
first: 取得したい件数を指定します（例: 10件）。
after: 指定されたカーソルの「後」の要素から取得します。前回の取得で返された endCursor をここに渡します。
last: 逆順で取得したい件数を指定します。before 引数と組み合わせて使用します。
before: 指定されたカーソルの「前」の要素から取得します。
```

---

## Mutation 一覧

| Mutation 名   | 説明           |
| ------------- | -------------- |
| createMessage | メッセージ作成 |
| deleteMessage | メッセージ削除 |

```graphql
type Mutation {
  createMessage(input: CreateMessageInput!): Message!
  deleteMessage(id: ID!): Boolean!
}
```

---

## 型定義

| 種類  | 名称               | 内容                   |
| ----- | ------------------ | ---------------------- |
| type  | User               | ユーザー               |
| type  | UserStatus         | ユーザーステータス     |
| type  | Profile            | ユーザープロフィール   |
| type  | Room               | チャットルーム         |
| type  | Message            | メッセージ             |
| type  | MessageConnection  | メッセージコネクション |
| type  | MessageEdge        | メッセージエッジ       |
| type  | PageInfo           | ページ情報             |
| input | CreateMessageInput | メッセージ作成         |

```graphql
type User {
  id: ID! # ユーザーID
  email: String! # メールアドレス
  userStatus: UserStatus! # ユーザーステータス
  profile: Profile # プロフィール
  createdAt: DateTime! # 登録日時
  updatedAt: DateTime! # 更新日時
}
```

```graphql
type UserStatus {
  id: ID! # ユーザーステータス ID
  name: String! # ユーザーステータス名
  sortNo: Int! # 並び順
  createdAt: DateTime! # 登録日時
  updatedAt: DateTime! # 更新日時
}
```

```graphql
type Profile {
  name: String! # ユーザー名
  profileImageUrl: String # プロフィール画像
  createdAt: DateTime! # 登録日時
  updatedAt: DateTime! # 更新日時
}
```

```graphql
type Room {
  id: ID! # チャットルーム ID
  name: String! # チャットルーム名
  description: String # 説明
  createUser: User! # 作成ユーザー
  updateUser: User! # 更新ユーザー
  createdAt: DateTime! # 登録日時
  updatedAt: DateTime! # 更新日時
}
```

```graphql
type RoomConnection {
  pageInfo: PageInfo! # ページ情報
  edges: [RoomEdge!]! # チャットルームのエッジのリスト
  totalCount: Int! # 全体のアイテム数
}
```

```graphql
type RoomEdge {
  cursor: String! # このエッジを一意に識別するカーソル
  node: Room! # チャットルーム
}
```

```graphql
type Message {
  id: ID! # メッセージ ID
  sender: User! # 投稿ユーザー
  contents: String! # メッセージ
  createdAt: DateTime! # 登録日時
  updatedAt: DateTime! # 更新日時
}
```

```graphql
type MessageConnection {
  pageInfo: PageInfo! # ページ情報
  edges: [MessageEdge!]! # メッセージのエッジのリスト
  totalCount: Int! # 全体のアイテム数
}
```

```graphql
type MessageEdge {
  cursor: String! # このエッジを一意に識別するカーソル
  node: Message! # メッセージ
}
```

```graphql
type PageInfo {
  hasNextPage: Boolean! # 次のページが存在するか
  hasPreviousPage: Boolean! # 前のページが存在するか
  startCursor: String # 現在のページで最初の要素のカーソル
  endCursor: String # 現在のページで最後の要素のカーソル
}
```

```graphql
input CreateMessageInput {
  roomId: ID!
  senderId: ID!
  contents: String!
}
```

### 補足:Node Edge Connection など GraphQL に関連する用語の説明

```
Node: 取得したいデータの実体（例: User, Message）。
Edge: Nodeと、そのNodeのリスト内での位置を示すカーソルを組み合わせたもの。
Connection: Edgeのリストと、ページネーション情報 (PageInfo)、全体の件数 (totalCount) をまとめたもの。
PageInfo: 次のページ有無やカーソル範囲など、ページ送りに関するメタ情報を提供する。
```

---

## 備考

- `createdAt` `updatedAt` は JST で返却する想定。
