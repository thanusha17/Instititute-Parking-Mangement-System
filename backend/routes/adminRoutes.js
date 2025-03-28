import express from "express";
import {addLocation, editLocation, getSlots, handleImageUpload} from "../controllers/admin/admin-controller.js"
const router=express.Router();
import {upload}  from "../helpers/cloudinary.js"

router.post('/upload-image',upload.single("imageFile"),handleImageUpload);
router.post('/addlocation',addLocation);
router.put('/edit/:location_id',editLocation);
router.get('/getSlots',getSlots);
export default router;