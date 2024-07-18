import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { useState } from "react";
import Button from "../components/Button";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("haroun@example.com");
  const [password, setPassword] = useState("greate");

  const { login, isAuthenticated, user } = useAuth();
  console.log(user);
  const navigate = useNavigate();

  function handlSubmit(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }

  useEffect(
    function () {
      if (isAuthenticated) {
        navigate("/app", { replace: true });
      }
    },
    [isAuthenticated, navigate]
  );

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handlSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}