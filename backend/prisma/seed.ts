import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const statusActive = await prisma.userStatus.upsert({
    where: { id: 'ACTIVE' },
    update: {},
    create: {
      id: 'ACTIVE',
      name: '利用中',
      description: 'ユーザーが利用中であることを示します。',
      sortNo: 1,
    },
  });

  const authProviderGoogle = await prisma.authProvider.upsert({
    where: { id: 'google' },
    update: {},
    create: {
      id: 'google',
      name: 'Google',
    },
  });

  const authProviderGithub = await prisma.authProvider.upsert({
    where: { id: 'github' },
    update: {},
    create: {
      id: 'github',
      name: 'GitHub',
    },
  });

  // TODO:以下はテスト用のデータ。後々削除予定。
  const user = await prisma.user.upsert({
    where: { id: 'b6e2b5e2-3c4a-4e1a-9c2a-123456789abc' },
    update: {},
    create: {
      id: 'b6e2b5e2-3c4a-4e1a-9c2a-123456789abc',
      email: 'masuoka@h-company.co.jp',
      userStatusId: 'ACTIVE',
      profile: {
        create: {
          name: '益岡 一樹',
          profileImageUrl: 'https://ui.shadcn.com/avatars/02.png',
        },
      },
    },
  });

  const user2 = await prisma.user.upsert({
    where: { id: '387ce650-82ce-72d9-b504-ebc1ecf22123' },
    update: {},
    create: {
      id: '387ce650-82ce-72d9-b504-ebc1ecf22123',
      email: 'test@h-company.co.jp',
      userStatusId: 'ACTIVE',
      profile: {
        create: {
          name: '鈴木 慎吾',
          profileImageUrl: 'https://ui.shadcn.com/avatars/03.png',
        },
      },
    },
  });

  const room = await prisma.room.upsert({
    where: { id: '6508a8a7-2b77-49ee-947e-f01260a1e295' },
    update: {},
    create: {
      id: '6508a8a7-2b77-49ee-947e-f01260a1e295',
      name: 'テストルーム',
      description: 'これはテストルームです。',
      createUserId: 'b6e2b5e2-3c4a-4e1a-9c2a-123456789abc',
      updateUserId: 'b6e2b5e2-3c4a-4e1a-9c2a-123456789abc',
    },
  });

  const message1 = await prisma.message.upsert({
    where: { id: '66a63ee8-1291-476f-ac22-843cfd5b21b4' },
    update: {},
    create: {
      id: '66a63ee8-1291-476f-ac22-843cfd5b21b4',
      roomId: '6508a8a7-2b77-49ee-947e-f01260a1e295',
      senderId: '387ce650-82ce-72d9-b504-ebc1ecf22123',
      contents: 'こんにちは',
    },
  });
  const message2 = await prisma.message.upsert({
    where: { id: 'f7081712-83c6-4427-80c6-38e12f948273' },
    update: {},
    create: {
      id: 'f7081712-83c6-4427-80c6-38e12f948273',
      roomId: '6508a8a7-2b77-49ee-947e-f01260a1e295',
      senderId: 'b6e2b5e2-3c4a-4e1a-9c2a-123456789abc',
      contents: '今日も暑いですね。',
    },
  });
  const message3 = await prisma.message.upsert({
    where: { id: 'ba9b861f-da47-4cd6-99df-9d9ece47fab9' },
    update: {},
    create: {
      id: 'ba9b861f-da47-4cd6-99df-9d9ece47fab9',
      roomId: '6508a8a7-2b77-49ee-947e-f01260a1e295',
      senderId: '387ce650-82ce-72d9-b504-ebc1ecf22123',
      contents: '明日も暑いです。',
    },
  });
  const message4 = await prisma.message.upsert({
    where: { id: '74e986ee-bde6-e60f-7eb7-444f5133c5eb' },
    update: {},
    create: {
      id: '74e986ee-bde6-e60f-7eb7-444f5133c5eb',
      roomId: '6508a8a7-2b77-49ee-947e-f01260a1e295',
      senderId: 'b6e2b5e2-3c4a-4e1a-9c2a-123456789abc',
      contents: 'そうですか。',
    },
  });

  console.log({
    statusActive,
    authProviderGoogle,
    authProviderGithub,
    user,
    user2,
    room,
    message1,
    message2,
    message3,
    message4,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
