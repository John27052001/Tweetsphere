// frontend/src/api.ts

import axios from "axios";

/**
 * Base Axios instance
 * Backend runs on http://localhost:5000
 */
const API = axios.create({
  baseURL: "https://tweetsphere-kpqg.onrender.com",
  withCredentials: true,
});

/**
 * Automatically attach JWT token
 */
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = {
      ...(config.headers || {}),
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

/* =======================
   Types
======================= */

export type User = {
  id: number;
  email: string;
  username: string;
};

export type Tweet = {
  id: number;
  content: string;
  createdAt: string;
  author?: User;
};

/* =======================
   Auth API
======================= */

/**
 * Login
 * Backend returns: { token, user }
 */
export async function login(body: {
  email: string;
  password: string;
}): Promise<{ token: string; user: User }> {
  const res = await API.post("/auth/login", body);
  return res.data;
}

/**
 * Get current user
 */
export async function me(): Promise<User> {
  const res = await API.get("/auth/me");
  return res.data;
}

/* =======================
   Tweets API
======================= */

/**
 * Get timeline
 * GET /tweets/timeline
 */
export async function getTimeline(): Promise<Tweet[]> {
  const res = await API.get("/tweets/timeline");
  return res.data;
}

/**
 * Create tweet
 * POST /tweets
 */
export async function createTweet(content: string): Promise<Tweet> {
  const res = await API.post("/tweets", { content });
  return res.data;
}
