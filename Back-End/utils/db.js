import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Add connection options for better stability
        const options = {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };
        
        await mongoose.connect(process.env.MONGO_URI, options);
        console.log("mongodb connect successfully");
        
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        // Don't exit process, let server continue
        console.log("Server will continue without database connection");
    }
}
export default connectDB;