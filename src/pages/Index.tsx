
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadTable } from "@/components/LeadTable";
import { Navigation } from "@/components/Navigation";
import { Lead, mockLeads, LeadStatus } from "@/lib/data";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Index = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "All">("All");

  const handleDeleteLead = (id: string) => {
    setLeads(leads.filter(lead => lead.id !== id));
    toast.success("Lead deleted successfully");
  };

  const filteredLeads = statusFilter === "All" 
    ? leads 
    : leads.filter(lead => lead.status === statusFilter);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      <Navigation />
      <main className="flex-1 overflow-x-hidden">
        <div className="page-container animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 page-header">
            <div>
              <h1 className="page-title">Lead Dashboard</h1>
              <p className="page-subtitle">Manage all your leads in one place</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex items-center">
                <Select
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value as LeadStatus | "All")}
                >
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Statuses</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Contacted">Contacted</SelectItem>
                    <SelectItem value="Follow-Up">Follow-Up</SelectItem>
                    <SelectItem value="Booked">Booked</SelectItem>
                    <SelectItem value="Not Interested">Not Interested</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={() => navigate("/add-lead")}
                className="bg-villa-gold hover:bg-villa-darkgold text-white"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Lead
              </Button>
            </div>
          </div>
          
          <LeadTable leads={filteredLeads} onDeleteLead={handleDeleteLead} />
        </div>
      </main>
    </div>
  );
};

export default Index;
