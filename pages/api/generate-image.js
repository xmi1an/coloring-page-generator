import { OpenAI } from "openai";
import rateLimit from 'express-rate-limit';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import dbConnect from '../../lib/dbConnect';
import Image from '../../models/Image';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests per windowMs
  message: { message: "Too many requests, please try again later." },
});

// Ensure generated-images directory exists
const imagesDir = path.join(process.cwd(), 'public', 'generated-images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

async function downloadImage(url, filename) {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  const imagePath = path.join(imagesDir, filename);
  const writer = fs.createWriteStream(imagePath);

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

export default async function handler(req, res) {
  // Apply rate limiting
  limiter(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
      await dbConnect();

      const { prompt, size = "1024x1024" } = req.body;

      if (!prompt) {
        return res.status(400).json({ message: 'Prompt is required' });
      }

      // Validate size parameter
      const validSizes = ["1024x1024", "1792x1024", "1024x1792"];
      if (!validSizes.includes(size)) {
        return res.status(400).json({ message: 'Invalid size parameter' });
      }

      const [width, height] = size.split('x').map(Number);

      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: `${width}x${height}`,
      }, {
        timeout: 90000,
      });

      const openaiUrl = response.data[0].url;

      // Generate unique filename and save image locally
      const filename = `image-${Date.now()}.png`;
      await downloadImage(openaiUrl, filename);

      // Save to database with local path
      const localPath = `/generated-images/${filename}`;
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ''; // Fallback to an empty string if not defined
      const imageUrl = `${baseUrl}${localPath}`; // Construct the full image URL
      try {
        const image = new Image({
          localPath,
          prompt: prompt, // Save the original user prompt
          imageUrl, // Save the imageUrl in the database
        });
        await image.save();
        console.log('Image saved successfully:', image);
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Continue even if DB save fails, so user still gets their image
      }

      res.status(200).json({ imageUrl: localPath });
    } catch (error) {
      console.error('Error generating image:', error);
      if (error.code === 'ECONNABORTED') {
        return res.status(504).json({ message: 'Request timed out. Please try again.' });
      }
      res.status(500).json({ message: 'Error generating image', error: error.message });
    }
  });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
