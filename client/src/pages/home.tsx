import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  TrendingUp,
  Heart,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";
import InteractiveOracle from "@/components/InteractiveOracle";

import fluxImage from "@assets/generated_images/Cosmic_energy_flux_spiral_2acbdcfb.png";
import compatibilityImage from "@assets/generated_images/Merging_galaxy_compatibility_d19a37d1.png";
import archetypeImage from "@assets/generated_images/Sacred_geometric_crystal_archetype_d6a3b7bd.png";
import timelineImage from "@assets/generated_images/Money_cycle_waveform_5d675db5.png";
import remedialImage from "@assets/generated_images/Sacred_ritual_star_mandala_986ee9a3.png";
import signalsImage from "@assets/generated_images/Cosmic_signal_transmission_waves_61ced96b.png";
import pathsImage from "@assets/generated_images/Branching_destiny_paths_182fb06b.png";
import talismansImage from "@assets/generated_images/Mystical_talisman_crystals_8a191cc7.png";

export default function Home() {
  const features = [
    {
      icon: Activity,
      title: "Karma DNA Analysis",
      description:
        "AI-powered birth chart analysis revealing your core patterns and life path",
    },
    {
      icon: TrendingUp,
      title: "Impact Windows",
      description:
        "Identify optimal timing for major life decisions and transformations",
    },
    {
      icon: Heart,
      title: "Relationship Compatibility",
      description:
        "Deep compatibility analysis for personal and professional relationships",
    },
    {
      icon: Sparkles,
      title: "Karmic Debt Insights",
      description:
        "Understand and heal recurring patterns affecting your growth",
    },
  ];

  const outcomes = [
    { label: "Career Growth", icon: TrendingUp, color: "text-primary" },
    { label: "Relationships", icon: Heart, color: "text-chart-2" },
    { label: "Health & Wellness", icon: Sparkles, color: "text-chart-3" },
    { label: "Financial Success", icon: Zap, color: "text-warning" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <InteractiveOracle
        heading="Architect Your Destiny"
        sub="A living crystal sphere with orbiting insights into your cosmic journey."
        cards={[
          {
            angle: 10,
            image: fluxImage,
            title: "Cosmic Flux",
            text: "Active transits & energy spikes.",
          },
          {
            angle: 55,
            image: compatibilityImage,
            title: "Compatibility",
            text: "Emotional & spiritual harmonics.",
          },
          {
            angle: 100,
            image: archetypeImage,
            title: "Persona Lens",
            text: "Shadow traits & latent gifts.",
          },
          {
            angle: 145,
            image: timelineImage,
            title: "Money Cycle",
            text: "Cashflow periods & windows.",
          },
          {
            angle: 190,
            image: remedialImage,
            title: "Upāyas",
            text: "3 rituals to balance forces.",
          },
          {
            angle: 235,
            image: signalsImage,
            title: "Daily Dharma",
            text: "Micro-actions for traction.",
          },
          {
            angle: 280,
            image: pathsImage,
            title: "Probable Futures",
            text: "Choose a likely branch.",
          },
          {
            angle: 325,
            image: talismansImage,
            title: "Talismans",
            text: "Stones & mantras that fit.",
          },
        ]}
      />
      <section className="bg-gradient-to-br from-primary/5 via-background to-success/5 py-20 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center space-y-6">
            <Badge
              className="bg-primary/10 text-primary border-primary/20"
              data-testid="badge-ai-powered"
            >
              <Zap className="h-3 w-3 mr-1" />
              AI-Powered Analysis
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
              Decode Your Karma with
              <span className="text-primary"> Advanced AI</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Get accurate, actionable insights powered by Google Gemini AI.
              Real analysis, not vague predictions—designed for measurable
              growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button size="lg" asChild data-testid="button-start-analysis">
                <Link href="/karma">Start Free Analysis</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                data-testid="button-view-consultations"
              >
                <Link href="/consultations">Book Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-center mb-12">
            Get Clarity On What Matters Most
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {outcomes.map((outcome, i) => (
              <Card
                key={i}
                className="p-6 text-center hover-elevate cursor-pointer transition-all"
                data-testid={`card-outcome-${i}`}
              >
                <outcome.icon
                  className={`h-8 w-8 mx-auto mb-3 ${outcome.color}`}
                />
                <div className="font-semibold text-sm">{outcome.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">
              Comprehensive Analysis Tools
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform provides deep insights across multiple
              dimensions of your life
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <Card
                key={i}
                className="p-6 hover-elevate transition-all"
                data-testid={`card-feature-${i}`}
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 border-b bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6">
                Why Choose AstroKalki AI?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <div className="font-semibold mb-1">Privacy First</div>
                    <div className="text-sm text-muted-foreground">
                      Your data is encrypted and never sold to third parties
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Activity className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-semibold mb-1">
                      Actionable Insights
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Specific guidance you can implement today, not vague
                      predictions
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <div className="font-semibold mb-1">
                      AI-Powered Accuracy
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Leveraging Google Gemini for deep pattern analysis
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-8">
              <h3 className="text-xl font-heading font-bold mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-muted-foreground mb-6">
                Begin with a free Karma DNA analysis or book a personalized
                consultation with our experts.
              </p>
              <div className="space-y-3">
                <Button
                  className="w-full"
                  size="lg"
                  asChild
                  data-testid="button-free-analysis"
                >
                  <Link href="/karma">Try Free Analysis</Link>
                </Button>
                <Button
                  className="w-full"
                  variant="outline"
                  size="lg"
                  asChild
                  data-testid="button-pricing"
                >
                  <Link href="/billing">View Pricing</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
