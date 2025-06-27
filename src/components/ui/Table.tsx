import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Table({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <table className={cn("w-full text-sm text-left text-gray-500 dark:text-gray-400", className)}>
      {children}
    </table>
  );
}

Table.Header = function Header({ children }: { children: ReactNode }) {
  return <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">{children}</thead>;
};

Table.Body = function Body({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
};

Table.Row = function Row({ children }: { children: ReactNode }) {
  return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">{children}</tr>;
};

Table.Head = function Head({ children, className }: { children: ReactNode; className?: string }) {
  return <th scope="col" className={cn("px-6 py-3", className)}>{children}</th>;
};

Table.Cell = function Cell({ children, className }: { children: ReactNode; className?: string }) {
  return <td className={cn("px-6 py-4", className)}>{children}</td>;
};