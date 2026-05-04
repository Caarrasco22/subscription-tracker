# SubTrack

Simple subscription tracker for normal users.

Product promise:

> See what you pay, when it renews, and what you could cancel.

SubTrack is a small v0.1 web app for manually tracking subscriptions and
recurring payments. It is private, practical and intentionally simple.

## What v0.1 includes

- Dashboard with monthly total, yearly total, active subscriptions and next renewal.
- Subscription list.
- Add, edit and delete subscriptions.
- Mark subscriptions as active, paused or cancelled.
- Mark a subscription as paid to advance its renewal date.
- Upcoming charges grouped by next 7 days, next 30 days and later.
- Simple insights:
  - most expensive subscription;
  - most expensive category;
  - monthly equivalent cost;
  - yearly projected cost;
  - possible savings from cancelling the most expensive item.
- Local SQLite database through Prisma.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- Prisma
- SQLite

This stack keeps the app small, self-hostable and easy to run locally.

## Data model

`Subscription`

- `id`
- `name`
- `price`
- `currency`
- `billingCycle`
- `customCycleDays`
- `nextRenewalDate`
- `category`
- `status`
- `reminderDaysBefore`
- `notes`
- `createdAt`
- `updatedAt`

## Install

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Generate Prisma Client and create the local SQLite database:

```bash
npm run prisma:generate
npm run prisma:migrate
```

If Prisma Migrate is not available in your local environment, initialize the
SQLite table directly with:

```bash
npm run db:init
```

Start development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run db:init
npm run prisma:generate
npm run prisma:migrate
```

## Privacy note

SubTrack v0.1 stores data locally in SQLite. It does not connect to banks,
payments, emails, analytics or third-party tracking services.

Do not store sensitive information in notes. Use plain notes such as
`cancel through app store` or `annual plan renews in May`.

## Known limitations

- Totals assume the entered currency values can be compared directly.
- There is no currency conversion.
- There are no notifications outside the app.
- There is no authentication in v0.1.
- There is no import/export yet.

## Roadmap

- v0.2: import/export CSV and better filtering.
- v0.3: optional local reminder jobs.
- v0.4: simple charts.
- v0.5: optional authentication for shared/self-hosted deployments.

No bank integrations, AI or payments are planned for the early versions.
