"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function AddSleepCard({
  sleepHours,
  setSleepHours,
  onAdd,
  today,
}: {
  sleepHours: string;
  setSleepHours: (v: string) => void;
  onAdd: () => void;
  today: number;
}) {
  return (
    <Card className="border border-gray-200 bg-white">
      <CardHeader>
        <CardTitle className="text-lg">Log Sleep Hours</CardTitle>
        <CardDescription>Add sleep hours for today</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Hours Slept
            </label>
            <Input
              type="number"
              min="0"
              max="24"
              step="0.5"
              value={sleepHours}
              onChange={(e) => setSleepHours(e.target.value)}
              placeholder="Enter hours (e.g., 7.5)"
            />
          </div>
          <Button
            onClick={onAdd}
            className="gap-2 bg-gray-900 hover:bg-gray-800 text-white"
          >
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>
        <p className="text-xs text-gray-500">
          You can only log sleep hours for today ({today})
        </p>
      </CardContent>
    </Card>
  );
}
