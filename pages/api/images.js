import dbConnect from '../../lib/dbConnect';
import Image from '../../models/Image';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const images = await Image
        .find({})
        .sort({ timestamp: -1 })
        .limit(30);

      res.status(200).json(images);
    } catch (error) {
      console.error('Error fetching images:', error);
      res.status(500).json({ error: 'Error fetching images' });
    }
  }
  else if (req.method === 'POST') {
    try {
      const { localPath, prompt } = req.body;

      const image = new Image({
        localPath,
        prompt,
        timestamp: new Date()
      });

      await image.save();
      res.status(201).json(image);
    } catch (error) {
      console.error('Error saving image:', error);
      res.status(500).json({ error: 'Error saving image' });
    }
  }
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
