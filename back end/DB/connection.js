import mongoose from "mongoose";

const connectDB = async () => {
  // return await mongoose.connect("mongodb+srv://tariq:tariq55@cluster0.yesyf.mongodb.net/saraha")
  return await mongoose
    .connect(
      "mongodb+srv://AamerGSG:AamerGSG13579@cluster0.7una7bn.mongodb.net/users",
    )
    .then((result) => {
      console.log(`connectionDB `);
    })
    .catch((err) => {
      console.log(`error to connect db`, err);
    });
};

export default connectDB;
