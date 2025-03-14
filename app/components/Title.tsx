"use client";

import { cn } from "@/lib/utils";

type TitleProps = {
  children: React.ReactNode;
  className?: string;
  size?: "xxs" | "xs" | "sm" | "md" | "lg";
};

const sizeMap = {
  xxs: "text-lg md:text-xl",
  xs: "text-xl md:text-2xl",
  sm: "text-2xl md:text-3xl",
  md: "text-4xl md:text-5xl",
  lg: "text-5xl md:text-6xl",
};

export default function Title({
  children,
  className,
  size = "md",
}: TitleProps) {
  return (
    <h1
      className={cn(
        sizeMap[size],
        "font-title font-bold italic tracking-tight text-neutral-900",
        className
      )}
    >
      {children}
    </h1>
  );
}
