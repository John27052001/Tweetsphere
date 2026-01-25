// frontend/src/pages/Profile.tsx
import { useEffect, useState } from "react";
import { getProfile, followUser, type User, type Tweet } from "../api";
import { useAuth } from "../AuthContext";

export default function Profile({ userId }: { userId: number }) {
  const { user } = useAuth();

  const [profile, setProfile] = useState<User | null>(null);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getProfile(userId);
        if (!mounted) return;

        setProfile(res.user);
        setTweets(res.tweets ?? []);
        setIsFollowing(!!res.isFollowing);
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message || "Failed to load profile");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [userId]);

  async function toggleFollow() {
    if (!profile) return;
    setBusy(true);
    setError(null);

    try {
      const res = await followUser(profile.id);
      setIsFollowing(!!res.isFollowing);
    } catch (e: any) {
      setError(e?.message || "Failed to follow/unfollow");
    } finally {
      setBusy(false);
    }
  }

  if (loading) return <div style={{ padding: 20 }}>Loading profile...</div>;
  if (error) return <div style={{ padding: 20, color: "crimson" }}>{error}</div>;
  if (!profile) return <div style={{ padding: 20 }}>Profile not found.</div>;

  const isMe = user?.id === profile.id;

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 20 }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>@{profile.username}</h1>
      <div style={{ opacity: 0.8, marginBottom: 12 }}>{profile.email}</div>

      {!isMe && (
        <button onClick={toggleFollow} disabled={busy} style={{ marginBottom: 16 }}>
          {busy ? "Please wait..." : isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}

      <h2 style={{ fontSize: 18, marginBottom: 10 }}>Tweets</h2>
      <div style={{ display: "grid", gap: 10 }}>
        {tweets.length === 0 && <div>No tweets yet.</div>}

        {tweets.map((t) => (
          <div
            key={t.id}
            style={{
              border: "1px solid #ddd",
              padding: 12,
              borderRadius: 10,
              background: "#fff",
            }}
          >
            <div style={{ marginTop: 6 }}>{t.content}</div>
            <div style={{ marginTop: 8, fontSize: 12, opacity: 0.7 }}>
              {new Date(t.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
