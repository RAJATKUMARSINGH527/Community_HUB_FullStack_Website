const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const mimeType = file.mimetype;
    const isImage = mimeType.startsWith('image'); // Checks if file is an image

    return {
        folder: 'community_posts',
        resource_type: isImage ? 'image' : 'video', // 'image' or 'video'
        format: isImage ? 'png' : 'mp4' // Convert images to PNG, videos to MP4
    };
},
});

const upload = multer({ storage });

module.exports = upload;
