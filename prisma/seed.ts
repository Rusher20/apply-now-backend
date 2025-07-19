import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('Pr0gressPr02k24', 10);

  await prisma.user.upsert({
    where: { email: 'HRTeam@progresspro.com.ph' },
    update: {},
    create: {
      email: 'HRTeam@progresspro.com.ph',
      password,
      role: 'ADMIN',
    },
  });

  await prisma.user.upsert({
    where: { email: 'ITTeam@progresspro.com.ph' },
    update: {},
    create: {
      email: 'ITTeam@progresspro.com.ph',
      password,
      role: 'ADMIN',
    },
  });

  console.log('Seed complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());