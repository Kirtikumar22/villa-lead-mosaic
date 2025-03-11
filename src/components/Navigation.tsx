
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  LineChart,
  PlusCircle,
  Menu,
  X
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export function Navigation() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      href: "/",
      icon: <LayoutDashboard className="h-4 w-4 mr-2" />,
    },
    {
      label: "Add Lead",
      href: "/add-lead",
      icon: <PlusCircle className="h-4 w-4 mr-2" />,
    },
    {
      label: "Analytics",
      href: "/analytics",
      icon: <LineChart className="h-4 w-4 mr-2" />,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  const renderNavItems = () => (
    <>
      <div className="flex items-center mb-8">
        <h1 className="text-2xl font-light">Villa Gulposh</h1>
      </div>
      <div className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant={isActive(item.href) ? "default" : "ghost"}
            className={cn(
              "justify-start",
              isActive(item.href) 
                ? "bg-villa-gold text-white hover:bg-villa-darkgold" 
                : "hover:bg-villa-beige"
            )}
            asChild
            onClick={() => setIsSheetOpen(false)}
          >
            <Link to={item.href}>
              {item.icon}
              {item.label}
            </Link>
          </Button>
        ))}
      </div>
    </>
  );

  if (isMobile) {
    return (
      <div className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-villa-taupe/20">
        <div className="flex h-14 items-center px-4">
          <h1 className="text-xl font-light">Villa Gulposh</h1>
          <div className="ml-auto">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-6">
                {renderNavItems()}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-64 p-6 border-r border-villa-taupe/20 flex flex-col animate-fade-in">
      {renderNavItems()}
    </div>
  );
}
