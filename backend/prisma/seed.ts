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
      senderId: 'b6e2b5e2-3c4a-4e1a-9c2a-123456789abc',
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
      contents: 'こんにちは2',
    },
  });
  const message3 = await prisma.message.upsert({
    where: { id: 'ba9b861f-da47-4cd6-99df-9d9ece47fab9' },
    update: {},
    create: {
      id: 'ba9b861f-da47-4cd6-99df-9d9ece47fab9',
      roomId: '6508a8a7-2b77-49ee-947e-f01260a1e295',
      senderId: 'b6e2b5e2-3c4a-4e1a-9c2a-123456789abc',
      contents: 'こんにちは3',
    },
  });

  console.log({ statusActive, user, room, message1, message2, message3 });
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
