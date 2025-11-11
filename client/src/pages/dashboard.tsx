import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ScoreCircle } from "@/components/ScoreCircle";
import { TrendingUp, Calendar, Activity, ArrowRight } from "lucide-react";

export default function Dashboard() {
  // Mock data - will be replaced with actual API data
  const todaysPulse = {
    doAction: "Send one clear request to a potential collaborator",
    avoidAction: "Procrastinating on important conversations",
    connectAction: "Reach out to someone you've been thinking about"
  };

  const scores = {
    integrity: 78,
    reciprocity: 65,
    value: 82
  };

  const nextWindow = {
    title: "Transformation Phase",
    startDate: "2024-12-01",
    endDate: "2024-12-15",
    description: "Ideal for breaking old patterns and establishing new foundations"
  };

  const recentAnalyses = [
    { type: "Karma DNA", date: "2024-11-10", status: "Complete" },
    { type: "Karmic Debts", date: "2024-11-09", status: "Complete" },
    { type: "Impact Windows", date: "2024-11-08", status: "Complete" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-2" data-testid="text-dashboard-title">
            Your Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track your progress and insights
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Today's Guidance */}
          <Card className="p-6 lg:col-span-2" data-testid="card-todays-guidance">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-heading font-bold">Today's Guidance</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-success/10 border border-success/20 rounded-md">
                <div className="flex items-start gap-2">
                  <span className="text-success font-bold">DO:</span>
                  <span className="text-foreground flex-1">{todaysPulse.doAction}</span>
                </div>
              </div>
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md">
                <div className="flex items-start gap-2">
                  <span className="text-destructive font-bold">AVOID:</span>
                  <span className="text-foreground flex-1">{todaysPulse.avoidAction}</span>
                </div>
              </div>
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-md">
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">CONNECT:</span>
                  <span className="text-foreground flex-1">{todaysPulse.connectAction}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button size="sm" data-testid="button-mark-complete">
                Mark Complete
              </Button>
              <Button size="sm" variant="outline" data-testid="button-journal">
                Add to Journal
              </Button>
            </div>
          </Card>

          {/* Your Scores */}
          <Card className="p-6" data-testid="card-your-scores">
            <h2 className="text-xl font-heading font-bold mb-6">Your Scores</h2>
            <div className="flex flex-col gap-6">
              <ScoreCircle score={scores.integrity} label="Integrity" size="sm" />
              <ScoreCircle score={scores.reciprocity} label="Reciprocity" size="sm" />
              <ScoreCircle score={scores.value} label="Value" size="sm" />
            </div>
            <Button variant="outline" className="w-full mt-6" size="sm" asChild data-testid="button-view-full-analysis">
              <Link href="/karma">
                View Full Analysis
              </Link>
            </Button>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Next Impact Window */}
          <Card className="p-6" data-testid="card-next-impact">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-heading font-bold">Next Impact Window</h2>
            </div>
            <div className="space-y-3">
              <div>
                <div className="font-bold text-lg">{nextWindow.title}</div>
                <div className="text-sm text-muted-foreground">
                  {nextWindow.startDate} to {nextWindow.endDate}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {nextWindow.description}
              </p>
              <Badge className="bg-primary/10 text-primary border-primary/20">
                Upcoming
              </Badge>
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm" asChild data-testid="button-view-all-windows">
              <Link href="/karma?tab=impact">
                View All Windows
              </Link>
            </Button>
          </Card>

          {/* Recent Analyses */}
          <Card className="p-6" data-testid="card-recent-analyses">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-heading font-bold">Recent Analyses</h2>
            </div>
            <div className="space-y-3">
              {recentAnalyses.map((analysis, i) => (
                <div 
                  key={i} 
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-md hover-elevate cursor-pointer"
                  data-testid={`analysis-item-${i}`}
                >
                  <div>
                    <div className="font-semibold text-sm">{analysis.type}</div>
                    <div className="text-xs text-muted-foreground">{analysis.date}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">
                      {analysis.status}
                    </Badge>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm" asChild data-testid="button-new-analysis">
              <Link href="/karma">
                Run New Analysis
              </Link>
            </Button>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6" data-testid="card-quick-actions">
          <h2 className="text-xl font-heading font-bold mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild data-testid="button-karma-dna">
              <Link href="/karma?tab=dna">
                <Activity className="h-5 w-5" />
                <span>Karma DNA</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild data-testid="button-compatibility">
              <Link href="/karma?tab=compatibility">
                <TrendingUp className="h-5 w-5" />
                <span>Compatibility</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild data-testid="button-book-consultation">
              <Link href="/consultations">
                <Calendar className="h-5 w-5" />
                <span>Book Session</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild data-testid="button-upgrade">
              <Link href="/billing">
                <TrendingUp className="h-5 w-5" />
                <span>Upgrade Plan</span>
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
