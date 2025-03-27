import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import backgroundImage from "../../assets/iiita_parking.png";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { name, email, phone_number, password, role };
    
    try {
      console.log(userData);
      const response = await axios.post(
        "http://localhost:5000/auth/register", 
        userData
      );

      console.log(response.data);

      if (response.data.success) {
        toast.success("Registration successful!");
        navigate("/home");
      } else {
        toast.error(response.data.message || "Error during registration.");
      }

    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      if (error.response) {
        toast.error(`${error.response.data.message || "Server Error!"}`);
      } else if (error.request) {
        toast.error(" No response from server. Please try again.");
      } else {
        toast.error(" Failed to connect to the server.");
      }
    }
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

        <form onSubmit={handleSubmit} className="space-y-5">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
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
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
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
            className="w-full text-white py-3 rounded-lg"
          >
            Sign Up
          </button>
          {/* <button onClick={toast.success("✅ Registration successful!")}>
            
          </button> */}
        </form>

        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-400 font-semibold hover:underline">
            Login
          </Link>
        </p>

        {/* ToastContainer with z-index for visibility */}
      </div>
        <ToastContainer style={{ zIndex: 9999 }} />
    </div>
  );
};

export default Signup;
