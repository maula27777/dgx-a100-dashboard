import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Login gagal."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>DGX A100 Dashboard</h1>

        <p>
          Login untuk mengakses dashboard
          monitoring.
        </p>

        <form onSubmit={handleLogin}>
          <label>Email</label>

          <input
            type="email"
            placeholder="Masukkan email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}