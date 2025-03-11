
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/LeadForm";
import { Navigation } from "@/components/Navigation";
import { mockLeads } from "@/lib/data";
import { toast } from "sonner";

const AddLead = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      // In a real app, you would post to an API
      console.log("New lead data:", data);
      toast.success("Lead added successfully");
      setIsSubmitting(false);
      navigate("/");
    }, 800);
  };

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
            <h1 className="page-title">Add New Lead</h1>
            <p className="page-subtitle">Create a new lead in the system</p>
          </div>
          
          <div className="mt-8">
            <LeadForm 
              onSubmit={handleSubmit} 
              isLoading={isSubmitting}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddLead;
