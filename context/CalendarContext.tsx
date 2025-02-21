"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";

type CalendarContextProps = {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  view: "month" | "week" | "day";
  setView: (view: "month" | "week" | "day") => void;
  generateMonthDays: (year: number, month: number) => (Date | null)[];
  generateWeekDays: (currentDate: Date) => Date[];
  changeDate: (direction: number) => void;
  getDays: () => (Date | null)[];
};

const CalendarContext = createContext<CalendarContextProps | undefined>(
  undefined
);

export function CalendarProvider({ children }: { children: ReactNode }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");

  const generateMonthDays = (year: number, month: number): (Date | null)[] => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const days: (Date | null)[] = [];
    for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));

    return days;
  };

  const generateWeekDays = (currentDate: Date): Date[] => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    return Array.from(
      { length: 7 },
      (_, i) =>
        new Date(startOfWeek.setDate(startOfWeek.getDate() + (i === 0 ? 0 : 1)))
    );
  };

  const changeDate = (direction: number) => {
    if (view === "month") {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + direction)
      );
    } else if (view === "week") {
      setCurrentDate(
        new Date(currentDate.setDate(currentDate.getDate() + direction * 7))
      );
    } else {
      setCurrentDate(
        new Date(currentDate.setDate(currentDate.getDate() + direction))
      );
    }
  };

  const getDays = () => {
    if (view === "month")
      return generateMonthDays(
        currentDate.getFullYear(),
        currentDate.getMonth()
      );
    if (view === "week") return generateWeekDays(currentDate);
    return [currentDate];
  };

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        setCurrentDate,
        view,
        setView,
        generateMonthDays,
        generateWeekDays,
        changeDate,
        getDays,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendarContext() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error(
      "useCalendarContext must be used within a CalendarProvider"
    );
  }
  return context;
}
