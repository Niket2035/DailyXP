import express, { RequestHandler } from "express";
import { createSleepEntry, getAllSleepEntries } from "../controllers/sleepTrackerController";

const router = express.Router();
router.post("/api/sleep-tracker", createSleepEntry as unknown as RequestHandler);
router.get("/api/getAllEntries", getAllSleepEntries as unknown as RequestHandler);

export default router;