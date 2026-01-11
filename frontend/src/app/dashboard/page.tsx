import HabitGrid from "@/components/ui/habits/HabitGrid";

export default function DashboardPage() {
  return (
    <div className="p6">
      <h1 className="text-3xl font-bold mb-6">Your Habits</h1>
      <HabitGrid/>
    </div>
  );
}
