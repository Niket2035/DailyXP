"use client";

import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";


export default function HabitRow({
  habit,
  days,
  today,
  checked,
  onToggle,
  onDelete,
}: {
  habit: string;
  days: Array<{ day: number; dayName: string; isToday: boolean }>;
  today: number;
  checked: Record<number, boolean>;
  onToggle: (day: number) => void;
  onDelete: () => void;
}) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <>
    <TableRow
      className="border-b hover:bg-gray-50"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >

      <TableCell className="font-semibold min-w-[220px] border-r pr-2">
        <div className="flex justify-between items-center">
          <span>{habit}</span>
          {isHovering && (
            <button onClick={onDelete} className="p-1 hover:bg-red-50 rounded">
              <X className="w-4 h-4 text-red-600" />
            </button>
          )}
        </div>
      </TableCell>

      {days.map((d) => {
        const isToday = d.day === today;
        const isChecked = checked[d.day] || false;
        const isDisabled = !isToday;
        return (
          <TableCell
            key={d.day}
            className={cn("text-center", isToday && "bg-blue-50")}
          >
            <button
              disabled={isDisabled}
              onClick={() => onToggle(d.day)}
              className={cn(
                "w-7 h-7 rounded-md border-2 transition",
                isDisabled && "opacity-40 cursor-not-allowed",
                !isDisabled && "hover:scale-110",
                isChecked
                  ? "bg-emerald-500 border-emerald-600"
                  : "bg-gray-100 border-gray-300",
                isToday && !isChecked && "border-blue-400"
              )}
            />
          </TableCell>
        );
      })}
    </TableRow>
 </>
  );
}
