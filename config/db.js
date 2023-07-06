import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://swa:swa231298@cluster1.yksmcvm.mongodb.net', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1); 
  }
};

export default connectDB;
