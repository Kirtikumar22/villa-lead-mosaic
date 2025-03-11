
import React from "react";
import { Navigation } from "@/components/Navigation";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { mockLeads } from "@/lib/data";

const Analytics = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      <Navigation />
      <main className="flex-1 overflow-x-hidden">
        <div className="page-container animate-fade-in">
          <div className="page-header">
            <h1 className="page-title">Analytics Dashboard</h1>
            <p className="page-subtitle">Track and analyze your lead performance</p>
          </div>
          
          <div className="mt-8">
            <AnalyticsDashboard leads={mockLeads} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
