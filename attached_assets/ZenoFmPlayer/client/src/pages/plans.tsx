import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Check, Sparkles } from "lucide-react";

export default function Plans() {
  const freePlanFeatures = [
    "Basic Karma DNA reading",
    "Karmic Debts scanner",
    "Daily Karma Pulse",
    "Community support",
  ];

  const proPlanFeatures = [
    "Everything in Free",
    "Advanced Impact Windows",
    "House Radar analysis",
    "Bond Karma compatibility",
    "Priority support",
    "1-on-1 consultation credit",
    "Early access to new tools",
  ];

  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="font-serif text-5xl font-extrabold mb-4" data-testid="text-plans-title">
          Choose Your Path
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Start with free tools, upgrade for deeper insights and personalized
          support.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <Card className="p-8 shadow-xl" data-testid="card-plan-free">
          <div className="mb-6">
            <h2 className="font-serif text-3xl font-bold mb-2">Free</h2>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-5xl font-bold">₹0</span>
              <span className="text-muted-foreground">/forever</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="lg"
            className="w-full mb-8"
            asChild
            data-testid="button-start-free"
          >
            <Link href="/karma">Get Started Free</Link>
          </Button>
          <ul className="space-y-3">
            {freePlanFeatures.map((feature, i) => (
              <li key={i} className="flex items-start gap-3" data-testid={`feature-free-${i}`}>
                <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Pro Plan */}
        <Card className="p-8 shadow-2xl border-primary/30 relative overflow-hidden" data-testid="card-plan-pro">
          <div className="absolute top-0 right-0 m-4">
            <Badge className="bg-gold/15 text-gold border-gold/40 flex items-center gap-1" data-testid="badge-popular">
              <Sparkles className="h-3 w-3" />
              Popular
            </Badge>
          </div>
          <div className="mb-6">
            <h2 className="font-serif text-3xl font-bold mb-2">Pro</h2>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-5xl font-bold">₹999</span>
              <span className="text-muted-foreground">/year</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              One-time payment, lifetime access
            </p>
          </div>
          <Button
            size="lg"
            className="w-full mb-8 bg-primary/15 hover:bg-primary/25 text-primary border-primary/45"
            asChild
            data-testid="button-upgrade-pro"
          >
            <Link href="/billing">Upgrade to Pro</Link>
          </Button>
          <ul className="space-y-3">
            {proPlanFeatures.map((feature, i) => (
              <li key={i} className="flex items-start gap-3" data-testid={`feature-pro-${i}`}>
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground font-medium">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card className="p-8 mt-12 shadow-xl" data-testid="card-faq">
        <h2 className="font-serif text-2xl font-bold mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-bold mb-2">Can I switch plans later?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! You can upgrade from Free to Pro anytime. Pro is a one-time
              payment with lifetime access.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">What payment methods do you accept?</h3>
            <p className="text-sm text-muted-foreground">
              We accept UPI (India) and PayPal (international). All payments are
              secure and encrypted.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Is my data private?</h3>
            <p className="text-sm text-muted-foreground">
              Absolutely. We never sell your data. Birth details are stored
              encrypted and only used for your readings.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
