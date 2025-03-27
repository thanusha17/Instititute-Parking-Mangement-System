import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();

  // Dummy user data
  const user = {
    name: "Admin User",
    email: "admin@example.com",
    role: "Administrator",
  };

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left Section - Sidebar */}
      <aside className="w-1/4 bg-white shadow-md p-6 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-white">
            {user.name.charAt(0)}
          </div>
        <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-500">{user.role}</p>

        <nav className="mt-6 space-y-2 w-full text-center">
          <Link to="/home" className="block py-2 text-gray-600 hover:text-blue-600">Home</Link>
          <a href="#" className="block py-2 text-gray-600 hover:text-blue-600">Parking Logs</a>
          <a href="#" className="block py-2 text-gray-600 hover:text-blue-600">Settings</a>
        </nav>
      </aside>

      {/* Right Section - Profile Details */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold">Profile</h1>
        <div className="mt-6 space-y-4">
          <p className="text-lg"><strong>Name:</strong> {user.name}</p>
          <p className="text-lg"><strong>Email:</strong> {user.email}</p>
          <p className="text-lg"><strong>Role:</strong> {user.role}</p>
        </div>

        <div className="mt-6 space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            ✏️ Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            🚪 Logout
          </button>
        </div>
      </main>
    </div>
  );
};

export default Profile;