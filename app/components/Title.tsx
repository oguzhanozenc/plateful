"use client";

import { cn } from "@/lib/utils";

type TitleProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Title({ children, className }: TitleProps) {
  return (
    <h1
      className={cn(
        "text-5xl font-title font-bold italic tracking-tight text-neutral-900",
        className
      )}
    >
      {children}
    </h1>
  );
}
