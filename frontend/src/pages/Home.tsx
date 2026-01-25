import { useAuth } from "../AuthContext";

export default function Home() {
  const { user, loading, logout } = useAuth();

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 36 }}>Home page ✅</h1>

      <p>loading: {String(loading)}</p>
      <p>user: {user ? `@${user.username} (${user.email})` : "null"}</p>

      <button onClick={logout} style={{ marginTop: 20 }}>
        Logout
      </button>
    </div>
  );
}
