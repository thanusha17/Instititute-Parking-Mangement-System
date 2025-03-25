import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/iiita_parking.png";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  const sendOtp = () => {
    const generatedOtp = Math.floor(100000 + Math.random() * 900000);
    setSentOtp(generatedOtp);
    alert(`Your OTP is: ${generatedOtp}`);
  };

  const verifyOtp = () => {
    if (parseInt(otp) === sentOtp) {
      alert("OTP Verified ✅");
      setIsVerified(true);
    } else {
      alert("Invalid OTP ❌");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!isVerified) {
      alert("Please verify OTP before signing up!");
      return;
    }
    localStorage.setItem(
      "user",
      JSON.stringify({ name, email, phone, password, userType })
    );

    alert("Signup successful! Redirecting...");
    navigate("/home");
  };

  return (
    <div
  className="min-h-screen flex items-center justify-center bg-cover bg-center relative p-4"
  style={{ backgroundImage: `url(${backgroundImage})` }}
>
  {/* Dark overlay for better contrast */}
  <div className="absolute inset-0 bg-black/50"></div>

  <div className="relative bg-gray-800/90 p-8 rounded-lg shadow-xl backdrop-blur-md w-full max-w-md border border-white/20 overflow-hidden">
    <h2 className="text-3xl font-bold text-center text-white mb-6 flex items-center justify-center">
      🅿️ <span className="ml-2">Create Parking Account</span>
    </h2>
    <form onSubmit={handleSignup} className="space-y-5">
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select User Type</option>
            <option value="admin">Admin</option>
            <option value="faculty_student">Faculty/Student</option>
            <option value="visitor">Visitor</option>
          </select>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="button"
            onClick={sendOtp}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
          >
            Send OTP
          </button>

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="button"
            onClick={verifyOtp}
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600"
          >
            Verify OTP
          </button>

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
            className={`w-full text-white py-3 rounded-lg ${
              isVerified
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isVerified}
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-blue-400 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
