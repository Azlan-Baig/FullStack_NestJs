import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';

const prisma = new PrismaClient();

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

async function main() {
  const defaultPassword = await hash('123');

  // Generate and create users
  const usersData = Array.from({ length: 10 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    bio: faker.lorem.sentence(),
    avatar: faker.image.avatar(),
    password: defaultPassword,
  }));

  const createdUsers = await Promise.all(
    usersData.map((user) => prisma.user.create({ data: user }))
  );

  const userIds = createdUsers.map((u) => u.id);

  // Generate and create posts with comments
  const postsData = Array.from({ length: 400 }).map(() => {
    const title = faker.lorem.sentence();
    return {
      title,
      slug: generateSlug(title),
      description: faker.lorem.paragraphs(3),
      thumbnail: faker.image.urlPicsumPhotos({ height: 240, width: 320 }),
      authorId: faker.helpers.arrayElement(userIds),
      published: true,
    };
  });

  await Promise.all(
    postsData.map((post) =>
      prisma.post.create({
        data: {
          ...post,
          comments: {
            createMany: {
              data: Array.from({ length: 20 }).map(() => ({
                content: faker.lorem.sentence(),
                authorId: faker.helpers.arrayElement(userIds),
              })),
            },
          },
        },
      })
    )
  );

  console.log('Seeding Completed!');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
