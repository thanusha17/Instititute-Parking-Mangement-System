import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast ,ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/auth/logout", {}, { withCredentials: true });
      toast.success("Logged out successfully!", { position: "top-right" });
      navigate("/auth/login"); // Redirect back to login page
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Failed to logout. Please try again.", { position: "top-right" });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center w-96">
        <h2 className="text-3xl font-bold mb-4">🏢 Welcome to Parking Management</h2>
        <p className="text-gray-600">You are successfully logged in.</p>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <ToastContainer style={{ zIndex: 9999 }} />
    </div>
  );
};

export default Home;
