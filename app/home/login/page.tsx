"use client";

import { useEffect, useState } from "react";
import { FaRegUser, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { baseUrl } from "../../Components/baseUrl";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const [year, setYear] = useState<number | null>(null);

useEffect(() => {
  setYear(new Date().getFullYear());
}, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // clear previous errors

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
console.log(res);

      // if the server didn’t respond properly (CORS/network issue)
      if (!res.ok) {
        const text = await res.text();
        console.error("Server Response:", text);
        throw new Error(`Login failed with status ${res.status}`);
      }

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login successful");
        router.push("/admin-dashboard");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      if (err.message.includes("CORS")) {
        setError("CORS error: Server not allowing frontend domain");
      } else {
        setError("Server error. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/60 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/20 p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-2 tracking-tight">
            UrbanProperties
          </h1>
          <p className="text-gray-600">CRM Login Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaRegUser className="absolute left-4 top-3.5 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              autoComplete="email"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-4 top-3.5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-sm text-blue-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="accent-blue-600" />
              Remember me
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-red-500 text-sm font-medium"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-2.5 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-all"
          >
            Sign In
          </motion.button>
        </form>

        <p className="mt-8 text-center text-gray-500 text-sm">
  © {year ?? ""} UrbanProperties CRM. All Rights Reserved.
</p>
      </motion.div>
    </div>
  );
}
