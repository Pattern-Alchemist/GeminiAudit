import { Link, useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";
import type { PlanType } from "@shared/schema";

interface HeaderProps {
  plan?: PlanType;
}

export function Header({ plan }: HeaderProps) {
  const [location] = useLocation();

  const tabs = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/karma", label: "Karma" },
    { href: "/plans", label: "Plans" },
    { href: "/consultations", label: "Consultations" },
    { href: "/billing", label: "Billing" },
    { href: "/radio", label: "Radio" },
    { href: "/concierge", label: "Concierge" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-lg" data-testid="header-navigation">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-xl font-extrabold tracking-wide" data-testid="text-brand-name">
              AstroKalki
            </h1>
            {plan === "pro" && (
              <Badge
                className="bg-gold/10 text-gold border-gold/30 font-semibold"
                data-testid="badge-pro-status"
              >
                PRO
              </Badge>
            )}
          </div>
          <nav className="flex gap-6">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`text-sm font-medium transition-colors hover-elevate px-3 py-1.5 rounded-md ${
                  location === tab.href
                    ? "text-primary"
                    : "text-foreground/80 hover:text-foreground"
                }`}
                data-testid={`link-${tab.label.toLowerCase()}`}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
