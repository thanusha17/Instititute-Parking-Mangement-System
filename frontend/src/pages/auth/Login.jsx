import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/iiita_parking.png";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      (storedUser.email === identifier || storedUser.phone === identifier) &&
      storedUser.password === password
    ) {
      alert("Login successful!");
      if (storedUser.userType === "admin") {
        navigate("/admin-dashboard");
      } else if (storedUser.userType === "faculty_student") {
        navigate("/parking-slots");
      } else if (storedUser.userType === "visitor") {
        navigate("/visitor-booking");
      }
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark overlay for visibility */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative bg-gray-800/90 p-10 rounded-lg shadow-xl backdrop-blur-md w-full max-w-md border border-white/20">
        <h2 className="text-3xl font-bold text-center text-white mb-6 flex items-center justify-center">
          🚗 <span className="ml-2">Parking Management Login</span>
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="text"
            placeholder="Email or Phone"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
