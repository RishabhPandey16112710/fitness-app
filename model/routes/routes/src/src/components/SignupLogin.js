import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignupLogin() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (mode === "register") {
      await axios.post("http://localhost:5000/api/user/register", form);
      setMode("login");
    } else {
      const { data } = await axios.post("http://localhost:5000/api/user/login", form);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    }
  };

  return (
    <form onSubmit={submit}>
      {mode === "register" && (
        <input name="username" onChange={handleChange} placeholder="Username" required />
      )}
      <input name="email" type="email" onChange={handleChange} placeholder="Email" required />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
      <button type="submit">{mode === "login" ? "Login" : "Register"}</button>
      <button type="button" onClick={() => setMode(mode === "login" ? "register" : "login")}>
        Switch to {mode === "login" ? "Register" : "Login"}
      </button>
    </form>
  );
}
