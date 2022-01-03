import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.CN_NAME,
    api_key: process.env.CN_KEY,
    api_secret: process.env.CN_SECRET,
});

export default cloudinary.v2;
