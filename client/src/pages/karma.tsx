import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScoreCircle } from "@/components/ScoreCircle";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { AnalysisProgress } from "@/components/AnalysisProgress";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { AnalysisRequest, KarmaDNAResult, KarmicDebtsResult, CompatibilityResult, ImpactWindowsResult } from "@shared/schema";
import { Dna, AlertTriangle, Calendar, Users, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Karma() {
  const { toast } = useToast();
  const [dnaForm, setDnaForm] = useState<AnalysisRequest>({
    name: "",
    birthDate: "",
    birthTime: "",
    birthPlace: "",
  });

  const [debtsForm, setDebtsForm] = useState<AnalysisRequest>({
    name: "",
    birthDate: "",
    birthTime: "",
    birthPlace: "",
  });

  // Karma DNA Mutation
  const karmaDNAMutation = useMutation({
    mutationFn: async (data: AnalysisRequest) => {
      const result = await apiRequest<KarmaDNAResult>("POST", "/api/analysis/karma-dna", data);
      return result;
    },
    onSuccess: () => {
      toast({
        title: "Analysis Complete",
        description: "Your Karma DNA analysis is ready!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Analysis Failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    },
  });

  // Karmic Debts Mutation
  const karmicDebtsMutation = useMutation({
    mutationFn: async (data: AnalysisRequest) => {
      const result = await apiRequest<KarmicDebtsResult>("POST", "/api/analysis/karmic-debts", data);
      return result;
    },
    onSuccess: () => {
      toast({
        title: "Analysis Complete",
        description: "Your Karmic Debts analysis is ready!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Analysis Failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    },
  });

  const handleKarmaDNASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dnaForm.name || !dnaForm.birthDate) {
      toast({
        title: "Missing Information",
        description: "Please provide your name and birth date",
        variant: "destructive",
      });
      return;
    }
    karmaDNAMutation.mutate(dnaForm);
  };

  const handleDebtsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!debtsForm.name || !debtsForm.birthDate) {
      toast({
        title: "Missing Information",
        description: "Please provide your name and birth date",
        variant: "destructive",
      });
      return;
    }
    karmicDebtsMutation.mutate(debtsForm);
  };

  const analysisSteps = [
    { label: "Processing birth data", completed: karmaDNAMutation.isPending },
    { label: "Analyzing patterns with AI", completed: false },
    { label: "Generating insights", completed: false },
    { label: "Preparing results", completed: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-2" data-testid="text-karma-title">
            AI-Powered Analysis Tools
          </h1>
          <p className="text-muted-foreground">
            Get deep insights powered by Google Gemini AI
          </p>
        </div>

        <Tabs defaultValue="dna" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8" data-testid="tabs-analysis-tools">
            <TabsTrigger value="dna" className="flex items-center gap-2" data-testid="tab-dna">
              <Dna className="h-4 w-4" />
              <span className="hidden sm:inline">DNA Analysis</span>
              <span className="sm:hidden">DNA</span>
            </TabsTrigger>
            <TabsTrigger value="debts" className="flex items-center gap-2" data-testid="tab-debts">
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">Karmic Debts</span>
              <span className="sm:hidden">Debts</span>
            </TabsTrigger>
            <TabsTrigger value="compatibility" className="flex items-center gap-2" data-testid="tab-compatibility">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Compatibility</span>
              <span className="sm:hidden">Match</span>
            </TabsTrigger>
            <TabsTrigger value="impact" className="flex items-center gap-2" data-testid="tab-impact">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Impact Windows</span>
              <span className="sm:hidden">Windows</span>
            </TabsTrigger>
            <TabsTrigger value="guidance" className="flex items-center gap-2" data-testid="tab-guidance">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">Daily Guidance</span>
              <span className="sm:hidden">Daily</span>
            </TabsTrigger>
          </TabsList>

          {/* Karma DNA Tab */}
          <TabsContent value="dna">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6" data-testid="card-dna-form">
                <h2 className="text-2xl font-heading font-bold mb-6">Karma DNA Analysis</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Discover your core life patterns, strengths, and growth opportunities using AI-powered astrological analysis.
                </p>
                <form onSubmit={handleKarmaDNASubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="dna-name">Full Name *</Label>
                    <Input
                      id="dna-name"
                      placeholder="Enter your full name"
                      value={dnaForm.name}
                      onChange={(e) => setDnaForm({ ...dnaForm, name: e.target.value })}
                      data-testid="input-dna-name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="dna-date">Birth Date *</Label>
                    <Input
                      id="dna-date"
                      type="date"
                      value={dnaForm.birthDate}
                      onChange={(e) => setDnaForm({ ...dnaForm, birthDate: e.target.value })}
                      data-testid="input-dna-date"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="dna-time">Birth Time (Optional)</Label>
                    <Input
                      id="dna-time"
                      type="time"
                      value={dnaForm.birthTime}
                      onChange={(e) => setDnaForm({ ...dnaForm, birthTime: e.target.value })}
                      data-testid="input-dna-time"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dna-place">Birth Place (Optional)</Label>
                    <Input
                      id="dna-place"
                      placeholder="City, Country"
                      value={dnaForm.birthPlace}
                      onChange={(e) => setDnaForm({ ...dnaForm, birthPlace: e.target.value })}
                      data-testid="input-dna-place"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={karmaDNAMutation.isPending}
                    data-testid="button-analyze-dna"
                  >
                    {karmaDNAMutation.isPending ? "Analyzing..." : "Analyze My Karma DNA"}
                  </Button>
                </form>
              </Card>

              <Card className="p-6" data-testid="card-dna-results">
                {karmaDNAMutation.isPending ? (
                  <div>
                    <h2 className="text-2xl font-heading font-bold mb-6">Analyzing Your Data...</h2>
                    <AnalysisProgress steps={analysisSteps} currentStep={1} />
                  </div>
                ) : karmaDNAMutation.data ? (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-heading font-bold">Your Karma DNA Results</h2>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <ScoreCircle 
                        score={karmaDNAMutation.data.integrityScore} 
                        label="Integrity" 
                        size="sm" 
                      />
                      <ScoreCircle 
                        score={karmaDNAMutation.data.reciprocityScore} 
                        label="Reciprocity" 
                        size="sm" 
                      />
                      <ScoreCircle 
                        score={karmaDNAMutation.data.valueScore} 
                        label="Value" 
                        size="sm" 
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-primary/10 border border-primary/20 rounded-md">
                        <div className="font-bold text-sm mb-2">Core Lesson</div>
                        <div className="text-sm" data-testid="text-core-lesson">
                          {karmaDNAMutation.data.coreLesson}
                        </div>
                      </div>

                      <div className="p-4 bg-warning/10 border border-warning/20 rounded-md">
                        <div className="font-bold text-sm mb-2">Shadow Trigger</div>
                        <div className="text-sm" data-testid="text-shadow-trigger">
                          {karmaDNAMutation.data.shadowTrigger}
                        </div>
                      </div>

                      <div className="p-4 bg-success/10 border border-success/20 rounded-md">
                        <div className="font-bold text-sm mb-2">Boundary Rule</div>
                        <div className="text-sm" data-testid="text-boundary-rule">
                          {karmaDNAMutation.data.boundaryRule}
                        </div>
                      </div>

                      <div>
                        <div className="font-bold text-sm mb-2">Action Steps</div>
                        <ul className="space-y-2">
                          {karmaDNAMutation.data.actionSteps.map((step, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <span className="text-primary">•</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-muted-foreground text-center max-w-md">
                      Enter your birth details to receive your personalized Karma DNA analysis powered by AI.
                    </p>
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>

          {/* Karmic Debts Tab */}
          <TabsContent value="debts">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6" data-testid="card-debts-form">
                <h2 className="text-2xl font-heading font-bold mb-6">Karmic Debts Analysis</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Identify and understand recurring patterns that may be holding you back from your fullest potential.
                </p>
                <form onSubmit={handleDebtsSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="debts-name">Full Name *</Label>
                    <Input
                      id="debts-name"
                      placeholder="Enter your full name"
                      value={debtsForm.name}
                      onChange={(e) => setDebtsForm({ ...debtsForm, name: e.target.value })}
                      data-testid="input-debts-name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="debts-date">Birth Date *</Label>
                    <Input
                      id="debts-date"
                      type="date"
                      value={debtsForm.birthDate}
                      onChange={(e) => setDebtsForm({ ...debtsForm, birthDate: e.target.value })}
                      data-testid="input-debts-date"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={karmicDebtsMutation.isPending}
                    data-testid="button-analyze-debts"
                  >
                    {karmicDebtsMutation.isPending ? "Analyzing..." : "Scan Karmic Debts"}
                  </Button>
                </form>
              </Card>

              <Card className="p-6" data-testid="card-debts-results">
                {karmicDebtsMutation.isPending ? (
                  <LoadingSpinner message="Scanning for karmic patterns..." />
                ) : karmicDebtsMutation.data ? (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-heading font-bold">Your Karmic Debts</h2>
                    
                    {karmicDebtsMutation.data.debts.length === 0 ? (
                      <div className="text-center py-8">
                        <Badge className="bg-success/10 text-success border-success/20 mb-4">
                          Clear
                        </Badge>
                        <p className="text-muted-foreground">
                          No significant karmic debts detected. You're on a clear path!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {karmicDebtsMutation.data.debts.map((debt, i) => (
                          <Card 
                            key={i} 
                            className={`p-4 ${
                              debt.severity === 'high' ? 'border-destructive/30' :
                              debt.severity === 'medium' ? 'border-warning/30' :
                              'border-muted'
                            }`}
                            data-testid={`debt-card-${i}`}
                          >
                            <div className="flex items-start gap-3">
                              <Badge 
                                className={
                                  debt.severity === 'high' ? 'bg-destructive/15 text-destructive border-destructive/40' :
                                  debt.severity === 'medium' ? 'bg-warning/15 text-warning border-warning/40' :
                                  'bg-muted/15 text-muted-foreground border-muted/40'
                                }
                              >
                                {debt.code}
                              </Badge>
                              <div className="flex-1">
                                <div className="font-bold mb-1">{debt.title}</div>
                                <div className="text-sm text-muted-foreground mb-2">{debt.description}</div>
                                <div className="text-sm mb-2">
                                  <span className="font-semibold">Impact:</span> {debt.impact}
                                </div>
                                <div className="text-sm bg-success/10 border border-success/20 p-3 rounded-md">
                                  <span className="font-semibold text-success">Healing Action:</span> {debt.healingAction}
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}

                    {karmicDebtsMutation.data.overallGuidance && (
                      <div className="p-4 bg-primary/10 border border-primary/20 rounded-md">
                        <div className="font-bold text-sm mb-2">Overall Guidance</div>
                        <div className="text-sm">{karmicDebtsMutation.data.overallGuidance}</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-muted-foreground text-center max-w-md">
                      Enter your details to scan for karmic debt patterns and receive personalized healing guidance.
                    </p>
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>

          {/* Compatibility Tab */}
          <TabsContent value="compatibility">
            <Card className="p-8 text-center" data-testid="card-compatibility-coming-soon">
              <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-heading font-bold mb-4">Compatibility Analysis</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Deep relationship compatibility analysis will be available soon. This feature will provide insights into Mind, Heart, and Will compatibility between two people.
              </p>
              <Button variant="outline" data-testid="button-notify-compatibility">
                Notify Me When Available
              </Button>
            </Card>
          </TabsContent>

          {/* Impact Windows Tab */}
          <TabsContent value="impact">
            <Card className="p-8 text-center" data-testid="card-impact-coming-soon">
              <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-heading font-bold mb-4">Impact Windows</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                90-day impact window forecasting will be available soon. Get optimal timing for important decisions and actions.
              </p>
              <Button variant="outline" data-testid="button-notify-impact">
                Notify Me When Available
              </Button>
            </Card>
          </TabsContent>

          {/* Daily Guidance Tab */}
          <TabsContent value="guidance">
            <Card className="p-8 text-center" data-testid="card-guidance-coming-soon">
              <Sparkles className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-heading font-bold mb-4">Daily Guidance</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Personalized daily guidance and action steps will be available soon. Get specific DO/DON'T/CONNECT recommendations each day.
              </p>
              <Button variant="outline" data-testid="button-notify-guidance">
                Notify Me When Available
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
