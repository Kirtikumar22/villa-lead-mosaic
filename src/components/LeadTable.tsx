
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { 
  createColumnHelper, 
  ColumnDef 
} from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/StatusBadge";
import { SourceIcon } from "@/components/SourceIcon";
import { Button } from "@/components/ui/button";
import { Lead } from "@/lib/data";
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  CalendarClock
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface LeadTableProps {
  leads: Lead[];
  onDeleteLead?: (id: string) => void;
}

export function LeadTable({ leads, onDeleteLead }: LeadTableProps) {
  const navigate = useNavigate();
  const columnHelper = createColumnHelper<Lead>();
  
  const columns: ColumnDef<Lead, any>[] = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => (
        <div className="font-medium">{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor("contactNumber", {
      header: "Contact",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("source", {
      header: "Source",
      cell: (info) => (
        <SourceIcon source={info.getValue()} showLabel />
      ),
    }),
    columnHelper.accessor("dateOfInquiry", {
      header: "Inquiry Date",
      cell: (info) => format(new Date(info.getValue()), "MMM dd, yyyy"),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => <StatusBadge status={info.getValue()} />,
    }),
    columnHelper.accessor("followUpDate", {
      header: "Follow-Up",
      cell: (info) => {
        const date = info.getValue();
        return date ? (
          <div className="flex items-center gap-1.5 text-sm">
            <CalendarClock className="h-3.5 w-3.5 text-villa-gold" />
            {format(new Date(date), "MMM dd, yyyy")}
          </div>
        ) : (
          <span className="text-muted-foreground text-sm">Not scheduled</span>
        );
      },
    }),
    columnHelper.display({
      id: "actions",
      cell: (info) => {
        const lead = info.row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate(`/edit-lead/${lead.id}`)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  if (onDeleteLead) {
                    onDeleteLead(lead.id);
                    toast.success("Lead deleted successfully");
                  }
                }}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }),
  ];

  return (
    <div className="animate-fade-in">
      <DataTable 
        columns={columns} 
        data={leads} 
        searchPlaceholder="Search leads..." 
      />
    </div>
  );
}
