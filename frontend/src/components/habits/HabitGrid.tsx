"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import AddHabitDialog from "./AddHabitDialog";
import HabitRow from "./HabitRow";

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getMonthDaysAndWeeks = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const allDays: Array<{ day: number; dayName: string; isToday: boolean }> = [];

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    const dayOfWeek = date.getDay();
    allDays.push({
      day: i,
      dayName: dayNames[dayOfWeek],
      isToday: i === today,
    });
  }

  const weeks: Array<{ label: string; days: typeof allDays }> = [];
  for (let i = 0; i < allDays.length; i += 7) {
    const weekNumber = Math.floor(i / 7) + 1;
    weeks.push({
      label: `Week ${weekNumber}`,
      days: allDays.slice(i, i + 7),
    });
  }

  return { allDays, weeks, today, month, year };
};

export default function HabitGrid() {
  const { allDays, weeks, today, month, year } = getMonthDaysAndWeeks();

  const monthName = new Date(year, month).toLocaleString("default", {
    month: "long",
  });
 const [habits, setHabits] = useState<string[]>([]);
  useEffect(() => {
    const fetchHabits = async () => {
      try{
        const res=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}api/habits`);

        if(!res.ok) throw new Error("Failed to fetch habits");

        const data=await res.json();
        setHabits(data.map((habit: any) => habit.name));

      }catch(error){
        console.error("Error fetching habits:", error);
      }
    };
    fetchHabits();
  }, []);

console.log("Fetched habits:", habits);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    open: boolean;
    habit: string | null;
    index: number | null;
  }>({
    open: false,
    habit: null,
    index: null,
  });
  const { toast } = useToast();
  const [checked, setChecked] = useState<
    Record<string, Record<number, boolean>>
  >({});

  const addHabit = (title: string) => {
    setHabits((prev) => [...prev, title]);
    toast({
      title: "Habit added",
      description: `"${title}" has been added to your habits.`,
    });
  };

  const handleDeleteHabit = (index: number, habit: string) => {
    setDeleteConfirm({
      open: true,
      habit,
      index,
    });
  };

  const confirmDelete = () => {
    if (deleteConfirm.index !== null) {
      const deletedHabit = habits[deleteConfirm.index];
      setHabits((prev) => prev.filter((_, i) => i !== deleteConfirm.index));
      toast({
        title: "Habit deleted",
        description: `"${deletedHabit}" has been removed.`,
      });
    }
    setDeleteConfirm({ open: false, habit: null, index: null });
  };
  const toggleDay = (habit: string, day: number) => {
    setChecked((prev) => {
      const habitMap = prev[habit] || {};
      return {
        ...prev,
        [habit]: {
          ...habitMap,
          [day]: !habitMap[day],
        },
      };
    });
  };

  return (
    <>
      <Card
        className="p-6 md:p-8 shadow-md border-gray-200 bg-white"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {monthName} {year}
            </h1>
            <p className="text-sm md:text-base text-gray-600 mt-2">
              Today is {monthName} {today} • {habits.length} active habit
              {habits.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="mr-20">
            <AddHabitDialog onAdd={addHabit} />
          </div>
        </div>

        <div className="">
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-gray-300 hover:bg-transparent">
                <TableHead
                  rowSpan={3}
                  className="min-w-[220px] text-lg font-bold text-gray-900"
                >
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

              <TableRow className="border-b border-gray-300 hover:bg-transparent">
                {allDays.map((dayObj) => (
                  <TableHead
                    key={`day-${dayObj.day}`}
                    className={`text-center min-w-[40px] text-xs font-medium ${
                      dayObj.isToday
                        ? "text-blue-600 font-bold"
                        : "text-gray-600"
                    }`}
                  >
                    {dayObj.day}
                  </TableHead>
                ))}
              </TableRow>

              <TableRow className="border-b-2 border-gray-300 hover:bg-transparent">
                {allDays.map((dayObj) => (
                  <TableHead
                    key={`dayname-${dayObj.day}`}
                    className={`text-center min-w-[40px] text-xs font-semibold ${
                      dayObj.isToday
                        ? "text-blue-600 font-bold bg-blue-50"
                        : "text-gray-500"
                    }`}
                  >
                    {dayObj.dayName}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {habits.map((h, i) => (
                <HabitRow
                  key={i}
                  habit={h}
                  days={allDays}
                  today={today}
                  checked={checked[h] || {}}
                  onToggle={(day) => toggleDay(h, day)}
                  onDelete={() => handleDeleteHabit(i, h)}
                />
              ))}
            </TableBody>
          </Table>
        </div>

        {habits.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No habits yet. Add one to get started!
            </p>
          </div>
        )}
      </Card>

      <AlertDialog
        open={deleteConfirm.open}
        onOpenChange={(open) => {
          if (!open)
            setDeleteConfirm({ open: false, habit: null, index: null });
        }}
      >
        <AlertDialogContent className="bg-white border-gray-200">
          <AlertDialogTitle className="text-gray-900">
            Delete habit?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600">
            Are you sure you want to delete "{deleteConfirm.habit}"? This action
            cannot be undone.
          </AlertDialogDescription>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel className="border-gray-200 text-gray-900">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
