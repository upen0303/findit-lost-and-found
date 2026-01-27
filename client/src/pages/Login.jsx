import { useState } from "react";
import API from "../services/api";

export default function Login({ onLogin, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      onLogin();
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>
      <button onClick={onBack}>← Back</button>


      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
