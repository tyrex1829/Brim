"use client";

import React, { useState } from "react";
import { authClient } from "../../../lib/auth-client";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await authClient.signIn.email({ email, password });
      alert("Signin successful!");
      // Optionally redirect
    } catch (err: any) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div>
      <form onSubmit={handleSignin}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign In</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
