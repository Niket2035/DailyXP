"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"

export default function AddHabitDialog({
  onAdd,
}: {
  onAdd: (title: string) => void
}) {
  const [title, setTitle] = useState("")

  const handleSubmit = () => {
    if (!title.trim()) return
    onAdd(title)
    setTitle("")
  }

  return (
    <div className="flex gap-2 w-full md:w-auto">
      <Input
        placeholder="New habit..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
        className="flex-1 md:flex-none min-w-[180px] border-gray-300 bg-white text-gray-900 placeholder-gray-400"
      />
      <Button onClick={handleSubmit} className="gap-2 bg-gray-900 hover:bg-gray-800 text-white">
        <Plus className="w-4 h-4" />
        Add
      </Button>
    </div>
  )
}
