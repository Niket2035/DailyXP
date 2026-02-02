import express, { RequestHandler } from "express";
import { createHabit, getAllHabits } from "../controllers/habitsController";


const router = express.Router();
router.post("/api/habits", createHabit as unknown as RequestHandler);
router.get("/api/habits", getAllHabits as unknown as RequestHandler);
export default router;