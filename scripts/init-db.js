/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Subscription" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "price" REAL NOT NULL,
      "currency" TEXT NOT NULL DEFAULT 'EUR',
      "billingCycle" TEXT NOT NULL,
      "customCycleDays" INTEGER,
      "nextRenewalDate" DATETIME NOT NULL,
      "category" TEXT NOT NULL DEFAULT 'other',
      "status" TEXT NOT NULL DEFAULT 'active',
      "reminderDaysBefore" INTEGER NOT NULL DEFAULT 3,
      "notes" TEXT,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await prisma.$executeRawUnsafe(
    `CREATE INDEX IF NOT EXISTS "Subscription_status_idx" ON "Subscription"("status");`,
  );
  await prisma.$executeRawUnsafe(
    `CREATE INDEX IF NOT EXISTS "Subscription_nextRenewalDate_idx" ON "Subscription"("nextRenewalDate");`,
  );
  await prisma.$executeRawUnsafe(
    `CREATE INDEX IF NOT EXISTS "Subscription_category_idx" ON "Subscription"("category");`,
  );
}

main()
  .then(async () => {
    console.log("Database is ready.");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Database initialization failed:");
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
