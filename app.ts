import express from "express";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/UserRoute";

const app = express();

app.use(express.json());

app.use("/api/v1", userRouter);

const PORT: string = process.env.PORT || "3000";
app.listen(PORT, () => {
  console.log(`Server is listening to PORT ${process.env.PORT}`);
});
