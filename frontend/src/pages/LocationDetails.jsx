import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import backgroundImage from "../assets/cc3.png";

const dummyLocation = {
  id: 1,
  name: "CC3",
  slots: {
    twoWheeler: [{ occupied: true }, { occupied: false }, { occupied: true }],
    fourWheeler: [{ occupied: false }, { occupied: true }, { occupied: true }],
    bus: [{ occupied: false }, { occupied: false }],
  },
};

const LocationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setLocation(dummyLocation);
    }, 500);
  }, [id]);

  const handleReleaseVehicle = (slotType, index) => {
    const updatedSlots = { ...location.slots };
    updatedSlots[slotType][index].occupied = false;

    setLocation((prev) => ({
      ...prev,
      slots: updatedSlots,
    }));

    toast.success("🚗 Vehicle released successfully!");
  };

  if (!location) {
    return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content Wrapper (Ensures Everything Appears on Top) */}
      <div className="relative z-10 flex flex-col items-center w-full px-4 py-10">
        {/* Back Button */}
        <button
          onClick={() => navigate("/home")}
          className="absolute top-5 left-5 px-4 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-600 transition-all z-20"
        >
          🔙 Back
        </button>

        {/* Location Header */}
        <h1 className="text-3xl font-bold mt-16 mb-6 text-white">{location.name}</h1>

        {/* Slots Section */}
        <div className="w-full max-w-3xl space-y-8">
          {["twoWheeler", "fourWheeler", "bus"].map((slotType) => (
            <div key={slotType} className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
              <h2 className="text-2xl font-semibold mb-4">
                {slotType === "twoWheeler" ? "🛵 2-Wheeler Slots" : slotType === "fourWheeler" ? "🚗 4-Wheeler Slots" : "🚌 Bus Slots"}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {location.slots[slotType].map((slot, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg text-center font-semibold ${
                      slot.occupied ? "bg-red-500" : "bg-green-500"
                    } text-white shadow-md`}
                  >
                    {slot.occupied ? "Occupied" : "Empty"}
                    {slot.occupied && (
                      <button
                        onClick={() => handleReleaseVehicle(slotType, index)}
                        className="block mt-2 px-3 py-1 bg-white text-gray-900 rounded-lg text-sm font-semibold hover:bg-gray-300"
                      >
                        Release Vehicle
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationDetails;
