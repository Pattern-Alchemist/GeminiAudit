import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Heart, TrendingUp, Activity } from "lucide-react";

export default function Home() {
  const { toast } = useToast();

  const copyUPI = () => {
    navigator.clipboard?.writeText("9211271977@hdfcbank");
    toast({
      title: "UPI ID Copied",
      description: "9211271977@hdfcbank copied to clipboard",
    });
  };

  const outcomes = [
    { title: "Career", desc: "Fix leaks • ask clean", icon: TrendingUp },
    { title: "Love", desc: "Boundaries • Bond map", icon: Heart },
    { title: "Money", desc: "Value • Debts • windows", icon: Activity },
    { title: "Health", desc: "Slow down • truth pace", icon: Sparkles },
  ];

  const tools = [
    { title: "Karma Pulse", desc: "DO/DON'T/Mantra today" },
    { title: "Compatibility Snapshot", desc: "Mind/Heart/Will %" },
    { title: "Destiny Window", desc: "Next 90-day map" },
  ];

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        {/* Hero Section with Starfield */}
        <Card className="starfield p-8 lg:p-12 relative overflow-hidden rounded-3xl border-card-border shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-gold/10 pointer-events-none opacity-20" />
          <div className="relative z-10 space-y-6">
            <Badge className="bg-primary/15 text-primary border-primary/45 font-semibold" data-testid="badge-new-feature">
              New • Real Karma Tools
            </Badge>
            <h1 className="font-serif text-5xl lg:text-6xl font-extrabold leading-tight">
              <span className="gradient-text">Decode your Karma.</span>
              <br />
              Heal your path.
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
              Not tarot. Not vague horoscopes. Pattern-grade, birth-data based
              readings crafted for action: do one true thing today, track it, and
              grow.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button
                size="lg"
                className="bg-primary/15 hover:bg-primary/25 text-primary border-primary/45"
                asChild
                data-testid="button-start-karma-dna"
              >
                <Link href="/karma">Start Karma DNA</Link>
              </Button>
              <Button size="lg" variant="outline" asChild data-testid="button-see-plans">
                <Link href="/plans">See Plans</Link>
              </Button>
            </div>
          </div>
        </Card>

        {/* Right Column - Stacked Cards */}
        <div className="space-y-6">
          {/* Outcomes */}
          <Card className="p-6 shadow-xl" data-testid="card-outcomes">
            <h2 className="font-serif text-2xl font-bold mb-4">Choose an outcome</h2>
            <div className="grid grid-cols-2 gap-4">
              {outcomes.map((outcome, i) => (
                <Link key={i} href="/karma">
                  <Card className="p-4 hover-elevate active-elevate-2 cursor-pointer transition-all" data-testid={`card-outcome-${outcome.title.toLowerCase()}`}>
                    <outcome.icon className="h-5 w-5 text-primary mb-2" />
                    <div className="font-bold text-sm">{outcome.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {outcome.desc}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </Card>

          {/* Tools */}
          <Card className="p-6 shadow-xl" data-testid="card-tools">
            <div className="grid grid-cols-3 gap-4">
              {tools.map((tool, i) => (
                <div key={i} className="space-y-3" data-testid={`card-tool-${i}`}>
                  <div>
                    <div className="font-bold text-sm">{tool.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {tool.desc}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="w-full bg-primary/15 hover:bg-primary/25 text-primary border-primary/45"
                    asChild
                    data-testid={`button-try-tool-${i}`}
                  >
                    <Link href="/karma">Try now</Link>
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Trust Building */}
          <Card className="p-6 shadow-xl" data-testid="card-trust">
            <h3 className="font-serif text-xl font-bold mb-3">Why we're not scams</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Actionable, testable guidance (no vague fortune lines)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Privacy-first • We don't sell data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Transparent ethics • Refund notes for paid plans</span>
              </li>
            </ul>
            <Badge className="mt-4 bg-success/10 text-success border-success/30" data-testid="badge-privacy-compliant">
              Privacy Compliant
            </Badge>
          </Card>

          {/* Call to Action */}
          <Card className="p-6 flex items-center justify-between shadow-xl" data-testid="card-cta">
            <div>
              <div className="font-bold">Ready for more?</div>
              <div className="text-sm text-muted-foreground mt-1">
                See plans from ₹100 • Book a session
              </div>
            </div>
            <Button
              className="bg-primary/15 hover:bg-primary/25 text-primary border-primary/45"
              asChild
              data-testid="button-book-session"
            >
              <Link href="/consultations">Book a Session</Link>
            </Button>
          </Card>

          {/* Payment Options */}
          <Card className="p-6 shadow-xl" data-testid="card-payment-options">
            <h3 className="font-serif text-xl font-bold mb-2">Payment options</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Quick support & direct checkout
            </p>
            <div className="flex gap-3 flex-wrap items-center">
              <div className="text-sm">
                <strong className="text-foreground">UPI:</strong>{" "}
                <span className="text-muted-foreground">9211271977@hdfcbank</span>
              </div>
              <Button size="sm" variant="outline" onClick={copyUPI} data-testid="button-copy-upi">
                Copy
              </Button>
              <Button
                size="sm"
                variant="outline"
                asChild
                data-testid="button-open-upi"
              >
                <a href="upi://pay?pa=9211271977%40hdfcbank&pn=AstroKalki&cu=INR">
                  Open UPI
                </a>
              </Button>
              <Button
                size="sm"
                variant="outline"
                asChild
                data-testid="button-paypal"
              >
                <a
                  href="https://paypal.me/kaus777"
                  target="_blank"
                  rel="noreferrer"
                >
                  PayPal
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
