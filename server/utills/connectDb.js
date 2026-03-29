import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('DB connected')
    } catch (err) {
        console.error('DB connection error:', err)
        process.exit(1)
    }
}

export default connectDb