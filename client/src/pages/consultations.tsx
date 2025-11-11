import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, MessageSquare, CheckCircle2 } from "lucide-react";

export default function Consultations() {
  const sessions = [
    {
      title: "Karma DNA Deep Dive",
      duration: "60 minutes",
      price: "₹2,999",
      description: "Comprehensive birth chart analysis with personalized action plan and ongoing support",
      icon: Calendar,
      features: ["Full birth chart analysis", "Core patterns & triggers", "90-day action plan", "Follow-up email support"]
    },
    {
      title: "Relationship Compatibility",
      duration: "45 minutes",
      price: "₹2,499",
      description: "Deep bond analysis for you and your partner with relationship guidance",
      icon: MessageSquare,
      features: ["Mind/Heart/Will compatibility", "Strength & challenge areas", "Growth opportunities", "Communication strategies"]
    },
    {
      title: "Career Path Reading",
      duration: "45 minutes",
      price: "₹2,499",
      description: "Identify your dharmic path and optimal timing for career moves",
      icon: Clock,
      features: ["Career dharma analysis", "Breakthrough windows", "Skill alignment", "Decision timing guidance"]
    },
    {
      title: "Monthly Check-In",
      duration: "30 minutes",
      price: "₹1,499",
      description: "Review progress, adjust practices, and set new intentions",
      icon: Video,
      features: ["Progress review", "Practice adjustments", "New goals setting", "Q&A session"]
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Choose Session",
      description: "Select the consultation type that fits your current needs"
    },
    {
      step: "2",
      title: "Schedule Time",
      description: "Pick a convenient date and time from available slots"
    },
    {
      step: "3",
      title: "Complete Payment",
      description: "Secure payment via UPI, PayPal, or payment gateway"
    },
    {
      step: "4",
      title: "Join & Transform",
      description: "Meet via video call and receive your personalized insights"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20" data-testid="badge-expert-guidance">
            Expert Guidance
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4" data-testid="text-consultations-title">
            Book a Personal Consultation
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Work one-on-one with our astrologers for personalized, actionable guidance powered by years of experience and AI insights.
          </p>
        </div>

        {/* Session Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {sessions.map((session, i) => (
            <Card key={i} className="p-6 hover-elevate transition-all" data-testid={`card-session-${i}`}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <session.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-bold mb-1">{session.title}</h3>
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {session.duration}
                    </Badge>
                    <span className="font-bold text-lg text-primary" data-testid={`price-${i}`}>
                      {session.price}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                {session.description}
              </p>

              <div className="space-y-2 mb-6">
                {session.features.map((feature, fi) => (
                  <div key={fi} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full" data-testid={`button-book-${i}`}>
                Book This Session
              </Button>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <Card className="p-8 mb-12" data-testid="card-how-it-works">
          <h2 className="text-2xl font-heading font-bold text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {howItWorks.map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">{item.step}</span>
                </div>
                <h3 className="font-heading font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pro Benefits */}
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-success/5 border-primary/20" data-testid="card-pro-benefits">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <Badge className="mb-3 bg-warning/10 text-warning border-warning/20">
                Pro Member Benefit
              </Badge>
              <h3 className="text-xl font-heading font-bold mb-2">
                Get 1 Free Consultation Credit
              </h3>
              <p className="text-muted-foreground">
                Pro members receive one complimentary 30-minute consultation session each month, plus priority scheduling and exclusive content.
              </p>
            </div>
            <Button size="lg" data-testid="button-upgrade-to-pro">
              Upgrade to Pro
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
