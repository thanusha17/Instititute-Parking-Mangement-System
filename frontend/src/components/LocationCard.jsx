const LocationCard = ({ image, name, onEdit, onDelete }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 w-64 h-64 flex flex-col items-center justify-between">
        {/* Location Image */}
        <img src={image} alt={name} className="w-full h-36 object-cover rounded-lg" />
  
        {/* Location Name */}
        <h2 className="text-lg font-semibold mt-2">{name}</h2>
  
        {/* Action Buttons */}
        <div className="flex gap-2 mt-2">
          <button
            onClick={onEdit}
            className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
          >
            Edit Slots
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
          >
            Delete Slots
          </button>
        </div>
      </div>
    );
  };
  
  export default LocationCard;
  