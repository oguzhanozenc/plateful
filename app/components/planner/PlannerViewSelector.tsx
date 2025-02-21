"use client";

import { Select, SelectTrigger, SelectContent, SelectItem } from "@/ui/select";

type ViewType = "day" | "week" | "month";

export default function PlannerViewSelector({
  view,
  setView,
}: {
  view: ViewType;
  setView: (value: ViewType) => void;
}) {
  return (
    <Select value={view} onValueChange={(value) => setView(value as ViewType)}>
      <SelectTrigger className="w-[160px] bg-white shadow-md border rounded-lg px-4 py-2 text-sm hover:bg-gray-100 transition">
        <span>{view.charAt(0).toUpperCase() + view.slice(1)}</span>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="day">Day</SelectItem>
        <SelectItem value="week">Week</SelectItem>
        <SelectItem value="month">Month</SelectItem>
      </SelectContent>
    </Select>
  );
}
