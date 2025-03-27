import AdminNavbar from "../components/AdminNavbar";
import backgroundImage from "../assets/bus.png";
import cc3Image from "../assets/cc3.png";
import LocationCard from "../components/LocationCard";

const Home = () => {
  const locations = [
    { id: 1, name: "CC3", image: cc3Image },
    { id: 2, name: "Library", image: backgroundImage },
    { id: 3, name: "Hostel", image: backgroundImage },
  ];

  const handleEdit = (id) => {
    console.log(`Editing slots for location ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Deleting slots for location ID: ${id}`);
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div> {/* Black overlay ONLY on the background */}
      </div>

      {/* Fixed Navbar */}
      <AdminNavbar />

      {/* Welcome Admin text below the navbar */}
      <div className="relative pt-20 px-6 flex justify-center">
        <h1 className="text-4xl font-bold text-white text-center sm:text-left">
          🏢 Welcome Admin
        </h1>
      </div>

      {/* Location Cards Section (Responsive Grid) */}
      <div className="relative p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {locations.map((location) => (
          <LocationCard
            key={location.id}
            id={location.id}
            image={location.image}
            name={location.name}
            onEdit={() => handleEdit(location.id)}
            onDelete={() => handleDelete(location.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
