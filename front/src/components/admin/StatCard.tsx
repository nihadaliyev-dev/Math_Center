import React from "react";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string | number;
  sublabel?: string;
  accent?: "yellow" | "blue" | "gray";
  right?: React.ReactNode;
  className?: string;
};

const accentMap: Record<NonNullable<StatCardProps["accent"]>, string> = {
  yellow: "bg-amber-400/30 text-amber-700 ring-amber-400/40",
  blue: "bg-sky-400/30 text-sky-800 ring-sky-400/40",
  gray: "bg-gray-200/60 text-gray-700 ring-gray-300/60",
};

export default function StatCard({ title, value, sublabel, accent = "gray", right, className }: StatCardProps) {
  return (
    <div className={cn("rounded-2xl bg-white/80 backdrop-blur-sm border border-border/60 shadow-sm p-5 flex items-start justify-between", className)}>
      <div>
        <div className="text-sm text-muted-foreground/80">{title}</div>
        <div className="mt-2 text-3xl font-bold tracking-tight">{value}</div>
        {sublabel && <div className="mt-1 text-xs text-muted-foreground">{sublabel}</div>}
      </div>
      <div className={cn("inline-flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm ring-1", accentMap[accent])}>
        {right}
      </div>
    </div>
  );
}
