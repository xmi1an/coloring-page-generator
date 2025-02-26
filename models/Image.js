import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  localPath: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  prompt: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
  }
});

export default mongoose.models.Image || mongoose.model('Image', ImageSchema);
