CREATE TABLE "Subscription" (
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
    "updatedAt" DATETIME NOT NULL
);

CREATE INDEX "Subscription_status_idx" ON "Subscription"("status");
CREATE INDEX "Subscription_nextRenewalDate_idx" ON "Subscription"("nextRenewalDate");
CREATE INDEX "Subscription_category_idx" ON "Subscription"("category");
