::: {align="center"}
# 📚 BookNook

### Your little corner of knowledge.

A small online library where readers can discover books, explore new
perspectives, and manage their reading journey.

[![Live
Website](https://img.shields.io/badge/Live-BookNook-2563EB?style=for-the-badge&logo=vercel&logoColor=white)](https://booknook-client-six.vercel.app)
[![Frontend](https://img.shields.io/badge/Frontend-Next.js-111827?style=for-the-badge&logo=next.js)](https://booknook-client-six.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Express-16A34A?style=for-the-badge&logo=express&logoColor=white)](https://booknook-backend-two.vercel.app)
:::✨ About BookNook
BookNook is an online library platform designed to make book discovery
and borrowing simple. Users can browse the collection, create an
account, borrow available books, and manage the books they contribute to
the library.
🌐 Live Demo
  Service                             URL
  Frontend Application            booknook-client-six.vercel.app
Backend API                     booknook-backend-two.vercel.app
🚀 Features
  Feature                             Description
  🏠 Responsive Homepage              Explore the library through a
responsive interface

  🔎 Browse & Search                  Find books by browsing and
searching the collection

  📖 Book Details                     View individual book information

  🔐 Authentication                   Sign up and sign in using
email/password or Google

  🪪 JWT Integration                  Authenticate protected backend
requests

  ➕ Book Management                  Add new books to the library

  ✏️ Edit & Delete                    Manage books you have added

  📚 Borrow Books                     Borrow books while copies are
available

  👤 My Books                         View your contributed books

  📋 My Borrows                       View your borrowed books

  ↩️ Return Books                     Return borrowed books
🔔 Feedback States                  Loading, empty, error, and toast
notification states
🧰 Tech Stack
::: {align="center"}
![Next.js](https://img.shields.io/badge/Next.js-App_Router-000000?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-149ECA?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Blue-3178C6?style=flat-square&logo=typescript)
![Tailwind
CSS](https://img.shields.io/badge/Tailwind_CSS-Styling-06B6D4?style=flat-square&logo=tailwindcss)
![Better
Auth](https://img.shields.io/badge/Better_Auth-Authentication-333333?style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb)
![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?style=flat-square&logo=vercel)
:::- Framework: Next.js App Router
- UI: React, TypeScript, Tailwind CSS
- Authentication: Better Auth and JWT client plugin
- Database: MongoDB integration
- Notifications: React Toastify
- Icons: Lucide React, React Icons
- Deployment: Vercel
Check the final package.json and remove or update any technology
that is not used by the project.

⚙️ Getting Started
Prerequisites
- Node.js (LTS recommended)
- npm
- MongoDB connection string
- Google OAuth credentials (for Google sign-in)
1. Clone the repository
git clone YOUR_FRONTEND_REPOSITORY_URL
cd YOUR_FRONTEND_PROJECT_FOLDER
2. Install dependencies
npm install
3. Configure environment variables
Create a .env.local file in the project root:
BETTER_AUTH_SECRET=YOUR_BETTER_AUTH_SECRET
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING

GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

NEXT_PUBLIC_API_URL=http://localhost:8000
For production, configure the environment variables in Vercel:
- BETTER_AUTH_URL should use your deployed frontend origin.
- NEXT_PUBLIC_API_URL should use your deployed backend origin.
- Keep all secret values private.
4. Start the development server
npm run dev
Open http://localhost:3000 in your browser.
5. Create a production build
npm run build
npm start
🔑 Authentication & Google OAuth
BookNook uses Better Auth for email/password and Google authentication.
The frontend also uses the Better Auth JWT client plugin to obtain
tokens for protected backend requests.

Include the JWT in the request header:
Authorization: Bearer YOUR_JWT_TOKEN
Google OAuth Configuration
Add these values in your Google Cloud OAuth client.

Authorized JavaScript origins
http://localhost:3000
https://booknook-client-six.vercel.app
Authorized redirect URIs
http://localhost:3000/api/auth/callback/google
https://booknook-client-six.vercel.app/api/auth/callback/google
🔌 Backend API
Configure NEXT_PUBLIC_API_URL with the Express API origin.

  Environment   API URL
  Local         http://localhost:8000
Production    https://booknook-backend-two.vercel.app

The frontend uses the Express backend for book and borrowing operations.
Better Auth authentication endpoints are served by the Next.js
application.
🗂️ Project Structure
The following is a high-level overview. Update it if your repository
structure differs.
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
☁️ Deployment
The frontend is deployed on Vercel.
1. Import the frontend repository into Vercel.
2. Add the required environment variables to the Production
   environment.
3. Set BETTER_AUTH_URL to the deployed frontend URL.
4. Set NEXT_PUBLIC_API_URL to the deployed backend URL.
5. Configure the production Google OAuth origin and redirect URI.
6. Redeploy after changing environment variables.
7. Test authentication and API requests on the deployed website.
🔒 Security
- Never commit .env or .env.local.
- Never expose BETTER_AUTH_SECRET, MONGODB_URI, or
  GOOGLE_CLIENT_SECRET.
- Use HTTPS for production deployments.
- Keep protected API authorization and ownership checks on the
  backend.
- Do not rely only on frontend checks to protect private operations.
::: {align="center"}
**Made with 📚 for readers and book lovers.**

[Visit BookNook](https://booknook-client-six.vercel.app) · [Backend
API](https://booknook-backend-two.vercel.app)
:::