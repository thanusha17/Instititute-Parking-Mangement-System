import db from "../../config/db.js";
import { imageUploadUtil } from "../../helpers/cloudinary.js";



export const handleImageUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = `data:${req.file.mimetype};base64,${b64}`;
        const result = await imageUploadUtil(url);

        res.json({
            success: true,
            result,
        });
    } catch (err) {
        console.error("Image upload error:", err);
        res.status(500).json({
            success: false,
            message: "Error occurred while uploading the image",
        });
    }
};




export const addLocation = async (req, res) => {
    const { location_name, image_url, two_wheeler_slots, four_wheeler_slots, bus_parking_slots } = req.body;

    if (!location_name || two_wheeler_slots < 0 || four_wheeler_slots < 0 || bus_parking_slots < 0) {
        return res.status(400).json({ message: "Invalid input data" });
    }

    try {
        const connection = db.promise();

        await connection.query("START TRANSACTION");

        const [locationResult] = await connection.query(
            `INSERT INTO Locations (location_name, image_url, two_wheeler_slots, four_wheeler_slots, bus_parking_slots) 
            VALUES (?, ?, ?, ?, ?)`,
            [location_name, image_url, two_wheeler_slots, four_wheeler_slots, bus_parking_slots]
        );

        const location_id = locationResult.insertId;

        let slotInserts = [];

        for (let i = 0; i < two_wheeler_slots; i++) {
            slotInserts.push([location_id, 'two-wheeler']);
        }
        for (let i = 0; i < four_wheeler_slots; i++) {
            slotInserts.push([location_id, 'four-wheeler']);
        }
        for (let i = 0; i < bus_parking_slots; i++) {
            slotInserts.push([location_id, 'bus']);
        }

        if (slotInserts.length > 0) {
            await connection.query(
                `INSERT INTO ParkingSlots (location_id, vehicle_type) VALUES ?`,
                [slotInserts]
            );
        }

        await connection.query("COMMIT");  // Commit transaction

        res.status(201).json({ message: "Location and slots added successfully", location_id });

    } catch (error) {
        await db.promise().query("ROLLBACK");  // Rollback in case of error
        res.status(500).json({ message: "Error adding location", error: error.message });
    }
};


export const editLocation = async (req, res) => {
    const { location_id } = req.params;
    const { vehicle_type } = req.body;
    console.log(location_id);
    console.log(req.params);
    if (!location_id || !vehicle_type) {
        return res.status(400).json({ message: "Invalid input data" });
    }

    try {
        const connection = db.promise();

        // Check if location_id exists
        const [rows] = await connection.query(
            "SELECT location_id FROM Locations WHERE location_id = ?",
            [location_id]
        );

        if (rows.length === 0) {
            return res.status(400).json({ message: "Invalid location_id" });
        }

        // Insert new parking slot
        await connection.query(
            `INSERT INTO ParkingSlots (location_id, vehicle_type, is_empty, permanently_reserved) 
             VALUES (?, ?, ?, ?)`,
            [location_id, vehicle_type, true, false]
        );

        res.status(201).json({ message: "Parking slot added successfully" });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};



export const getSlots = async (req, res) => {
    const { location_id } = req.params;

    if (!location_id) {
        return res.status(400).json({ message: "Invalid input data" });
    }

    try {
        const connection = db.promise();

        // Check if location_id exists in Locations table
        const [rows] = await connection.query(
            "SELECT location_id FROM Locations WHERE location_id = ?",
            [location_id]
        );

        if (rows.length === 0) {
            return res.status(400).json({ message: "Invalid location_id" });
        }

        // Fetch parking slots for the given location_id
        const [slots] = await connection.query(
            "SELECT * FROM ParkingSlots WHERE location_id = ?",
            [location_id]
        );

        res.status(200).json({ slots }); // Send response back to client

    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};
