// db.js
const mongoose = require('mongoose');
const { Logger } = require('../utils');

import { DB_URI, DATABASE_NAME } from '../config'

// This function will be called explicitly to connect to the database
export const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      dbName: DATABASE_NAME,
    });
    Logger.success('Connected to MongoDB');
  } catch (error) {
    Logger.error('MongoDB connection error:', error);
  }
}

mongoose.connection.on('disconnected', () => {
  Logger.info('Disconnected from MongoDB');
});
