import express, { RequestHandler } from "express";
import { createHabit, deleteHabit, getAllHabits, updateHabit } from "../controllers/habitsController";
import { getHabitTracking, getHabitTrackingByMonth, updateHabitStatus } from "../controllers/habitsTrackingController";


const router = express.Router();
router.post("/api/habits", createHabit as unknown as RequestHandler);
router.get("/api/habits", getAllHabits as unknown as RequestHandler);
router.delete("/api/habits/:id", deleteHabit as unknown as RequestHandler);
router.put("/api/habits/:id", updateHabit as unknown as RequestHandler);

// habit tracking routes
router.post("/api/habits/tracking", updateHabitStatus as unknown as RequestHandler);
// router.get("/api/habits/tracking/:habitId", getHabitTracking as unknown as RequestHandler);
router.get("/api/habits/tracking/month", getHabitTrackingByMonth as unknown as RequestHandler);

export default router;