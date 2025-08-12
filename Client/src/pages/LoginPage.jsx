import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      return setError("Please enter both fields.");
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      navigate("/chat");
    } catch (err) {
      console.error(err);
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-light">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md border-t-4 border-accent">
        <h2 className="text-2xl font-bold mb-4 text-center text-primary">
          Login to ChatApp
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-secondary text-white py-2 rounded-lg hover:bg-accent transition"
        >
          Login
        </button>

        <p className="text-center mt-4 text-sm">
          Don&apos;t have an account?{" "}
          <span
            className="text-secondary hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>

        <p className="text-center mt-2 text-sm">
          Or{" "}
          <span
            className="text-accent hover:underline cursor-pointer"
            onClick={() => navigate("/chat")}
          >
            continue as Guest
          </span>
        </p>
      </div>
    </div>
  );
}
