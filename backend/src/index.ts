import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to Database !"));

const app = express();
app.use(express.json());
app.use(cors());

app.get("/test", async (req, res) => {
  res.json({ message: "Hello!" });
});

app.listen(3000, () => {
  console.log("server started on localhost:3000");
});
