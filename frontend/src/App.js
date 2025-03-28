import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Profile from "./pages/Profile";
import AddLocation from "./pages/AddLocation";
import LocationDetails from "./pages/LocationDetails";
import EditLocation from "./pages/EditLocation";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route path="/auth">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Signup />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/addlocation" element={<AddLocation />} />
        <Route path="/location/:id" element={<LocationDetails />} />
        <Route path="/location/:id/edit" element={<EditLocation />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
