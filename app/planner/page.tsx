"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useDateContext } from "@/context/DateContext";
import { Button } from "@/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PlannerViewSelector from "@/app/planner/components/PlannerViewSelector";
import PlannerDayPreview from "@/app/planner/components/PlannerDayPreview";
import Title from "@/app/components/Title";

export default function PlannerView() {
  return (
    <Suspense fallback={<div>Loading planner...</div>}>
      <PlannerViewContent />
    </Suspense>
  );
}

function PlannerViewContent() {
  const searchParams = useSearchParams();
  const { currentDate, setCurrentDate, view, setView, getDays, changeDate } =
    useDateContext();

  useEffect(() => {
    const dateQueryParam = searchParams.get("date");
    if (dateQueryParam) {
      setCurrentDate(new Date(dateQueryParam));
    } else {
      console.warn("No date found in URL");
    }
  }, [searchParams, setCurrentDate]);

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
    <div className="mx-auto w-full max-w-screen-lg px-4 sm:px-6 py-6 sm:py-8 md:py-16 space-y-6 sm:space-y-10 md:space-y-14 min-h-screen">
      {/*  Header */}
      <div className="border-b pb-3 mb-4 flex flex-wrap justify-center md:justify-between items-center">
        <Title>Planner</Title>
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            variant="ghost"
            className="border border-neutral-300 mx-2 py-2 px-4"
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

      {/* Meal List */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 w-full auto-rows-fr">
        {getDays().map((date, index) => (
          <PlannerDayPreview key={index} date={date} />
        ))}
      </div>
    </div>
  );
}
