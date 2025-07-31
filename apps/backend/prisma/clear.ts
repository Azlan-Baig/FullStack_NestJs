import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearDB() {
  await prisma.$transaction([
    prisma.like.deleteMany(),
    prisma.comment.deleteMany(),
    prisma.post.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  console.log('✅ Database cleared.');
}

clearDB()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
