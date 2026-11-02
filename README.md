<div align="center">

# 📚 BookNook

### Your little corner of knowledge.

A modern online library where readers can discover books, explore new perspectives, and manage their reading journey.

[![Live Website](https://img.shields.io/badge/Live-BookNook-2563EB?style=for-the-badge&logo=vercel&logoColor=white)](https://booknook-client-six.vercel.app)
[![Frontend](https://img.shields.io/badge/Frontend-Next.js-111827?style=for-the-badge&logo=next.js)](https://booknook-client-six.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Express-16A34A?style=for-the-badge&logo=express&logoColor=white)](https://booknook-backend-two.vercel.app)

</div>

---

## ✨ About BookNook

**BookNook** is an online library platform designed to make book discovery and borrowing simple. Users can browse the collection, create an account, borrow available books, and manage the books they contribute to the library.

---

## 🌐 Live Demo

| Service | URL |
| :--- | :--- |
| **Frontend Application** | [booknook-client-six.vercel.app](https://booknook-client-six.vercel.app) |
| **Backend API** | [booknook-backend-two.vercel.app](https://booknook-backend-two.vercel.app) |

---

## 🚀 Features

| Feature | Description |
| :--- | :--- |
| 🏠 **Responsive Homepage** | Explore the library through a clean, responsive interface |
| 🔎 **Browse & Search** | Find books easily by browsing and searching the collection |
| 📖 **Book Details** | View comprehensive information for each individual book |
| 🔐 **Authentication** | Sign up and sign in using Email/Password or Google OAuth |
| 🪪 **JWT Integration** | Securely authenticate protected backend API requests |
| ➕ **Book Management** | Add new books to expand the library collection |
| ✏️ **Edit & Delete** | Update or remove books you have contributed |
| 📚 **Borrow Books** | Borrow books seamlessly while copies are available |
| 👤 **My Books** | View and manage all your contributed books in one place |
| 📋 **My Borrows** | Track the books you have currently borrowed |
| ↩️ **Return Books** | Return borrowed books back to the library |
| 🔔 **Feedback States** | Smooth loading, empty, error, and toast notification states |

---

## 🧰 Tech Stack

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-App_Router-000000?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-149ECA?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Blue-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Styling-06B6D4?style=flat-square&logo=tailwindcss)
![Better Auth](https://img.shields.io/badge/Better_Auth-Authentication-333333?style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb)
![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?style=flat-square&logo=vercel)

</div>

- **Framework:** Next.js (App Router)
- **UI & Styling:** React 19, TypeScript, Tailwind CSS
- **Authentication:** Better Auth & JWT Client Plugin
- **Database:** MongoDB
- **Notifications:** React Toastify
- **Icons:** Lucide React, React Icons
- **Deployment:** Vercel

---

## 🗂️ Project Structure

```text
src/
├── app/
│   ├── api/auth/
│   ├── sign-in/
│   ├── sign-up/
│   ├── books/
│   ├── my-books/
│   └── my-borrows/
├── components/
│   ├── book/
│   ├── home/
│   └── ui/
└── lib/
    ├── auth.ts
    ├── auth-client.ts
    ├── getTokenFromClient.ts
    └── getTokenFromServer.ts
```

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** (LTS recommended)
- **npm**
- **MongoDB** connection string
- **Google OAuth** credentials (for Google sign-in)

### 1. Clone the repository

```bash
git clone YOUR_FRONTEND_REPOSITORY_URL
cd YOUR_FRONTEND_PROJECT_FOLDER
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
BETTER_AUTH_SECRET=YOUR_BETTER_AUTH_SECRET
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING

GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

NEXT_PUBLIC_API_URL=http://localhost:8000
```

> **Note for Production:** Configure these environment variables in Vercel:
> - `BETTER_AUTH_URL` should use your deployed frontend origin.
> - `NEXT_PUBLIC_API_URL` should use your deployed backend origin.
> - Keep all secret values private.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Create a production build

```bash
npm run build
npm start
```

---

## 🔑 Authentication & Google OAuth

BookNook uses **Better Auth** for email/password and Google authentication. The frontend also uses the Better Auth JWT client plugin to obtain tokens for protected backend requests.

Include the JWT in the request header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

### Google OAuth Configuration

Add these values in your Google Cloud Console OAuth client:

**Authorized JavaScript origins:**
```text
http://localhost:3000
[https://booknook-client-six.vercel.app](https://booknook-client-six.vercel.app)
```

**Authorized redirect URIs:**
```text
http://localhost:3000/api/auth/callback/google
[https://booknook-client-six.vercel.app/api/auth/callback/google](https://booknook-client-six.vercel.app/api/auth/callback/google)
```

---

## 🔌 Backend API

Configure `NEXT_PUBLIC_API_URL` with the Express API origin.

| Environment | API URL |
| :--- | :--- |
| **Local** | `http://localhost:8000` |
| **Production** | `https://booknook-backend-two.vercel.app` |

The frontend uses the Express backend for book and borrowing operations, while Better Auth authentication endpoints are served directly by the Next.js application.

---

## ☁️ Deployment

The frontend is deployed on **Vercel**.

1. Import the frontend repository into Vercel.
2. Add the required environment variables to the **Production** environment.
3. Set `BETTER_AUTH_URL` to the deployed frontend URL.
4. Set `NEXT_PUBLIC_API_URL` to the deployed backend URL.
5. Configure the production Google OAuth origin and redirect URI.
6. Redeploy the project after updating environment variables.
7. Test authentication and API requests on the live website.

---

## 🔒 Security

- Never commit `.env` or `.env.local` files to version control.
- Never expose `BETTER_AUTH_SECRET`, `MONGODB_URI`, or `GOOGLE_CLIENT_SECRET` on the client side.
- Always use HTTPS for production deployments.
- Keep protected API authorization and ownership checks strictly on the backend.
- Do not rely solely on frontend checks to protect private operations.

---

<div align="center">

**Made with 📚 for readers and book lovers.**

[Visit BookNook](https://booknook-client-six.vercel.app) · [Backend API](https://booknook-backend-two.vercel.app)

</div>