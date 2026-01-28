-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "message_type_id" VARCHAR(50) NOT NULL DEFAULT 'USER_MESSAGE',
ADD COLUMN     "metadata" JSONB;

-- CreateTable
CREATE TABLE "room_members" (
    "id" UUID NOT NULL,
    "room_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "invited_by" UUID,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "room_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message_types" (
    "id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "sort_no" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "message_types_pkey" PRIMARY KEY ("id")
);

INSERT INTO "message_types" ("id", "name", "sort_no") VALUES
  ('USER_MESSAGE', 'ユーザーメッセージ', 1),
  ('SYSTEM_JOIN', '参加通知', 2),
  ('SYSTEM_LEAVE', '退出通知', 3),
  ('SYSTEM_ROOM_CREATED', 'ルーム作成通知', 4),
  ('SYSTEM_ROOM_RENAMED', 'ルーム名変更通知', 5),
  ('SYSTEM_INVITE', '招待通知', 6);

-- CreateIndex
CREATE INDEX "idx_room_members_room_id" ON "room_members"("room_id");

-- CreateIndex
CREATE UNIQUE INDEX "room_members_room_id_user_id_key" ON "room_members"("room_id", "user_id");

-- CreateIndex
CREATE INDEX "idx_messages_message_type_id" ON "messages"("message_type_id");

-- AddForeignKey
ALTER TABLE "room_members" ADD CONSTRAINT "room_members_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_members" ADD CONSTRAINT "room_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_members" ADD CONSTRAINT "room_members_invited_by_fkey" FOREIGN KEY ("invited_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_message_type_id_fkey" FOREIGN KEY ("message_type_id") REFERENCES "message_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
