import { Router } from "express";
import { prisma } from "../prisma";
import jwt from "jsonwebtoken";

const router = Router();
const JWT_SECRET = "dev-secret";

function requireAuth(req: any, res: any, next: any) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing token" });
  }

  try {
    const token = header.split(" ")[1];
    const payload = jwt.verify(token, JWT_SECRET) as { userId: number };
    req.userId = payload.userId;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

router.post("/", requireAuth, async (req: any, res) => {
  const { content } = req.body;
  if (!content || content.length > 280) {
    return res.status(400).json({ message: "Invalid tweet" });
  }

  const tweet = await prisma.tweet.create({
    data: {
      content,
      authorId: req.userId,
    },
  });

  res.json(tweet);
});

router.get("/timeline", requireAuth, async (_req: any, res) => {
  const tweets = await prisma.tweet.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      author: {
        select: { username: true },
      },
    },
  });

  res.json(tweets);
});


export default router;
