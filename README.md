🐦 TweetSphere

A full-stack Twitter-like social media application built with React, TypeScript, Node.js, Express, and Prisma, featuring authentication, timelines, and tweet creation.

🔗 Live Demo: (add Vercel link after deploy)
🔗 Backend API: (add Render/Railway link after deploy)

✨ Features

🔐 JWT Authentication

Login / logout

Persistent sessions

📝 Create Tweets

🧵 Personalized Timeline

👤 User Accounts

🔄 Live Feed Updates

🎨 Modern Dark UI

🛡️ Protected Routes

🧠 Clean API Architecture

🧱 Tech Stack
Frontend

React

TypeScript

Vite

Axios

CSS (custom modern dark theme)

Backend

Node.js

Express

TypeScript

Prisma ORM

SQLite (local) / PostgreSQL (production)

JWT Authentication

DevOps

Git & GitHub

Render / Railway (backend)

Vercel (frontend)

📂 Project Structure
tweetsphere/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   └── tweets.ts
│   │   ├── prisma.ts
│   │   └── index.ts
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   └── Feed.tsx
│   │   ├── AuthContext.tsx
│   │   ├── api.ts
│   │   └── App.tsx
│   └── package.json
│
└── README.md

🔑 Authentication Flow

User logs in with email & password

Backend validates credentials

JWT token is returned

Token is stored in localStorage

Axios interceptor attaches token to all requests

Protected routes validate JWT on backend

🧵 Timeline Logic

Tweets are stored in the database with timestamps

Timeline endpoint returns tweets ordered by newest first

Frontend fetches timeline on load and refresh

New tweets are optimistically added to the feed

🧪 API Endpoints
Auth
Method	Route	Description
POST	/auth/login	Login user
GET	/auth/me	Get current user
Tweets
Method	Route	Description
POST	/tweets	Create a tweet
GET	/tweets/timeline	Get timeline
🚀 Running Locally
1️⃣ Clone the repository
git clone https://github.com/YOUR_USERNAME/tweetsphere.git
cd tweetsphere

2️⃣ Backend setup
cd backend
npm install
npx prisma migrate dev
npm run dev


Backend runs at:

http://localhost:5000

3️⃣ Frontend setup
cd frontend
npm install
npm run dev


Frontend runs at:

http://localhost:5173

🌍 Deployment
Backend

Deployed on Render / Railway

Uses PostgreSQL in production

Environment variables:

DATABASE_URL=
JWT_SECRET=

Frontend

Deployed on Vercel

Environment variable:
VITE_API_URL=https://your-backend-url
📈 What This Project Demonstrates
Full-stack application design

REST API development

Secure authentication

State management with React Context

ORM usage with Prisma

Production-ready deployment

Debugging real-world issues (CORS, auth, env vars)

🛠️ Future Improvements
❤️ Likes & reactions

➕ Follow / unfollow users

👤 User profiles

🔔 Notifications

⚡ Redis caching & rate limiting

📱 Mobile-responsive UI

👋 Author
Megha John Babu
💻 Full-Stack Developer
🔗 GitHub: https://github.com/John27052001
