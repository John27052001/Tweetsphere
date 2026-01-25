import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Login from "./pages/Login";
import Feed from "./pages/Feed";

function Protected({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <p className="main">Loading…</p>;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  const { user, logout } = useAuth();

  return (
    <div className="app">
      <header className="nav">
        <div className="nav-inner">
          <Link to="/feed">TweetSphere</Link>
          {user ? (
            <button className="secondary" onClick={logout}>
              Logout
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </header>

      <main className="main">
        <Routes>
          <Route
            path="/feed"
            element={
              <Protected>
                <Feed />
              </Protected>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/feed" />} />
        </Routes>
      </main>
    </div>
  );
}
