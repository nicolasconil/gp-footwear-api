import multer from "multer";
import path from 'path';
import fs from 'fs';

const uploadDir = path.resolve('uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
};

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    }
});

function fileFilter (req, res, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if(!allowedExtensions.includes(ext)) {
        return cb(new Error('Solo se permiten imágenes (.jpg, .jpeg, .png, .webp)'), false);
    }
    cb(null, true);
};

const upload = multer({ 
    storage, 
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});

export default upload;