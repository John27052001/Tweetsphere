import express from "express";
import cors from "cors";
import authRouter from "./routes/auth";
import tweetsRouter from "./routes/tweets";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "TweetSphere backend alive 🚀" });
});

app.use("/auth", authRouter);
app.use("/tweets", tweetsRouter);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
