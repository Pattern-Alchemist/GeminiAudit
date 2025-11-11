import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScoreRing } from "@/components/ScoreRing";
import { Link } from "wouter";
import { CheckCircle2, FileText } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <h1 className="font-serif text-4xl font-extrabold mb-8" data-testid="text-dashboard-title">Your Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Today's Pulse */}
        <Card className="p-6 shadow-xl" data-testid="card-todays-pulse">
          <h2 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Today's Pulse
          </h2>
          <div className="space-y-3 text-sm">
            <div>
              <strong className="text-foreground">DO:</strong>{" "}
              <span className="text-muted-foreground">
                Send one clean ask to a warm lead.
              </span>
            </div>
            <div>
              <strong className="text-foreground">AVOID:</strong>{" "}
              <span className="text-muted-foreground">
                Delaying uncomfortable replies.
              </span>
            </div>
            <div>
              <strong className="text-foreground">CONNECT:</strong>{" "}
              <span className="text-muted-foreground">
                Voice note to the person you've been avoiding.
              </span>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button
              size="sm"
              className="bg-primary/15 hover:bg-primary/25 text-primary border-primary/45"
              data-testid="button-mark-done"
            >
              Done
            </Button>
            <Button size="sm" variant="outline" data-testid="button-log-truth">
              Log truth
            </Button>
          </div>
        </Card>

        {/* Scores */}
        <Card className="p-6 shadow-xl" data-testid="card-scores">
          <h2 className="font-serif text-xl font-bold mb-4">Your Scores</h2>
          <div className="grid grid-cols-3 gap-4">
            <ScoreRing label="Integrity" value={72} />
            <ScoreRing label="Reciprocity" value={64} />
            <ScoreRing label="Value" value={78} />
          </div>
        </Card>

        {/* Next Impact Window */}
        <Card className="p-6 shadow-xl" data-testid="card-impact-window">
          <h2 className="font-serif text-xl font-bold mb-4">Next Impact Window</h2>
          <div className="text-sm mb-4">
            <div className="font-semibold text-foreground">Break Pattern</div>
            <div className="text-muted-foreground">22 Nov → 02 Dec</div>
          </div>
          <Button
            variant="outline"
            size="sm"
            asChild
            data-testid="button-open-timeline"
          >
            <Link href="/karma">Open timeline</Link>
          </Button>
        </Card>
      </div>

      {/* Recent Reads */}
      <Card className="p-6 shadow-xl" data-testid="card-recent-reads">
        <h2 className="font-serif text-2xl font-bold mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Recent Reads
        </h2>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span className="text-muted-foreground">
              <strong className="text-foreground">DNA</strong> · Core Lesson:
              Boundaries before rescue
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span className="text-muted-foreground">
              <strong className="text-foreground">Debts</strong> · 14: Freedom
              requires structure
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span className="text-muted-foreground">
              <strong className="text-foreground">Bond</strong> · Why you met:
              Saturn mutual lesson
            </span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
