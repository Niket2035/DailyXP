import express from "express";
import cors from "cors";
import sleepTrackerRoutes from "./routes/sleepTrackerRoutes";

const app = express();


app.use(cors());
app.use(express.json());

app.use(sleepTrackerRoutes);


export default app;