
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { 
  createColumnHelper, 
  type ColumnDef 
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
  CalendarClock,
  Eye,
  Package
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface LeadTableProps {
  leads: Lead[];
  onDeleteLead?: (id: string) => void;
}

export function LeadTable({ leads, onDeleteLead }: LeadTableProps) {
  const navigate = useNavigate();
  const columnHelper = createColumnHelper<Lead>();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  
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
    columnHelper.accessor("packageType", {
      header: "Package",
      cell: (info) => {
        const packageType = info.getValue();
        return packageType ? (
          <div className="flex items-center gap-1.5">
            <Package className="h-3.5 w-3.5 text-villa-gold" />
            <span>{packageType}</span>
          </div>
        ) : (
          <span className="text-muted-foreground text-sm">Not specified</span>
        );
      },
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
    columnHelper.accessor("checkInDate", {
      header: "Check-In",
      cell: (info) => {
        const date = info.getValue();
        return date ? (
          format(new Date(date), "MMM dd, yyyy")
        ) : (
          <span className="text-muted-foreground text-sm">Not set</span>
        );
      },
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
              <DropdownMenuItem onClick={() => setSelectedLead(lead)}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
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

      <Dialog open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedLead?.name}</DialogTitle>
            <DialogDescription>Lead details</DialogDescription>
          </DialogHeader>
          
          {selectedLead && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="font-medium text-villa-charcoal">Contact</p>
                  <p>{selectedLead.contactNumber}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="font-medium text-villa-charcoal">Email</p>
                  <p>{selectedLead.email || "Not provided"}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="font-medium text-villa-charcoal">Source</p>
                  <div className="pt-1">
                    <SourceIcon source={selectedLead.source} showLabel />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="font-medium text-villa-charcoal">Status</p>
                  <div className="pt-1">
                    <StatusBadge status={selectedLead.status} />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="font-medium text-villa-charcoal">Package</p>
                  <p>{selectedLead.packageType || "Not specified"}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="font-medium text-villa-charcoal">Date of Inquiry</p>
                  <p>{format(new Date(selectedLead.dateOfInquiry), "MMMM dd, yyyy")}</p>
                </div>
                
                {selectedLead.checkInDate && (
                  <div className="space-y-1">
                    <p className="font-medium text-villa-charcoal">Check-In Date</p>
                    <p>{format(new Date(selectedLead.checkInDate), "MMMM dd, yyyy")}</p>
                  </div>
                )}
                
                {selectedLead.checkOutDate && (
                  <div className="space-y-1">
                    <p className="font-medium text-villa-charcoal">Check-Out Date</p>
                    <p>{format(new Date(selectedLead.checkOutDate), "MMMM dd, yyyy")}</p>
                  </div>
                )}
                
                {selectedLead.followUpDate && (
                  <div className="space-y-1">
                    <p className="font-medium text-villa-charcoal">Follow-Up Date</p>
                    <p>{format(new Date(selectedLead.followUpDate), "MMMM dd, yyyy")}</p>
                  </div>
                )}
              </div>
              
              {selectedLead.notes && (
                <div className="space-y-1">
                  <p className="font-medium text-villa-charcoal">Notes</p>
                  <p className="text-sm">{selectedLead.notes}</p>
                </div>
              )}
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedLead(null)}
                >
                  Close
                </Button>
                <Button onClick={() => {
                  setSelectedLead(null);
                  navigate(`/edit-lead/${selectedLead.id}`);
                }}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Lead
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
