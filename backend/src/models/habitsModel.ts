import { Schema,model } from "mongoose";

const HabitsSchema = new Schema({
    name: { type: String, required: true },
    status:{ type: String, enum: ['completed', 'missed', 'partial'], default: 'missed' },
    date: { type: Date, required: true },
});

export default model("Habits", HabitsSchema);