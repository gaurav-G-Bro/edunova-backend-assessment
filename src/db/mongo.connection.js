import mongoose from "mongoose";
import { DB_NAME } from "../constants/constant.js";

const CONNECT_DB = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      "database connected successfully on host: ",
      connection.connection.host
    );
  } catch (error) {
    if (error) throw new ApiError(500, "mongodb connection failed");
  }
};

export { CONNECT_DB };
