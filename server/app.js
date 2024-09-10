import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import servicesRoutes from "./routes/servicesRoutes.js";
import schedulesRoutes from "./routes/schedulesRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1/services", servicesRoutes);
app.use("/api/v1/schedules", schedulesRoutes);
app.use("/api/v1/users", userRouter);

export default app;
