
import React from "react";
import { 
  Instagram, 
  Facebook, 
  Globe, 
  Users, 
  MessageCircle,
  Mail,
  Phone,
  HelpCircle
} from "lucide-react";
import { LeadSource } from "@/lib/data";
import { cn } from "@/lib/utils";

interface SourceIconProps {
  source: LeadSource;
  className?: string;
  showLabel?: boolean;
}

export function SourceIcon({ source, className, showLabel = false }: SourceIconProps) {
  const getSourceIcon = () => {
    switch (source) {
      case "Instagram":
        return <Instagram className="h-4 w-4" />;
      case "Facebook":
        return <Facebook className="h-4 w-4" />;
      case "Website":
        return <Globe className="h-4 w-4" />;
      case "Referral":
        return <Users className="h-4 w-4" />;
      case "WhatsApp":
        return <MessageCircle className="h-4 w-4" />;
      case "Email":
        return <Mail className="h-4 w-4" />;
      case "Phone":
        return <Phone className="h-4 w-4" />;
      default:
        return <HelpCircle className="h-4 w-4" />;
    }
  };

  const getSourceColor = () => {
    switch (source) {
      case "Instagram":
        return "text-pink-600";
      case "Facebook":
        return "text-blue-600";
      case "Website":
        return "text-purple-600";
      case "Referral":
        return "text-green-600";
      case "WhatsApp":
        return "text-green-500";
      case "Email":
        return "text-amber-600";
      case "Phone":
        return "text-indigo-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <span className={getSourceColor()}>{getSourceIcon()}</span>
      {showLabel && <span className="text-sm">{source}</span>}
    </div>
  );
}
