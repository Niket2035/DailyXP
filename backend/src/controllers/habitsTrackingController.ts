import { Request, Response } from "express";
import habitsTrackingModel from "../models/habitsTrackingModel";

export const updateHabitStatus = async (req: Request, res: Response) => {
  try {
    const { habitId, date, status } = req.body;
    const updated = await habitsTrackingModel.findOneAndUpdate(
      { habitId, date },
      { status },
      { upsert: true, new: true },
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getHabitTracking = async (req: Request, res: Response) => {
  try {
    const { habitId } = req.params;
    const tracking = await habitsTrackingModel.find({ habitId });
    res.status(200).json(tracking);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

