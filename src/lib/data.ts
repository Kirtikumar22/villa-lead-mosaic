export type LeadSource = 
  | "Instagram" 
  | "Facebook" 
  | "Website" 
  | "Referral" 
  | "WhatsApp" 
  | "Email" 
  | "Phone" 
  | "Other";

export type LeadStatus = 
  | "Interested" 
  | "Not Interested" 
  | "Follow-Up" 
  | "Converted";

export type PackageType =
  | "Cozy"
  | "Luxurious" 
  | "Grand";

export interface Lead {
  id: string;
  name: string;
  contactNumber: string;
  email?: string;
  source: LeadSource;
  dateOfInquiry: Date;
  status: LeadStatus;
  notes?: string;
  followUpDate?: Date;
  packageType?: PackageType;
  checkInDate?: Date;
  checkOutDate?: Date;
}

// Mock data generator
const getRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const sources: LeadSource[] = [
  "Instagram", 
  "Facebook", 
  "Website", 
  "Referral", 
  "WhatsApp", 
  "Email", 
  "Phone", 
  "Other"
];

const statuses: LeadStatus[] = [
  "Interested", 
  "Not Interested", 
  "Follow-Up", 
  "Converted"
];

export const generateMockLeads = (count: number): Lead[] => {
  const leads: Lead[] = [];
  const packageTypes: PackageType[] = ["Cozy", "Luxurious", "Grand"];
  
  for (let i = 0; i < count; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const dateOfInquiry = getRandomDate(new Date(2023, 0, 1), new Date());
    
    let followUpDate: Date | undefined;
    if (status === "Follow-Up") {
      followUpDate = new Date(dateOfInquiry);
      followUpDate.setDate(followUpDate.getDate() + Math.floor(Math.random() * 14) + 1);
    }
    
    let checkInDate: Date | undefined;
    let checkOutDate: Date | undefined;
    
    if (Math.random() > 0.4) {
      checkInDate = new Date(dateOfInquiry);
      checkInDate.setDate(checkInDate.getDate() + Math.floor(Math.random() * 30) + 14);
      
      checkOutDate = new Date(checkInDate);
      checkOutDate.setDate(checkOutDate.getDate() + Math.floor(Math.random() * 7) + 1);
    }
    
    leads.push({
      id: `lead-${i + 1}`,
      name: `Client ${i + 1}`,
      contactNumber: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      email: Math.random() > 0.3 ? `client${i + 1}@example.com` : undefined,
      source: sources[Math.floor(Math.random() * sources.length)],
      dateOfInquiry,
      status,
      notes: Math.random() > 0.5 
        ? `This lead is interested in booking for ${Math.floor(Math.random() * 10) + 1} people.` 
        : undefined,
      followUpDate,
      packageType: Math.random() > 0.3 ? packageTypes[Math.floor(Math.random() * packageTypes.length)] : undefined,
      checkInDate,
      checkOutDate
    });
  }
  
  return leads;
};

// Generate 50 mock leads
export const mockLeads = generateMockLeads(50);

// Analytics data functions
export const getLeadsByStatus = (leads: Lead[]) => {
  const result = {
    Interested: 0,
    "Not Interested": 0,
    "Follow-Up": 0,
    Converted: 0
  };
  
  leads.forEach(lead => {
    result[lead.status]++;
  });
  
  return Object.entries(result).map(([name, value]) => ({ name, value }));
};

export const getLeadsBySource = (leads: Lead[]) => {
  const result: Record<string, number> = {};
  
  leads.forEach(lead => {
    if (result[lead.source]) {
      result[lead.source]++;
    } else {
      result[lead.source] = 1;
    }
  });
  
  return Object.entries(result).map(([name, value]) => ({ name, value }));
};

export const getLeadsByMonth = (leads: Lead[]) => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const result: Record<string, number> = {};
  
  for (let i = 0; i < 6; i++) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const monthKey = monthNames[d.getMonth()];
    result[monthKey] = 0;
  }
  
  leads.forEach(lead => {
    const inquiryDate = new Date(lead.dateOfInquiry);
    if (inquiryDate >= sixMonthsAgo) {
      const monthKey = monthNames[inquiryDate.getMonth()];
      if (result[monthKey] !== undefined) {
        result[monthKey]++;
      }
    }
  });
  
  const monthOrder = Object.keys(result).map(month => monthNames.indexOf(month));
  const sortedMonths = Object.keys(result).sort((a, b) => {
    return monthNames.indexOf(a) - monthNames.indexOf(b);
  });
  
  return sortedMonths.map(month => ({
    name: month,
    value: result[month]
  }));
};

export const getFollowUpsThisWeek = (leads: Lead[]) => {
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  
  return leads.filter(lead => {
    if (!lead.followUpDate) return false;
    const followUp = new Date(lead.followUpDate);
    return followUp >= today && followUp <= nextWeek;
  });
};

export const getTotalLeadsStats = (leads: Lead[]) => {
  const totalLeads = leads.length;
  const convertedLeads = leads.filter(lead => lead.status === "Converted").length;
  const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;
  const pendingFollowUps = leads.filter(lead => lead.status === "Follow-Up").length;
  
  return {
    totalLeads,
    convertedLeads,
    conversionRate: conversionRate.toFixed(1),
    pendingFollowUps
  };
};
