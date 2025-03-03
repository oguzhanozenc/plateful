"use client";

import { useState, useEffect } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/ui/select";

type ViewType = "day" | "week" | "month";

export default function PlannerViewSelector({
  view,
  setView,
}: {
  view: ViewType;
  setView: (value: ViewType) => void;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Select
      value={view}
      onValueChange={(value) => setView(value as ViewType)}
      disabled={isMobile}
    >
      <SelectTrigger className="w-full sm:w-[160px] bg-white shadow-md border rounded-lg px-4 py-2 text-sm hover:bg-gray-100 transition">
        <span>{view.charAt(0).toUpperCase() + view.slice(1)}</span>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="day">Day</SelectItem>
        <SelectItem value="week">Week</SelectItem>
        {!isMobile && <SelectItem value="month">Month</SelectItem>}
      </SelectContent>
    </Select>
  );
}
