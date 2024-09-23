// models/Portfolio.ts
import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
export default Portfolio;