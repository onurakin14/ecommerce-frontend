import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await axios.post("https://dummyjson.com/users/add", {
        firstName: name,
        username,
        password,
      });

      alert("Account Created Successfully 🎉");
      navigate("/login");
    } catch (err) {
      alert("Registration Failed ❌");
      console.log(err);
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">

        <h2 className="text-2xl font-bold mb-1">Create Account</h2>
        <p className="text-gray-500 text-sm">Sign up to continue</p>

        <form className="mt-6 space-y-4" onSubmit={handleRegister}>
          <input className="w-full border rounded px-3 py-2"
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <input className="w-full border rounded px-3 py-2"
            placeholder="Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />

          <input className="w-full border rounded px-3 py-2"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Already have an account? <Link className="text-blue-600" to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
