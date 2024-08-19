import mongoose from 'mongoose';

const connectMongo = async () => {
  // Check if already connected
  if (mongoose.connections[0].readyState) {
    return; // Use the existing connection
  }

  const dbUri = process.env.MONGODB_URI;
  if (!dbUri) {
    throw new Error('MONGODB_URI is not defined');
  }

  try {
    console.log('MongoDB connecting');
    await mongoose.connect(dbUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.log('could not connect')
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

export default connectMongo;
