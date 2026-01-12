"use client"

import { useState } from "react"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import AddHabitDialog from "./AddHabitDialog"
import HabitRow from "./HabitRow"

const weeks = [
  { label: "Week 1", days: [1, 2, 3, 4, 5, 6, 7] },
  { label: "Week 2", days: [8, 9, 10, 11, 12, 13, 14] },
  { label: "Week 3", days: [15, 16, 17, 18, 19, 20, 21] },
  { label: "Week 4", days: [22, 23, 24, 25, 26, 27, 28] },
  { label: "Week 5", days: [29, 30] },
]

const allDays = weeks.flatMap((w) => w.days)

export default function HabitGrid() {
  const [habits, setHabits] = useState<string[]>(["Wake Up Early", "Exercise", "DSA"])
  const [deleteConfirm, setDeleteConfirm] = useState<{
    open: boolean
    habit: string | null
    index: number | null
  }>({
    open: false,
    habit: null,
    index: null,
  })
  const { toast } = useToast()

  const addHabit = (title: string) => {
    setHabits((prev) => [...prev, title])
    toast({
      title: "Habit added",
      description: `"${title}" has been added to your habits.`,
    })
  }

  const handleDeleteHabit = (index: number, habit: string) => {
    setDeleteConfirm({
      open: true,
      habit,
      index,
    })
  }

  const confirmDelete = () => {
    if (deleteConfirm.index !== null) {
      const deletedHabit = habits[deleteConfirm.index]
      setHabits((prev) => prev.filter((_, i) => i !== deleteConfirm.index))
      toast({
        title: "Habit deleted",
        description: `"${deletedHabit}" has been removed.`,
      })
    }
    setDeleteConfirm({ open: false, habit: null, index: null })
  }

  return (
    <>
      <Card className="p-6 md:p-8 overflow-x-auto shadow-md border-gray-200 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">December</h1>
            <p className="text-sm md:text-base text-gray-600 mt-2">
              Track your daily habits • {habits.length} active habit{habits.length !== 1 ? "s" : ""}
            </p>
          </div>
          <AddHabitDialog onAdd={addHabit} />
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-gray-300 hover:bg-transparent">
                <TableHead rowSpan={2} className="min-w-[220px] text-lg font-bold text-gray-900">
                  My Habits
                </TableHead>
                {weeks.map((w) => (
                  <TableHead
                    key={w.label}
                    colSpan={w.days.length}
                    className="text-center text-sm font-semibold text-gray-700"
                  >
                    {w.label}
                  </TableHead>
                ))}
              </TableRow>

              <TableRow className="border-b-2 border-gray-300 hover:bg-transparent">
                {allDays.map((d) => (
                  <TableHead key={d} className="text-center min-w-[40px] text-xs font-medium text-gray-600">
                    {d}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {habits.map((h, i) => (
                <HabitRow key={i} habit={h} days={allDays} onDelete={() => handleDeleteHabit(i, h)} />
              ))}
            </TableBody>
          </Table>
        </div>

        {habits.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No habits yet. Add one to get started!</p>
          </div>
        )}
      </Card>

      <AlertDialog
        open={deleteConfirm.open}
        onOpenChange={(open) => {
          if (!open) setDeleteConfirm({ open: false, habit: null, index: null })
        }}
      >
        <AlertDialogContent className="bg-white border-gray-200">
          <AlertDialogTitle className="text-gray-900">Delete habit?</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600">
            Are you sure you want to delete "{deleteConfirm.habit}"? This action cannot be undone.
          </AlertDialogDescription>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel className="border-gray-200 text-gray-900">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
