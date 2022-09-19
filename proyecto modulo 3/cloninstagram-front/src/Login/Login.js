import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSetUser, useUser } from "../UserContext";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const user = useUser();
  const setUser = useSetUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://photochat.anxoso.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setStatus("error");
    } else {
      setUser(data);
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <main id="login" className="modal-like">
      <form onSubmit={handleSubmit}>
        <label>
          <span>Username</span>
          <input
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          <span>Password</span>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {status === "error" && <p className="error">El usuario ya existe</p>}
        <button>Entrar</button>
      </form>
      <p>
        Todavía no tienes cuenta? <Link to="/signup">Regístrate</Link>
      </p>
    </main>
  );
}

export default Login;
