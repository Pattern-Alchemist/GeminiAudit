import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Sparkles, MessageCircle, Zap } from "lucide-react";

export default function Concierge() {
  const features = [
    {
      icon: MessageCircle,
      title: "24/7 Availability",
      desc: "Get instant answers anytime, anywhere",
    },
    {
      icon: Zap,
      title: "Personalized Insights",
      desc: "Contextual guidance based on your readings",
    },
    {
      icon: Sparkles,
      title: "Action Plans",
      desc: "Step-by-step micro-actions for transformation",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Bot className="h-10 w-10 text-primary" />
          <h1 className="font-serif text-5xl font-extrabold" data-testid="text-concierge-title">
            AI Concierge
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your personal astrology assistant - ask questions, get clarity, receive
          guidance
        </p>
        <Badge className="mt-4 bg-gold/15 text-gold border-gold/40" data-testid="badge-coming-soon">
          Coming Soon
        </Badge>
      </div>

      <Card className="p-12 shadow-2xl mb-12 starfield" data-testid="card-concierge-preview">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-gold/5 pointer-events-none opacity-30" />
        <div className="relative z-10 text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
            <Bot className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h2 className="font-serif text-3xl font-bold mb-3">
              Meet Your Cosmic Guide
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our AI concierge understands your birth chart, karma patterns, and
              current challenges. Ask anything from "What should I focus on today?"
              to "Help me understand my shadow triggers."
            </p>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {features.map((feature, i) => (
          <Card key={i} className="p-6 shadow-xl" data-testid={`card-feature-${i}`}>
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/30 w-fit mb-4">
              <feature.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.desc}</p>
          </Card>
        ))}
      </div>

      <Card className="p-8 shadow-xl bg-gradient-to-r from-primary/5 to-gold/5 border-primary/20" data-testid="card-early-access">
        <div className="text-center space-y-4">
          <h2 className="font-serif text-2xl font-bold">Get Early Access</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Join the waitlist to be among the first to experience our AI concierge.
            Pro members get priority access.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button
              size="lg"
              className="bg-primary/15 hover:bg-primary/25 text-primary border-primary/45"
              data-testid="button-join-waitlist"
            >
              Join Waitlist
            </Button>
            <Button size="lg" variant="outline" data-testid="button-learn-more">
              Learn More
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6 mt-8" data-testid="card-example-questions">
        <h3 className="font-serif text-xl font-bold mb-4">
          Example Questions You Can Ask
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            "What's my core lesson today?",
            "How do I handle this relationship conflict?",
            "When's my next breakthrough window?",
            "Explain my Karmic Debt 16",
            "What boundaries should I set?",
            "How can I improve my integrity score?",
          ].map((q, i) => (
            <div
              key={i}
              className="p-3 bg-muted/30 rounded-lg text-sm text-muted-foreground hover-elevate cursor-default"
              data-testid={`question-${i}`}
            >
              "{q}"
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
