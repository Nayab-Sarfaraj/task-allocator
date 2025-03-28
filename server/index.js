import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectToDB from "./db/connection.js";
import errorHandler from "./middleware/error.js";
import taskRoutes from "./routes/task.routes.js";
import userRoutes from "./routes/user.routes.js";
dotenv.config();
const app = express();
connectToDB();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use("/api/v1", userRoutes);
app.use("/api/v1/task", taskRoutes);
app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`));
