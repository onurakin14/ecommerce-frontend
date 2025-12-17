import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { loginUser } from "../../store/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const loading = useSelector((state: RootState) => state.auth.loading);

  const [username, setUsername] = useState("emilys");   
  const [password, setPassword] = useState("emilyspass");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ username, password }));

    if (loginUser.fulfilled.match(result)) {
      alert("Login successful 🎉");
      navigate("/"); 
    } else {
      alert("Login failed ❌ Check credentials!");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8 text-center">

        <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
        <p className="text-sm text-gray-500 mt-1">Sign in to continue</p>

        <form onSubmit={handleSubmit} className="mt-6 text-left space-y-4">

          <div>
            <label className="text-sm font-medium text-gray-700">Username</label>
            <input
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <span className="flex-1 h-px bg-gray-200"></span>
          <span className="text-sm text-gray-500">OR</span>
          <span className="flex-1 h-px bg-gray-200"></span>
        </div>

        <button className="w-full flex items-center justify-center gap-2 border rounded-md py-2 hover:bg-gray-50">
          <FcGoogle size={20}/> Continue with Google
        </button>

        <button className="w-full flex items-center justify-center gap-2 border rounded-md py-2 mt-2 hover:bg-gray-50">
          <FaFacebookF size={18} className="text-blue-600"/> Continue with Facebook
        </button>

        <p className="text-sm text-gray-500 mt-6">
          Don't have an account? <Link to="/register" className="text-blue-600">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
