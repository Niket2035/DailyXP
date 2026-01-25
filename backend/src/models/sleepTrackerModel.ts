import { Schema, model, Types } from "mongoose";

const SleepTrackerSchema = new Schema({
        hoursSlept: { type: Number, required: true },
        sleepdate: { type: Date, required: true },
   
});

export default model("SleepTracker", SleepTrackerSchema);