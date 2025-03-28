import cloudinary from "cloudinary";
import multer from "multer";

cloudinary.v2.config({
    cloud_name: "dqozeueg1",
    api_key: "839471131315843",
    api_secret: "BbntLPqm24Zs2XGUh-ALvb7P0ow",
});

const storage = new multer.memoryStorage();
const upload = multer({ storage });

async function imageUploadUtil(file) {
    const result = await cloudinary.v2.uploader.upload(file, {
        resource_type: "auto",
    });
    return result;
}

export { upload, imageUploadUtil };
