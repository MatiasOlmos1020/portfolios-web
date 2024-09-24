// models/Image.ts
import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
});

const Image = mongoose.model('Image', imageSchema);
export default Image;