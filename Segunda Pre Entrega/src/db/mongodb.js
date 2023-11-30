import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const URI = process.env.ECOMMERCE_URL;

export const init = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Database conected 🚀");
  } catch (error) {
    console.log(
      "Ah ocurrido un error al intentar conectarnos a la DB",
      error.message
    );
  }
};
