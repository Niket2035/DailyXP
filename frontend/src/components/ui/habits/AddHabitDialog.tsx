"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddHabitDialog({
  onAdd,
}: {
  onAdd: (title: string) => void;
}) {
  const [title, setTitle] = useState("");

  return (
    <div className="flex gap-2">
      <Input
        placeholder="New habit..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button
        onClick={() => {
          if (!title.trim()) return;
          onAdd(title);
          setTitle("");
        }}
      >
        Add
      </Button>
    </div>
  );
}
