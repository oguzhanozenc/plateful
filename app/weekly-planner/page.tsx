"use client";

import { useState } from "react";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Input } from "@/ui/input";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function WeeklyPlanner() {
  const [weeklyMeals, setWeeklyMeals] = useState<Record<string, string[]>>({});
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [newMeal, setNewMeal] = useState("");

  return (
    <div className="max-w-5xl mx-auto py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-[#1E3229] tracking-tight">
          Weekly Planner
        </h1>
      </div>

      <Card className="shadow-md p-4">
        <Table>
          <TableHeader>
            <TableRow>
              {daysOfWeek.map((day) => (
                <TableHead
                  key={day}
                  className="text-center text-lg font-semibold"
                >
                  {day}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              {daysOfWeek.map((day) => (
                <TableCell key={day} className="p-4 border">
                  <div className="flex flex-col gap-2">
                    {weeklyMeals[day]?.map((meal, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 bg-gray-100 rounded-md text-sm"
                      >
                        {meal}
                      </div>
                    ))}

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedDay(day)}
                          className="mt-2"
                        >
                          + Add Meal
                        </Button>
                      </DialogTrigger>
                      <DialogContent
                        onOpenAutoFocus={(event) => event.preventDefault()} // Prevent auto-focus
                        onInteractOutside={(event) => event.preventDefault()} // Keep modal open until action
                      >
                        <DialogHeader>
                          <DialogTitle>
                            Add a Meal for {selectedDay}
                          </DialogTitle>
                        </DialogHeader>
                        <Input
                          placeholder="Enter meal name..."
                          value={newMeal}
                          onChange={(e) => setNewMeal(e.target.value)}
                          className="mt-4"
                        />
                        <DialogTrigger asChild>
                          <Button
                            onClick={() => {
                              if (!newMeal.trim() || !selectedDay) return;
                              setWeeklyMeals((prev) => ({
                                ...prev,
                                [selectedDay]: [
                                  ...(prev[selectedDay] || []),
                                  newMeal.trim(),
                                ],
                              }));
                              setNewMeal(""); // Reset input
                            }}
                            className="mt-2 w-full"
                          >
                            Add Meal
                          </Button>
                        </DialogTrigger>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
