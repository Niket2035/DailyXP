import { Request, Response } from "express";
import SleepTracker from "../models/sleepTrackerModel";

export const createSleepEntry = async (req: Request, res: Response) => {
  try {
    const { hoursSlept, sleepdate, averageSleepHours, daysTracked } = req.body;

    const newEntery = new SleepTracker({
      hoursSlept,
      sleepdate,
    });
    await newEntery.save();
    res.status(201).json(newEntery);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAllSleepEntries = async (req: Request, res: Response) => {
  try {
    const sleepEntries = await SleepTracker.find();
    res.status(200).json(sleepEntries);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
