
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadTable } from "@/components/LeadTable";
import { Navigation } from "@/components/Navigation";
import { Lead, mockLeads } from "@/lib/data";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>(mockLeads);

  const handleDeleteLead = (id: string) => {
    setLeads(leads.filter(lead => lead.id !== id));
    toast.success("Lead deleted successfully");
  };

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
            <Button 
              onClick={() => navigate("/add-lead")}
              className="bg-villa-gold hover:bg-villa-darkgold text-white"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Lead
            </Button>
          </div>
          
          <LeadTable leads={leads} onDeleteLead={handleDeleteLead} />
        </div>
      </main>
    </div>
  );
};

export default Index;
