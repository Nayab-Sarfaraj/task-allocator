import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("SUCCESSFULLY CONNECTED TO THE DATABASE");
  } catch (error) {
    console.log("ERROR CONNECTING TO THE DATABASE");
    throw new Error(error);
  }
};
export default connectToDB;
