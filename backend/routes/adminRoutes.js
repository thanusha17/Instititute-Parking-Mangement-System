import express from "express";
import {addLocation, editLocation, fetchAllLocations, getSlots, handleImageUpload} from "../controllers/admin/admin-controller.js"
const router=express.Router();
import {upload}  from "../helpers/cloudinary.js"

router.post('/upload-image',upload.single("imageFile"),handleImageUpload);
router.post('/addlocation',addLocation);
router.put('/edit/:location_id',editLocation);
router.get('/getSlots',getSlots);
router.get('/get',fetchAllLocations);



export default router;