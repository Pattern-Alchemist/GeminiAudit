import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, MessageSquare } from "lucide-react";

export default function Consultations() {
  const sessions = [
    {
      title: "Karma DNA Deep Dive",
      duration: "60 minutes",
      price: "₹2,999",
      description:
        "Comprehensive birth chart analysis with personalized action plan",
      icon: Calendar,
    },
    {
      title: "Relationship Compatibility",
      duration: "45 minutes",
      price: "₹2,499",
      description: "Bond Karma analysis for you and your partner",
      icon: MessageSquare,
    },
    {
      title: "Career Path Reading",
      duration: "45 minutes",
      price: "₹2,499",
      description: "Identify your dharmic path and breakthrough windows",
      icon: Clock,
    },
    {
      title: "Monthly Check-in",
      duration: "30 minutes",
      price: "₹1,499",
      description: "Review progress, adjust practices, set new intentions",
      icon: Video,
    },
  ];

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="font-serif text-5xl font-extrabold mb-4" data-testid="text-consultations-title">
          Book a Consultation
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Work one-on-one with our astrologers for personalized guidance and
          actionable insights.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {sessions.map((session, i) => (
          <Card key={i} className="p-6 shadow-xl hover-elevate transition-all" data-testid={`card-session-${i}`}>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                <session.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-xl font-bold mb-1">
                  {session.title}
                </h3>
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="outline" className="text-xs" data-testid={`badge-duration-${i}`}>
                    {session.duration}
                  </Badge>
                  <span className="font-bold text-primary" data-testid={`text-price-${i}`}>{session.price}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {session.description}
                </p>
                <Button
                  size="sm"
                  className="bg-primary/15 hover:bg-primary/25 text-primary border-primary/45"
                  data-testid={`button-book-${i}`}
                >
                  Book Session
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* How it Works */}
      <Card className="p-8 shadow-xl" data-testid="card-how-it-works">
        <h2 className="font-serif text-2xl font-bold mb-6">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center font-bold text-primary mb-3">
              1
            </div>
            <h3 className="font-bold">Choose a Session</h3>
            <p className="text-sm text-muted-foreground">
              Select the type of consultation that fits your needs
            </p>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center font-bold text-primary mb-3">
              2
            </div>
            <h3 className="font-bold">Schedule & Pay</h3>
            <p className="text-sm text-muted-foreground">
              Pick a convenient time and complete secure payment
            </p>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center font-bold text-primary mb-3">
              3
            </div>
            <h3 className="font-bold">Meet & Transform</h3>
            <p className="text-sm text-muted-foreground">
              Join video call, receive insights, and get your action plan
            </p>
          </div>
        </div>
      </Card>

      {/* Pro Member Benefit */}
      <Card className="p-6 mt-8 bg-gradient-to-r from-primary/5 to-gold/5 border-primary/20 shadow-xl" data-testid="card-pro-benefit">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h3 className="font-serif text-xl font-bold mb-1">
              Pro Members Get 1 Free Credit
            </h3>
            <p className="text-sm text-muted-foreground">
              Upgrade to Pro and receive credit for one 30-minute consultation
            </p>
          </div>
          <Button
            className="bg-primary/15 hover:bg-primary/25 text-primary border-primary/45"
            data-testid="button-learn-more-pro"
          >
            Learn More About Pro
          </Button>
        </div>
      </Card>
    </div>
  );
}
