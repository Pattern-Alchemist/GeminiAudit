import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Radio as RadioIcon, ExternalLink, Clock } from "lucide-react";

export default function Radio() {
  const zenoUrl = "https://zeno.fm/player/astrokalki-live";

  const schedule = [
    {
      time: "6:00 AM",
      title: "Morning Mantra",
      description: "Daily intentions & spiritual awakening"
    },
    {
      time: "12:00 PM",
      title: "Karma Pulse",
      description: "Live readings & cosmic guidance"
    },
    {
      time: "7:00 PM",
      title: "Evening Reflection",
      description: "Guided meditation & daily review"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20" data-testid="badge-live-stream">
            Live Stream
          </Badge>
          <div className="flex items-center justify-center gap-3 mb-4">
            <RadioIcon className="h-10 w-10 text-primary" />
            <h1 className="text-4xl sm:text-5xl font-heading font-bold" data-testid="text-radio-title">
              AstroKalki Live
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tune in for cosmic insights, guided meditations, and karmic wisdom broadcasting 24/7
          </p>
        </div>

        {/* Radio Player */}
        <Card className="p-6 mb-8" data-testid="card-radio-player">
          <div className="aspect-video w-full mb-4 rounded-md overflow-hidden bg-muted">
            <iframe
              title="ASTROKALKI LIVE – Zeno.FM"
              src={zenoUrl}
              className="w-full h-full"
              frameBorder={0}
              scrolling="no"
              loading="lazy"
              data-testid="iframe-zeno-player"
            />
          </div>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="text-sm text-muted-foreground">
              Powered by{" "}
              <a
                href="https://zeno.fm/"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                Zeno.FM
              </a>
            </div>
            <Button
              size="sm"
              variant="outline"
              asChild
              data-testid="button-open-new-tab"
            >
              <a href={zenoUrl} target="_blank" rel="noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in New Tab
              </a>
            </Button>
          </div>
        </Card>

        {/* Schedule & About Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Schedule */}
          <Card className="p-6" data-testid="card-schedule">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-heading font-bold">Daily Schedule</h2>
            </div>
            <div className="space-y-4">
              {schedule.map((item, i) => (
                <div key={i} className="flex justify-between items-start gap-4" data-testid={`schedule-item-${i}`}>
                  <div className="flex-1">
                    <div className="font-semibold mb-1">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                  </div>
                  <Badge variant="outline" className="text-xs whitespace-nowrap">
                    {item.time}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* About */}
          <Card className="p-6" data-testid="card-about">
            <h2 className="text-xl font-heading font-bold mb-4">About the Stream</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              AstroKalki Live broadcasts curated content to support your spiritual
              journey. From morning mantras to evening reflections, we blend ancient
              Vedic wisdom with modern insights.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All streams are recorded and available for Pro members to access anytime.
            </p>
            <Button className="mt-4 w-full" variant="outline" data-testid="button-upgrade-for-archives">
              Upgrade for Archive Access
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
