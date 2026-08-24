This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Telegram contact notifications

Copy `.env.example` to `.env.local`, then set `TELEGRAM_BOT_TOKEN`,
`TELEGRAM_BOT_USERNAME`, and `TELEGRAM_CHAT_ID`. Add the bot to the destination
group or channel and grant it permission to post messages.

After a visitor submits the form, the site stores the request for 24 hours and
opens the bot using a unique Telegram deep link. The request is sent to the
configured admin chat only when that visitor presses Start. The polling bot is
started automatically with `npm run dev` or `npm start`.

Pending requests are stored in `.data/pending-contacts.json`. This works for a
single persistent Node.js server. Serverless or multi-instance deployments
need shared persistent storage or a database instead.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
