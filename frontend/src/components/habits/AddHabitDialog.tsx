"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { on } from "events";

export default function AddHabitDialog({
  onAdd,
}: {
  onAdd: (title: string) => void;
}) {
  const [title, setTitle] = useState("");

  const postHabits = async () => {
    if (!title.trim()) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}api/habits`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: title,
            status: "pending",
            date: new Date().toISOString(),
          }),
        },
      );
      const data = await res.json();
      onAdd(title);
      setTitle("");
    } catch (error) {
      console.error("Error adding habit:", error);
    }
  };


  return (
    <div className="flex gap-2 w-full md:w-auto">
      <Input
        placeholder="New habit..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && postHabits()}
        className="flex-1 md:flex-none min-w-[180px] border-gray-300 bg-white text-gray-900 placeholder-gray-400"
      />
      <Button
        onClick={postHabits}
        className="gap-2 bg-gray-900 hover:bg-gray-800 text-white"
      >
        <Plus className="w-4 h-4" />
        Add
      </Button>
    </div>
  );
}
