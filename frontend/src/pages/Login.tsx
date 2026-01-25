import { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("test123");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login({ email, password });
      nav("/feed");
    } catch (e: any) {
      setError(e?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h1>Welcome back</h1>
      <p className="muted">Log in to post and view your timeline.</p>

      <form onSubmit={submit}>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="error">{error}</div>}

        <button className="primary" disabled={loading}>
          {loading ? "Logging in…" : "Login"}
        </button>
      </form>

      <p className="muted" style={{ marginTop: 10 }}>
        Tip: use your test account credentials.
      </p>
    </div>
  );
}
