
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/LeadForm";
import { Navigation } from "@/components/Navigation";
import { Lead, mockLeads } from "@/lib/data";
import { toast } from "sonner";

const EditLead = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [lead, setLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Simulate API call to get lead by ID
    const timer = setTimeout(() => {
      const foundLead = mockLeads.find(lead => lead.id === id);
      if (foundLead) {
        setLead(foundLead);
      } else {
        toast.error("Lead not found");
        navigate("/");
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id, navigate]);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      // In a real app, you would update via an API
      console.log("Updated lead data:", data);
      toast.success("Lead updated successfully");
      setIsSubmitting(false);
      navigate("/");
    }, 800);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col md:flex-row min-h-screen bg-background">
        <Navigation />
        <main className="flex-1 overflow-x-hidden">
          <div className="page-container flex items-center justify-center">
            <div className="text-center">
              <p className="text-villa-gold animate-pulse">Loading lead data...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="flex flex-col md:flex-row min-h-screen bg-background">
        <Navigation />
        <main className="flex-1 overflow-x-hidden">
          <div className="page-container flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl mb-2 text-villa-charcoal">Lead Not Found</h1>
              <p className="text-muted-foreground mb-6">
                The lead you're looking for doesn't exist or has been removed.
              </p>
              <Button onClick={() => navigate("/")}>
                Return to Dashboard
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      <Navigation />
      <main className="flex-1 overflow-x-hidden">
        <div className="page-container animate-fade-in">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="page-header">
            <h1 className="page-title">Edit Lead</h1>
            <p className="page-subtitle">Update lead information</p>
          </div>
          
          <div className="mt-8">
            <LeadForm 
              initialData={lead}
              onSubmit={handleSubmit} 
              isLoading={isSubmitting}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditLead;
