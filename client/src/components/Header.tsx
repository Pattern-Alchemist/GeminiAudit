import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";

export function Header() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/karma", label: "Analysis Tools" },
    { href: "/consultations", label: "Consultations" },
    { href: "/radio", label: "Radio" },
    { href: "/billing", label: "Billing" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-card shadow-sm" data-testid="header-main">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer hover-elevate px-3 py-2 rounded-md transition-all" data-testid="link-logo">
              <Activity className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">AstroKalki AI</span>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                size="sm"
                asChild
                className={`${
                  location === item.href
                    ? "text-primary bg-primary/10"
                    : "text-foreground/80"
                }`}
                data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <Link href={item.href}>
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>

          <div className="md:hidden">
            <select 
              className="text-sm border rounded-md px-3 py-2 bg-card"
              value={location}
              onChange={(e) => window.location.href = e.target.value}
              data-testid="nav-mobile-select"
            >
              {navItems.map((item) => (
                <option key={item.href} value={item.href}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
