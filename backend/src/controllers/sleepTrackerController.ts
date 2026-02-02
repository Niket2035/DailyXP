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

export const updateSleepEntry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { hoursSlept, sleepdate } = req.body;
    const updateSleepEntry = await SleepTracker.findByIdAndUpdate(
      id,
      { hoursSlept, sleepdate },
      { new: true },
    );
    res.status(200).json(updateSleepEntry);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteSleepEntry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await SleepTracker.findByIdAndDelete(id);
    res.status(200).json({ message: "Sleep entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
