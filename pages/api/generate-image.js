import { OpenAI } from "openai";
import rateLimit from 'express-rate-limit';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests per windowMs
  message: { message: "Too many requests, please try again later." },
});

export default async function handler(req, res) {
  // Apply rate limiting
  limiter(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
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
        timeout: 90000, // Set timeout to 30 seconds
      });

      const imageUrl = response.data[0].url;
      res.status(200).json({ imageUrl });
    } catch (error) {
      console.error('Error generating image:', error);
      if (error.code === 'ECONNABORTED') {
        return res.status(504).json({ message: 'Request timed out. Please try again.' });
      }
      res.status(500).json({ message: 'Error generating image', error: error.message });
    }
  });
}
