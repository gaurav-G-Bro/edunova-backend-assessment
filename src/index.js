import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { CONNECT_DB } from "./db/mongo.connection.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
dotenv.config();
CONNECT_DB();

// import routes
import bookRoute from "./routes/book.route.js";
import transactionRoute from "./routes/transaction.route.js";
import userRoute from "./routes/user.route.js";

//routes defined
app.use("/api/v1/books", bookRoute);
app.use("/api/v1/transactions", transactionRoute);
app.use("/api/v1/users", userRoute);

app.listen(process.env.PORT, (err) => {
  if (err) throw err;
  console.log(`server is running on port ${process.env.PORT}`);
});
