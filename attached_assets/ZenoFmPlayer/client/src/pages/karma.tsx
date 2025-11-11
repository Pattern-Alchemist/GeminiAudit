import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScoreRing } from "@/components/ScoreRing";
import { computeKarmaDNA, scanKarmicDebts } from "@/lib/karma";
import type { KarmaForm } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dna, AlertTriangle, Calendar, Radar, Users } from "lucide-react";

export default function Karma() {
  const [dnaForm, setDnaForm] = useState<KarmaForm>({
    name: "",
    date: "",
    time: "",
    place: "",
  });

  const [debtName, setDebtName] = useState("");
  const [debtDob, setDebtDob] = useState("");

  const dnaOutput = useMemo(
    () => (dnaForm.name && dnaForm.date ? computeKarmaDNA(dnaForm) : null),
    [dnaForm]
  );

  const debts = useMemo(
    () => (debtName ? scanKarmicDebts(debtName, debtDob) : []),
    [debtName, debtDob]
  );

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <h1 className="font-serif text-4xl font-extrabold mb-8" data-testid="text-karma-title">
        Karma Engine
      </h1>

      <Tabs defaultValue="dna" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8" data-testid="tabs-karma-tools">
          <TabsTrigger value="dna" className="flex items-center gap-2" data-testid="tab-dna">
            <Dna className="h-4 w-4" />
            <span className="hidden sm:inline">DNA</span>
          </TabsTrigger>
          <TabsTrigger value="debts" className="flex items-center gap-2" data-testid="tab-debts">
            <AlertTriangle className="h-4 w-4" />
            <span className="hidden sm:inline">Debts</span>
          </TabsTrigger>
          <TabsTrigger value="impacts" className="flex items-center gap-2" data-testid="tab-impacts">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Impacts</span>
          </TabsTrigger>
          <TabsTrigger value="radar" className="flex items-center gap-2" data-testid="tab-radar">
            <Radar className="h-4 w-4" />
            <span className="hidden sm:inline">Radar</span>
          </TabsTrigger>
          <TabsTrigger value="bond" className="flex items-center gap-2" data-testid="tab-bond">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Bond</span>
          </TabsTrigger>
        </TabsList>

        {/* Karma DNA */}
        <TabsContent value="dna">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6 shadow-xl" data-testid="card-dna-form">
              <h2 className="font-serif text-2xl font-bold mb-6">Karma DNA</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={dnaForm.name}
                    onChange={(e) =>
                      setDnaForm({ ...dnaForm, name: e.target.value })
                    }
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <Label htmlFor="date">Birth Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={dnaForm.date}
                    onChange={(e) =>
                      setDnaForm({ ...dnaForm, date: e.target.value })
                    }
                    data-testid="input-date"
                  />
                </div>
                <div>
                  <Label htmlFor="time">Birth Time (Optional)</Label>
                  <Input
                    id="time"
                    type="time"
                    value={dnaForm.time}
                    onChange={(e) =>
                      setDnaForm({ ...dnaForm, time: e.target.value })
                    }
                    data-testid="input-time"
                  />
                </div>
                <div>
                  <Label htmlFor="place">Birth Place (Optional)</Label>
                  <Input
                    id="place"
                    placeholder="City, Country"
                    value={dnaForm.place}
                    onChange={(e) =>
                      setDnaForm({ ...dnaForm, place: e.target.value })
                    }
                    data-testid="input-place"
                  />
                </div>
                <Button
                  className="w-full bg-primary/15 hover:bg-primary/25 text-primary border-primary/45"
                  onClick={() => setDnaForm({ ...dnaForm })}
                  data-testid="button-generate-dna"
                >
                  Generate Karma DNA
                </Button>
              </div>
            </Card>

            <Card className="p-6 shadow-xl" data-testid="card-dna-results">
              {!dnaOutput ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-muted-foreground text-center max-w-md">
                    Fill your birth details to see your Core Lesson, Shadow
                    Trigger, Boundary Rule and Activation Window.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <h2 className="font-serif text-2xl font-bold">Your Results</h2>
                  <div className="grid grid-cols-3 gap-4">
                    <ScoreRing
                      label="Integrity"
                      value={dnaOutput.scores.integrity}
                    />
                    <ScoreRing
                      label="Reciprocity"
                      value={dnaOutput.scores.reciprocity}
                    />
                    <ScoreRing label="Value" value={dnaOutput.scores.value} />
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <strong className="text-foreground">Core Lesson:</strong>{" "}
                      <span className="text-muted-foreground" data-testid="text-core-lesson">
                        {dnaOutput.core}
                      </span>
                    </div>
                    <div>
                      <strong className="text-foreground">Shadow Trigger:</strong>{" "}
                      <span className="text-muted-foreground" data-testid="text-shadow-trigger">
                        {dnaOutput.shadow}
                      </span>
                    </div>
                    <div>
                      <strong className="text-foreground">Boundary Rule:</strong>{" "}
                      <span className="text-muted-foreground" data-testid="text-boundary-rule">
                        {dnaOutput.boundary}
                      </span>
                    </div>
                    <div>
                      <strong className="text-foreground">Activation Window:</strong>{" "}
                      <span className="text-muted-foreground" data-testid="text-activation-window">
                        {dnaOutput.window.start} → {dnaOutput.window.end}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </TabsContent>

        {/* Karmic Debts */}
        <TabsContent value="debts">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6 shadow-xl" data-testid="card-debts-form">
              <h2 className="font-serif text-2xl font-bold mb-6">Karmic Debts</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="debt-name">Full Name</Label>
                  <Input
                    id="debt-name"
                    placeholder="Enter your full name"
                    value={debtName}
                    onChange={(e) => setDebtName(e.target.value)}
                    data-testid="input-debt-name"
                  />
                </div>
                <div>
                  <Label htmlFor="debt-dob">Birth Date</Label>
                  <Input
                    id="debt-dob"
                    type="date"
                    value={debtDob}
                    onChange={(e) => setDebtDob(e.target.value)}
                    data-testid="input-debt-dob"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-xl" data-testid="card-debts-results">
              {debts.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-muted-foreground text-center max-w-md">
                    Enter your name + date of birth to see potential Karmic Debt
                    flags and micro-actions.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h2 className="font-serif text-2xl font-bold">Your Debts</h2>
                  {debts.map((debt, i) => (
                    <Card key={i} className="p-4 border-destructive/30" data-testid={`card-debt-${debt.code}`}>
                      <div className="flex items-start gap-3">
                        <Badge className="bg-destructive/15 text-destructive border-destructive/40" data-testid={`badge-debt-code-${debt.code}`}>
                          {debt.code}
                        </Badge>
                        <div className="flex-1">
                          <div className="font-bold text-sm mb-1" data-testid={`text-debt-label-${debt.code}`}>
                            {debt.label}
                          </div>
                          <div className="text-xs text-muted-foreground mb-2" data-testid={`text-debt-why-${debt.code}`}>
                            {debt.why}
                          </div>
                          <div className="text-xs">
                            <strong className="text-foreground">Micro-action:</strong>{" "}
                            <span className="text-muted-foreground" data-testid={`text-debt-action-${debt.code}`}>
                              {debt.action}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </TabsContent>

        {/* Impact Windows */}
        <TabsContent value="impacts">
          <Card className="p-6 shadow-xl" data-testid="card-impact-windows">
            <h2 className="font-serif text-2xl font-bold mb-6">
              Impact Windows (Next 90 days)
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: "Break Pattern",
                  dates: "22 Nov → 02 Dec",
                  action: "Undo a repeating loop by making the uncomfortable call.",
                },
                {
                  title: "Test of Integrity",
                  dates: "10 Dec → 16 Dec",
                  action: "Say no once where you usually rescue.",
                },
                {
                  title: "Opportunity Gate",
                  dates: "28 Dec → 06 Jan",
                  action: "Send 3 clean asks with a crisp offer.",
                },
              ].map((window, i) => (
                <Card key={i} className="p-5" data-testid={`card-window-${i}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="font-bold text-lg">{window.title}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {window.dates}
                      </div>
                      <p className="text-sm text-muted-foreground mt-3">
                        {window.action}
                      </p>
                    </div>
                    <Badge className="bg-primary/10 text-primary border-primary/30">
                      Active
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Radar */}
        <TabsContent value="radar">
          <Card className="p-6 shadow-xl" data-testid="card-radar">
            <h2 className="font-serif text-2xl font-bold mb-4">House Radar</h2>
            <p className="text-muted-foreground mb-6">
              SAV-lite heat-map showing energy leaks across life areas. Coming
              soon.
            </p>
            <div className="h-64 flex items-center justify-center bg-card-border/30 rounded-lg">
              <span className="text-muted-foreground">Radar visualization</span>
            </div>
          </Card>
        </TabsContent>

        {/* Bond Karma */}
        <TabsContent value="bond">
          <Card className="p-6 shadow-xl" data-testid="card-bond">
            <h2 className="font-serif text-2xl font-bold mb-4">Bond Karma</h2>
            <p className="text-muted-foreground mb-6">
              Saturn + Nodes synastry analysis: why you met, where you clash, how
              to heal. Coming soon.
            </p>
            <div className="h-64 flex items-center justify-center bg-card-border/30 rounded-lg">
              <span className="text-muted-foreground">Bond analysis form</span>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
