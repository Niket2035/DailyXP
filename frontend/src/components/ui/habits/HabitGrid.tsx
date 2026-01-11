"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import AddHabitDialog from "./AddHabitDialog";
import HabitRow from "./HabitRow";


const days = Array.from({ length: 30 }, (_, i) => i + 1);

export default function HabitGrid() {
  const [habits, setHabits] = useState<string[]>(["Study", "Exercise", "DSA"]);

  const addHabit = (title: string) => {
    setHabits((prev) => [...prev, title]);
  };

  return (
    <div className="border rounded-xl p-4 overflow-x-auto">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">30 Day Tracker</h2>
        <AddHabitDialog onAdd={addHabit} />
      </div>

      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th className="border p-2 text-left">Habit</th>
            {days.map((d) => (
              <th key={d} className="border p-2 text-center text-xs">
                {d}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {habits.map((habit, idx) => (
            <HabitRow key={idx} habit={habit} days={days} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
