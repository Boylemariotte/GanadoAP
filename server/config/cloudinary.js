const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

if (process.env.CLOUDINARY_URL) {
    const url = process.env.CLOUDINARY_URL;
    // Format: cloudinary://api_key:api_secret@cloud_name
    const match = url.match(/cloudinary:\/\/([0-9]+):([^@]+)@(.+)/);

    if (match) {
        cloudinary.config({
            api_key: match[1],
            api_secret: match[2],
            cloud_name: match[3]
        });
        console.log('Cloudinary configurado manualmente desde URL');
    } else {
        cloudinary.config(); // Intento estándar
        console.log('Formato de CLOUDINARY_URL no reconocido, usando configuración estándar');
    }
} else {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
}

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'ganado-ap',
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp', 'mp4', 'webm'],
        resource_type: 'auto' // Permite subir tanto imágenes como videos
    },
});

const upload = multer({ storage: storage });

module.exports = { upload, cloudinary };
