import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import cookieParser from "cookie-parser";
import carsRouter from "./routes/cars-routes";
import userRouter from "./routes/user-routes";


const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.MONGO_USERNAME +
      ":" +
      process.env.MONGO_PASSWORD +
      "@" +
      process.env.MONGO_CLUSTER +
      "/?retryWrites=true&w=majority&appName=CarsCluster"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((error: Error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/cars", carsRouter);
app.use("/user", userRouter);

//running the server
app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
