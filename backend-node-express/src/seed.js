// import mongoose from 'mongoose';
import GraphData from './models/dataModel.js';
import connectDB from './config/db.js';
import sampleData from "./data.js";
import dotenv from 'dotenv';

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await GraphData.deleteMany();

    // Insert sample data
    await GraphData.insertMany(sampleData);
    console.log('Data seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDatabase();