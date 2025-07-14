# Large

> **Space for your ideas larger than any medium.**

**Large** is a minimalist, anonymous-first blogging platform built with **Next.js**, where users can freely express their thoughts, post blogs, and interact without creating accounts.

## ✨ Features

- 👤 **Create Your Own Anonymous Identity**  
  Users can optionally generate a persistent anonymous identity to use across posts and comments.

- 📝 **Post Blogs Anonymously**  
  Anyone can post without signing in. A unique blog key is generated to allow future editing or deletion.

- 🛠️ **Edit & Delete with Blog Key**  
  Only the holder of the blog's key can edit or delete their post. Keep it safe!

- 💬 **Comment Anonymously**  
  Readers can comment on blogs without logging in.

- ❤️ **Unlimited Likes**  
  Users can like a blog as many times as they want — no limits on appreciation.

- 👓 **Read Blogs that Make Sense**  
  Users can freely read and interact with posted blogs.

## 🛡️ Blog Key System

When a blog is posted, a **unique blog key** is generated and shown only once. This key allows the user to:

- Edit their post.
- Delete their post.

Without this key, the post becomes permanent and immutable to the public.

## 🧠 Anonymous Identity

Users can optionally generate a custom anonymous identity:
- Appears on all posts/comments by that user.
- Not linked to any real-world identity or account.
- Can be regenerated anytime for a fresh persona.

## 📦 Getting Started

```bash
git clone https://github.com/your-username/large.git
cd large
npm install
npm run dev
```

## 🔒 Environment Variables
```env
DATABASE_URL=""
BLOB_READ_WRITE_TOKEN=""

NEXT_PUBLIC_BLOB_URL=""
NEXT_PUBLIC_BLOB_PROTOCOL=""
NEXT_PUBLIC_BLOB_HOSTNAME=""
NEXT_PUBLIC_BLOB_PATHNAME=""
```

## 🧰 Tech Stack

- **Next.js** – React framework for building full-stack web applications.
- **Tailwind CSS** – Utility-first CSS framework for rapid and responsive UI design.
- **Drizzle ORM** – Lightweight, TypeScript-native ORM for SQL databases.
- **Neon** – Serverless PostgreSQL database, ideal for modern web apps.
- **Vercel Blob** – Managed file storage for handling uploads like images or documents.
- **Vercel** – Deployment platform optimized for Next.js apps with serverless capabilities.

## 🙌 Credits

- **Developer**: [@mkcalendario-strat](https://github.com/mkcalendario-strat) / [@markcalendario](https://github.com/markcalendario)
- **Built at**: [Stratpoint Technologies](https://www.stratpoint.com)
