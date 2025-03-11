
import React from 'react';
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { CalendarClock } from 'lucide-react';
import { format } from 'date-fns';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { getLeadsByStatus, getLeadsBySource, getLeadsByMonth, getFollowUpsThisWeek, getTotalLeadsStats, Lead } from '@/lib/data';

interface AnalyticsDashboardProps {
  leads: Lead[];
}

export function AnalyticsDashboard({ leads }: AnalyticsDashboardProps) {
  const leadsByStatus = getLeadsByStatus(leads);
  const leadsBySource = getLeadsBySource(leads);
  const leadsByMonth = getLeadsByMonth(leads);
  const followUpsThisWeek = getFollowUpsThisWeek(leads);
  const stats = getTotalLeadsStats(leads);

  const COLORS = [
    '#C2A87B', // Villa gold
    '#9A845C', // Villa dark gold
    '#D6CFC7', // Villa taupe
    '#333333', // Villa charcoal
  ];

  const SOURCES_COLORS = [
    '#F87171', // Instagram
    '#60A5FA', // Facebook
    '#818CF8', // Website
    '#34D399', // Referral
    '#22C55E', // WhatsApp
    '#FB923C', // Email 
    '#A78BFA', // Phone
    '#9CA3AF', // Other
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="lead-card">
          <CardHeader className="pb-2">
            <CardDescription>Total Leads</CardDescription>
            <CardTitle className="text-3xl">{stats.totalLeads}</CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="lead-card">
          <CardHeader className="pb-2">
            <CardDescription>Converted Leads</CardDescription>
            <CardTitle className="text-3xl">{stats.convertedLeads}</CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="lead-card">
          <CardHeader className="pb-2">
            <CardDescription>Conversion Rate</CardDescription>
            <CardTitle className="text-3xl">{stats.conversionRate}%</CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="lead-card">
          <CardHeader className="pb-2">
            <CardDescription>Pending Follow-ups</CardDescription>
            <CardTitle className="text-3xl">{stats.pendingFollowUps}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="lead-card">
          <CardHeader>
            <CardTitle>Leads by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] chart-appear" style={{ "--delay": "0.1s" } as React.CSSProperties}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadsByStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {leadsByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lead-card">
          <CardHeader>
            <CardTitle>Leads by Source</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] chart-appear" style={{ "--delay": "0.2s" } as React.CSSProperties}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadsBySource}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {leadsBySource.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={SOURCES_COLORS[index % SOURCES_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="lead-card">
        <CardHeader>
          <CardTitle>Leads Trend (Last 6 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] chart-appear" style={{ "--delay": "0.3s" } as React.CSSProperties}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={leadsByMonth}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Number of Leads" fill="#C2A87B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="lead-card">
        <CardHeader>
          <CardTitle>Upcoming Follow-ups (This Week)</CardTitle>
        </CardHeader>
        <CardContent>
          {followUpsThisWeek.length > 0 ? (
            <div className="space-y-4 chart-appear" style={{ "--delay": "0.4s" } as React.CSSProperties}>
              {followUpsThisWeek.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between border-b pb-3 border-villa-taupe/20">
                  <div>
                    <h4 className="font-medium">{lead.name}</h4>
                    <p className="text-sm text-muted-foreground">{lead.contactNumber}</p>
                  </div>
                  <div className="flex items-center text-sm text-villa-gold">
                    <CalendarClock className="mr-1 h-4 w-4" />
                    {lead.followUpDate && format(new Date(lead.followUpDate), "MMM dd, yyyy")}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground chart-appear" style={{ "--delay": "0.4s" } as React.CSSProperties}>
              No follow-ups scheduled for this week.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
