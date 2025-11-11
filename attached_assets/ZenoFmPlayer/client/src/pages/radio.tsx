import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Radio as RadioIcon, ExternalLink } from "lucide-react";

export default function Radio() {
  const zenoUrl = "https://zeno.fm/player/astrokalki-live";

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <RadioIcon className="h-10 w-10 text-primary" />
          <h1 className="font-serif text-5xl font-extrabold" data-testid="text-radio-title">
            Live Radio
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Tune in to AstroKalki Live - cosmic insights, guided meditations, and
          karmic wisdom 24/7
        </p>
      </div>

      <Card className="p-4 shadow-2xl" data-testid="card-radio-player">
        <div className="aspect-video w-full mb-4 rounded-lg overflow-hidden">
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
          <div className="text-xs text-muted-foreground">
            Powered by{" "}
            <a
              href="https://zeno.fm/"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-foreground"
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

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <Card className="p-6 shadow-xl" data-testid="card-schedule">
          <h2 className="font-serif text-xl font-bold mb-4">Schedule</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold">Morning Mantra</div>
                <div className="text-muted-foreground">Daily intentions</div>
              </div>
              <div className="text-muted-foreground">6:00 AM</div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold">Karma Pulse</div>
                <div className="text-muted-foreground">Live readings</div>
              </div>
              <div className="text-muted-foreground">12:00 PM</div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold">Evening Reflection</div>
                <div className="text-muted-foreground">Guided meditation</div>
              </div>
              <div className="text-muted-foreground">7:00 PM</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-xl" data-testid="card-about">
          <h2 className="font-serif text-xl font-bold mb-4">About the Stream</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            AstroKalki Live broadcasts curated content to support your spiritual
            journey. From morning mantras to evening reflections, we blend ancient
            wisdom with modern insights. All streams are recorded and available for
            Pro members.
          </p>
        </Card>
      </div>
    </div>
  );
}
