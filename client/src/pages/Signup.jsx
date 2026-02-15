import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://bellcorp-backend-95w7.onrender.com";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    await axios.post(`${BASE_URL}/api/auth/register`, {
      name,
      email,
      password,
    });

    navigate("/login");
  };

  return (
    <div className="auth-box">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Create Account</button>
      </form>
    </div>
  );
}
