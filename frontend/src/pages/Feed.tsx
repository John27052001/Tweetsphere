import { useEffect, useState } from "react";
import { createTweet, getTimeline } from "../api";
import type { Tweet } from "../api";
import { useAuth } from "../AuthContext";

export default function Feed() {
  const { user } = useAuth();
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      setTweets(await getTimeline());
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function post() {
    if (!content.trim()) return;
    try {
      const t = await createTweet(content);
      setTweets((prev) => [t, ...prev]);
      setContent("");
    } catch (e: any) {
      setError(e.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <div className="card">
        <h2>Home</h2>
        <p className="muted">Logged in as @{user?.username}</p>

        <textarea
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What’s happening?"
        />

        <button className="primary" onClick={post}>
          Post
        </button>

        {error && <div className="error">{error}</div>}
      </div>

      {loading ? (
        <p className="muted">Loading tweets…</p>
      ) : (
        <div className="card">
          {tweets.length === 0 && <p>No tweets yet.</p>}
          {tweets.map((t) => (
            <div key={t.id} className="tweet">
              <b>@{t.author?.username ?? "unknown"}</b>
              <p>{t.content}</p>
              <div className="muted">
                {new Date(t.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
