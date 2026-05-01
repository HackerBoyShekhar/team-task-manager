# Team Task Manager (Full-Stack)

A premium, full-stack task management application built with Next.js 16, Prisma, and SQLite. Designed for teams to collaborate on projects and track tasks with role-based access control.

## 🚀 Key Features

- **Authentication**: Secure Signup and Login using JWT and HTTP-only cookies.
- **Role-Based Access Control**:
  - **Admin**: Full visibility of all projects and team members.
  - **Member**: Access to assigned projects and tasks.
- **Project Management**: Create, view, and manage team projects.
- **Task Tracking**: Create tasks with priority, status, and due dates.
- **Dashboard**: Real-time overview of total tasks, completed, in-progress, and overdue items.
- **Modern UI**: Dark-themed, responsive design with glassmorphism effects and smooth animations.

## 🛠 Tech Stack

- **Frontend**: Next.js 16 (App Router), Vanilla CSS, React Hooks.
- **Backend**: Next.js API Routes (REST).
- **Database**: Prisma ORM with SQLite (can be easily switched to Postgres for production).
- **Security**: Bcrypt.js for password hashing, `jose` for JWT sessions.

## 📦 Getting Started

### 1. Clone and Install
```bash
npm install
```

### 2. Database Setup
```bash
npx prisma db push
npx prisma generate
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🌍 Deployment (Railway)

This project is optimized for deployment on **Railway**. 

1. Connect your GitHub repository to Railway.
2. Add the following Environment Variables:
   - `DATABASE_URL`: Your database connection string (e.g., Postgres).
   - `JWT_SECRET`: A secure random string.
3. Railway will automatically detect the `package.json` and deploy using `npm run build` and `npm start`.

---
*Created for the Team Task Manager Assignment.*
