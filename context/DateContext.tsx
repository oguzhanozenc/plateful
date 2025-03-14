"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";

type DateContextProps = {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  view: "month" | "week" | "day";
  setView: (view: "month" | "week" | "day") => void;
  generateMonthDays: (year: number, month: number) => (Date | null)[];
  generateWeekDays: (currentDate: Date) => Date[];
  changeDate: (direction: number) => void;
  getDays: () => (Date | null)[];
  getLocalYyyyMmDd: (date: Date) => string;
  getCurrentWeekDates: () => { fullDate: string; formattedDate: string }[];
};

const DateContext = createContext<DateContextProps | undefined>(undefined);

export function DateProvider({ children }: { children: ReactNode }) {
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
    startOfWeek.setDate(
      currentDate.getDate() - ((currentDate.getDay() + 6) % 7)
    );

    return Array.from(
      { length: 7 },
      (_, i) => new Date(startOfWeek.getTime() + i * 86400000)
    );
  };

  const changeDate = (direction: number) => {
    setCurrentDate((prev) => {
      if (view === "month") {
        return new Date(prev.getFullYear(), prev.getMonth() + direction);
      } else if (view === "week") {
        return new Date(prev.getTime() + direction * 7 * 86400000);
      } else {
        return new Date(prev.getTime() + direction * 86400000);
      }
    });
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

  // ✅ Converts date to "YYYY-MM-DD"
  const getLocalYyyyMmDd = (date: Date): string => {
    const tzOffset = date.getTimezoneOffset();
    const localTime = new Date(date.getTime() - tzOffset * 60_000);
    return localTime.toISOString().split("T")[0];
  };

  const getCurrentWeekDates = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(
      startOfWeek.getDate() - ((startOfWeek.getDay() + 6) % 7)
    );

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(date.getDate() + i);

      return {
        fullDate: getLocalYyyyMmDd(date),
        formattedDate: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      };
    });
  };

  return (
    <DateContext.Provider
      value={{
        currentDate,
        setCurrentDate,
        view,
        setView,
        generateMonthDays,
        generateWeekDays,
        changeDate,
        getDays,
        getLocalYyyyMmDd,
        getCurrentWeekDates,
      }}
    >
      {children}
    </DateContext.Provider>
  );
}

export function useDateContext() {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error("useDateContext must be used within a DateProvider");
  }
  return context;
}
