import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        await axios.get("http://localhost:3000/api/auth/user", {
          withCredentials: true,
        });
        setLoggedIn(true); // user is logged in
      } catch {
        setLoggedIn(false); // not logged in
      }
    };
    checkLogin();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setLoggedIn(false);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-transparent backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          ImageCaption AI
        </h1>
        <nav className="space-x-6 text-white">
          <Link to="/" className="hover:text-purple-400 transition">
            Home
          </Link>

          {loggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="hover:text-purple-400 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-purple-400 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-purple-400 transition">
                Login
              </Link>
              <Link to="/register" className="hover:text-purple-400 transition">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
