"use client";

import { useCalendarContext } from "@/context/CalendarContext";
import { Button } from "@/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PlannerViewSelector from "@/app/components/planner/PlannerViewSelector";
import PlannerCell from "@/app/components/planner/PlannerCell";

export default function PlannerView() {
  const { currentDate, setCurrentDate, view, setView, getDays, changeDate } =
    useCalendarContext();

  return (
    <div className="w-full min-w-full max-w-full p-6">
      <div className="border-b pb-3 mb-4 flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Meal Planner</h1>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size-icon
            className="border border-neutral-300 mx-2"
            onClick={() => setCurrentDate(new Date())}
          >
            Today
          </Button>
          <Button variant="ghost" size="icon" onClick={() => changeDate(-1)}>
            <ChevronLeft size={22} />
          </Button>
          <span className="text-xl font-bold">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <Button variant="ghost" size="icon" onClick={() => changeDate(1)}>
            <ChevronRight size={22} />
          </Button>
          <PlannerViewSelector view={view} setView={setView} />
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 w-full">
        {getDays().map((date, index) => (
          <PlannerCell key={index} date={date} />
        ))}
      </div>
    </div>
  );
}
