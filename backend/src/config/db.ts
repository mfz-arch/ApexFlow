import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb+srv://aimfizahmed:ZALIFABENSAID@cluster0.ojtabpp.mongodb.net/ApexFlow?appName=Cluster0';
    const conn = await mongoose.connect(connStr);
    console.log(`[MongoDB Atlas] Connected successfully: ${conn.connection.host} / DB: ${conn.connection.name}`);
  } catch (error) {
    console.error('[MongoDB Atlas Connection Error]:', error);
    process.exit(1);
  }
};
