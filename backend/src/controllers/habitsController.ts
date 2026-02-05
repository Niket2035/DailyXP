import { Request, Response } from "express";
import Habits from "../models/habitsModel";

export const createHabit = async (req: Request, res: Response) => {
  try {
    const { name, status, date } = req.body;
    const newHabit = new Habits({
      name,
      status,
      date,
    });
    await newHabit.save();
    res.status(201).json(newHabit);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAllHabits = async (req: Request, res: Response) => {
  try {
    const habits = await Habits.find();
    res.status(200).json(habits);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteHabit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Habits.findByIdAndDelete(id);
    res.status(200).json({ message: "Habit deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateHabit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, status, date } = req.body;
    const updateHabit = await Habits.findByIdAndUpdate(
      id,
      { name, status, date },
      { new: true },
    );
    res.status(200).json(updateHabit);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
