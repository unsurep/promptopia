import mongoose from "mongoose";

// Tracking the connection to the database
let isConnected = false;

export const dbConnect = async () => {
     // Set to true to avoid mongoose timeout error
    mongoose.set('strictQuery', true);

    // If DB is already connected
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }



    try {
        
         // Connect to the database
        await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });

       // If everything executes correctly
        isConnected = true;
        console.log('MongoDB connected');
        
    } catch (error) {
        console.error('MongoDB connection error:', error);
        
    }
    
}