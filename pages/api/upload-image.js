import { v2 as cloudinary } from 'cloudinary';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Disable the default body parser to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Parse the incoming form data using formidable
    const form = new IncomingForm({
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
      uploadDir: os.tmpdir(),
    });

    const [fields, files] = await form.parse(req);
    const file = files.image?.[0];

    if (!file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        file.filepath,
        {
          folder: 'portfolio',
          resource_type: 'auto',
        },
        (error, result) => {
          // Clean up temporary file
          if (fs.existsSync(file.filepath)) {
            fs.unlinkSync(file.filepath);
          }
          
          if (error) reject(error);
          else resolve(result);
        }
      );
    });

    // Return the Cloudinary URL
    return res.status(200).json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({
      message: 'Failed to upload image',
      error: error.message,
    });
  }
}

