import express from "express";
import cors from "cors";
import sleepTrackerRoutes from "./routes/sleepTrackerRoutes";
import habitsRoutes from "./routes/habitsRoutes";

const app = express();


app.use(cors());
app.use(express.json());

app.use(sleepTrackerRoutes);
app.use(habitsRoutes)


export default app;