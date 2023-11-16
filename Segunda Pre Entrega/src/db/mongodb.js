import mongoose from "mongoose";

export const URI =
  "mongodb+srv://marcosdarri:md11596303@cluster0.jqjclxu.mongodb.net/ecommerce";

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
