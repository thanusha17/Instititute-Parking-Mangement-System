import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bike } from "lucide-react";



import backgroundImage from "../assets/cc3.png";

const dummyLocation = {
  id: 1,
  name: "CC3",
  slots: {
    twoWheeler: [{ occupied: true }, { occupied: false }, { occupied: true }, { occupied: false }, { occupied: true },{ occupied: true }, { occupied: false }, { occupied: true }, { occupied: false },],
    fourWheeler: [{ occupied: false }, { occupied: true }, { occupied: true }, { occupied: false },{ occupied: true }, { occupied: true }, { occupied: true }, { occupied: false },{ occupied: false }, { occupied: true }, { occupied: true }, { occupied: false },{ occupied: false }, { occupied: true }, { occupied: true },],
    bus: [{ occupied: false }, { occupied: false }, { occupied: true }, { occupied: false }, { occupied: true }],
  },
};

const dummyVehicles = {
  1: { vehicle_number: "UP32AB1234", vehicle_type: "Car", user_id: 101 },
  2: { vehicle_number: "DL8CAF7654", vehicle_type: "Bike", user_id: 102 },
};

const dummyBookings = {
  1: {
    vehicle_id: 1,
    slot_id: "fourWheeler-1",
    booking_time: "2025-04-02T09:00",
    end_time: "2025-04-02T12:00",
    status: "Active",
    released: false,
  },
  2: {
    vehicle_id: 2,
    slot_id: "twoWheeler-0",
    booking_time: "2025-04-02T08:30",
    end_time: "2025-04-02T11:30",
    status: "Active",
    released: false,
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

  const [vehicles, setVehicles] = useState({});
const [bookings, setBookings] = useState({});
const [showModal, setShowModal] = useState(false);
const [modalData, setModalData] = useState(null);

useEffect(() => {
  setTimeout(() => {
    setLocation(dummyLocation);
    setVehicles(dummyVehicles);
    setBookings(dummyBookings);
  }, 500);
}, [id]);



const reserveSlot = (slotType, index) => {
  const vehicleNumber = document.getElementById("vehicleNumber").value;
  const vehicleType = document.getElementById("vehicleType").value;

  const newVehicleId = Object.keys(vehicles).length + 1;
  const newBookingId = Object.keys(bookings).length + 1;

  const updatedVehicles = {
    ...vehicles,
    [newVehicleId]: {
      vehicle_number: vehicleNumber,
      vehicle_type: vehicleType,
      user_id: 999, // dummy user
    },
  };

  const updatedBookings = {
    ...bookings,
    [newBookingId]: {
      vehicle_id: newVehicleId,
      slot_id: `${slotType}-${index}`,
      booking_time: new Date().toISOString(),
      end_time: "",
      released: false,
      status: "Active",
      user_id: 999,
    },
  };

  const updatedLocation = { ...location };
  updatedLocation.slots[slotType][index].occupied = true;

  setVehicles(updatedVehicles);
  setBookings(updatedBookings);
  setLocation(updatedLocation);
  toast.success("Slot reserved!");
  setShowModal(false);
};

const releaseSlot = (slotType, index) => {
  const slotKey = `${slotType}-${index}`;
  const updatedLocation = { ...location };
  updatedLocation.slots[slotType][index].occupied = false;

  const updatedBookings = { ...bookings };
  const bookingEntry = Object.entries(bookings).find(
    ([_, b]) => b.slot_id === slotKey && !b.released
  );
  if (bookingEntry) {
    updatedBookings[bookingEntry[0]].released = true;
    updatedBookings[bookingEntry[0]].status = "Completed";
    updatedBookings[bookingEntry[0]].end_time = new Date().toISOString();
  }

  setLocation(updatedLocation);
  setBookings(updatedBookings);
  toast.success("Vehicle released!");
  setShowModal(false);
};


const handleSlotClick = (slotType, index) => {
  const slotKey = `${slotType}-${index}`;
  const booking = Object.values(bookings).find(b => b.slot_id === slotKey && !b.released);

  if (booking) {
    const vehicle = vehicles[booking.vehicle_id];
    setModalData({
      type: "occupied",
      slotType,
      index,
      vehicle,
      booking,
    });
  } else {
    setModalData({
      type: "unoccupied",
      slotType,
      index,
    });
  }
  setShowModal(true);
};




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
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <AdminNavbar />
      
      <div className="relative z-10 flex flex-col items-center w-full px-4 py-14">
        
        
        <h1 className="text-4xl font-bold mt-10 mb-14 text-black">{location.name} - Parking Slots</h1>


        
        
        {/* Parking Layout */}
        <div className="w-full max-w-6xl bg-gray-900 p-8 rounded-lg shadow-xl grid flex justify-center">
          <div className="grid grid-cols-3 gap-12 flex justify-center ">
            {/* Two-Wheeler Section (Left) */}
            <div className="flex flex-col items-center text-center">
              <h2 className="text-xl font-semibold mb-4 text-white">🛵
              2-Wheeler</h2>
              <div className="grid grid-cols-5 gap-3">
                {location.slots.twoWheeler.map((slot, index) => (
                  <div
                    key={index}
                    onClick={() => handleSlotClick("twoWheeler", index)}
                    className={`w-9 h-14 flex items-center justify-center rounded-md text-xs font-bold text-white shadow-md transition-all cursor-pointer ${
                      slot.occupied ? "bg-red-300 hover:bg-red-400" : "bg-green-600 hover:bg-green-400"
                    }`}
                  >
                    {slot.occupied ? "O" : "UO"}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Four-Wheeler Section (Right) */}
            <div className="flex flex-col items-center text-center mr-5">
              <h2 className="text-xl font-semibold mb-4 text-white">🚗 4-Wheeler</h2>
              <div className="grid grid-cols-4 gap-3">
                {location.slots.fourWheeler.map((slot, index) => (

                  
                  <div
                    key={index}
                    onClick={() => handleSlotClick("fourWheeler", index)}
                    className={`w-12 h-[65px] flex items-center justify-center rounded-md text-sm font-bold text-white shadow-md transition-all cursor-pointer ${
                      slot.occupied ? "bg-red-300 hover:bg-red-400" : "bg-green-600 hover:bg-green-400"
                    }`}
                  >
                    {slot.occupied ? "O" : "UO"}
                  </div>

                  
                ))}
              </div>
            </div>


            {/* Bus Section (Bottom) */}

            <div className="flex flex-col items-center text-center">
            <h2 className="text-xl font-semibold mb-4 text-white">🚌 Bus</h2>
            <div className="grid grid-cols-3 gap-3">
              {location.slots.bus.map((slot, index) => (
                <div
                  key={index}
                  onClick={() => handleSlotClick("bus", index)}
                  className={`w-20 h-[115px] flex items-center justify-center rounded-md text-lg font-bold text-white shadow-md transition-all cursor-pointer ${
                    slot.occupied ? "bg-red-300 hover:bg-red-400" : "bg-green-600 hover:bg-green-400"
                  }`}
                >
                 {slot.occupied ? "O" : "UO"}
                </div>
              ))}
            </div>
          </div>
          
          
         
          </div>
        </div>
      </div>








      {showModal && modalData && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-6 w-[350px] text-black space-y-4">
      {modalData.type === "occupied" ? (
        <>
         <div className="flex items-center justify-between">
  <h2 className="text-xl font-bold">Vehicle Details</h2>
  <button
  className="ml-auto bg-gray-200 text-gray-700 text-xl rounded-md w-8 h-8 flex items-center justify-center"
  onClick={() => setShowModal(false)}
>
  X
</button>
</div>

          <p><strong>Number:</strong> {modalData.vehicle.vehicle_number}</p>
          <p><strong>Type:</strong> {modalData.vehicle.vehicle_type}</p>
          <p><strong>Booking Time:</strong> {modalData.booking.booking_time}</p>
          <p><strong>End Time:</strong> {modalData.booking.end_time}</p>
          <button
            onClick={() => releaseSlot(modalData.slotType, modalData.index)}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Release
          </button>
        </>
      ) : (
        <>
           <div className="flex items-center justify-between">
  <h2 className="text-xl font-bold">Vehicle Details</h2>
  <button
  className="ml-auto bg-gray-200 text-gray-700 text-xl rounded-md w-8 h-8 flex items-center justify-center"
  onClick={() => setShowModal(false)}
>
  X
</button>
</div>
          <input
            type="text"
            placeholder="Vehicle Number"
            className="w-full border px-2 py-1 rounded"
            id="vehicleNumber"
          />
          <select id="vehicleType" className="w-full border px-2 py-1 rounded">
            <option value="Car">{modalData.slotType}</option>
            <option value="Bike">Bike</option>
            <option value="Bike">Bus</option>
            <option value="Other">Other</option>
          </select>
          <button
            onClick={() => reserveSlot(modalData.slotType, modalData.index)}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Reserve
          </button>
        </>
      )}
      
    </div>
  </div>
)}







    </div>
  );
};

export default LocationDetails;