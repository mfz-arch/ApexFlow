import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'sjjuhyrg',
  api_key: process.env.CLOUDINARY_API_KEY || '935594826276186',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'fTa9rz6U_KznwY9pU_1mcCclJ1A',
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'apexflow/avatars',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    public_id: `avatar_${Date.now()}_${file.originalname.replace(/[^a-zA-Z0-9]/g, '')}`,
  }),
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export { cloudinary };
