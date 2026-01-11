"use client";

import { useState } from "react";

export default function HabitRow({
  habit,
  days,
}: {
  habit: string;
  days: number[];
}) {
  const [state, setState] = useState<Record<number, number>>({});

  // 0 = empty, 1 = done, 2 = partial
  const toggle = (day: number) => {
    setState((prev) => ({
      ...prev,
      [day]: ((prev[day] || 0) + 1) % 3,
    }));
  };

  return (
    <tr>
      <td className="border p-2 font-medium">{habit}</td>
      {days.map((d) => {
        const v = state[d] || 0;
        return (
          <td
            key={d}
            className="border p-2 text-center cursor-pointer"
            onClick={() => toggle(d)}
          >
            {v === 0 && "⬜"}
            {v === 1 && "✅"}
            {v === 2 && "⚠️"}
          </td>
        );
      })}
    </tr>
  );
}
