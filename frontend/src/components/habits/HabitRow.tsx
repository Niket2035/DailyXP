"use client"

import { useState } from "react"
import { TableCell, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

export default function HabitRow({
  habit,
  days,
  onDelete,
}: {
  habit: string
  days: number[]
  onDelete: () => void
}) {
  const [state, setState] = useState<Record<number, number>>({})
  const [isHovering, setIsHovering] = useState(false)

  // 0 = empty, 1 = done, 2 = partial
  const toggle = (day: number) => {
    setState((prev) => ({
      ...prev,
      [day]: ((prev[day] || 0) + 1) % 3,
    }))
  }

  return (
    <TableRow
      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Habit name with delete button */}
      <TableCell className="font-semibold min-w-[220px] border-r border-gray-200 relative pr-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-gray-900">{habit}</span>

          {isHovering && (
            <button
              onClick={onDelete}
              className="p-1 hover:bg-red-50 rounded transition-colors flex-shrink-0"
              aria-label={`Delete ${habit}`}
              title="Delete habit"
            >
              <X className="w-4 h-4 text-red-600" />
            </button>
          )}
        </div>
      </TableCell>

      {days.map((d, idx) => {
        const v = state[d] || 0

        // Week separator after days 7,14,21,28,30
        const isWeekEnd = [7, 14, 21, 28, 30].includes(d)

        return (
          <TableCell key={d} className={cn("text-center py-3", isWeekEnd && "border-r border-gray-300")}>
            <button
              onClick={() => toggle(d)}
              className={cn(
                "w-7 h-7 rounded-md border-2 transition-all hover:scale-110 mx-auto",
                v === 0 && "bg-gray-100 border-gray-300 hover:bg-gray-200",
                v === 1 && "bg-emerald-500 border-emerald-600 shadow-md",
                v === 2 && "bg-amber-400 border-amber-500 shadow-md",
              )}
              title={`Day ${d}: ${v === 0 ? "Empty" : v === 1 ? "Done" : "Partial"}`}
            />
          </TableCell>
        )
      })}
    </TableRow>
  )
}
