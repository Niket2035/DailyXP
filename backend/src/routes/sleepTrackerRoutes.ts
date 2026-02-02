import express, { RequestHandler } from "express";
import { createSleepEntry, deleteSleepEntry, getAllSleepEntries, updateSleepEntry } from "../controllers/sleepTrackerController";

const router = express.Router();
router.post("/api/sleepTrackers", createSleepEntry as unknown as RequestHandler);
router.get("/api/sleepTrackers", getAllSleepEntries as unknown as RequestHandler);
router.patch("/api/sleepTrackers/:id", updateSleepEntry as unknown as RequestHandler);
router.delete("/api/sleepTrackers/:id", deleteSleepEntry as unknown as RequestHandler);

export default router;