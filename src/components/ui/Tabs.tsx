import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  children: ReactNode;
  className?: string;
}

export function Tabs({ children, className }: TabsProps) {
  return (
    <div className={cn(
      "flex flex-wrap border-b border-gray-200 dark:border-gray-700 mb-6",
      className
    )}>
      {children}
    </div>
  );
}

interface TabProps {
  children: ReactNode;
  active: boolean;
  onClick: () => void;
}

export function Tab({ children, active, onClick }: TabProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 font-medium text-sm flex items-center",
        active 
          ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400"
          : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      )}
    >
      {children}
    </button>
  );
}