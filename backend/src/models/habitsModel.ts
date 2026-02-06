import { Schema,model } from "mongoose";

const HabitsSchema = new Schema({
    name: { type: String, required: true },
});

export default model("Habits", HabitsSchema);