
import React from "react";
import { cn } from "@/lib/utils";
import { LeadStatus } from "@/lib/data";

interface StatusBadgeProps {
  status: LeadStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusClasses = () => {
    switch (status) {
      case "Interested":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Not Interested":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "Follow-Up":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Converted":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <span
      className={cn(
        "lead-status-badge border",
        getStatusClasses(),
        className
      )}
    >
      {status}
    </span>
  );
}
