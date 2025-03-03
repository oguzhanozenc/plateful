"use client";

import { useEffect } from "react";
import { useCalendarContext } from "@/context/CalendarContext";
import { Button } from "@/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PlannerViewSelector from "@/app/components/planner/PlannerViewSelector";
import PlannerCell from "@/app/components/planner/PlannerCell";

export default function PlannerView() {
  const { currentDate, setCurrentDate, view, setView, getDays, changeDate } =
    useCalendarContext();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setView("week");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setView]);

  return (
    <div className="w-full min-w-full max-w-full p-6 h-full min-h-screen">
      <div className="border-b pb-3 mb-4 flex flex-wrap justify-center md:justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-semibold text-center">
          Meal Planner
        </h1>
        <div className="flex flex-wrap justify-center gap-2">
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

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 w-full auto-rows-fr">
        {getDays().map((date, index) => (
          <PlannerCell key={index} date={date} />
        ))}
      </div>
    </div>
  );
}
