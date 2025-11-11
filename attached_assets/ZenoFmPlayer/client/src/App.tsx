import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import type { UserPlan } from "@shared/schema";

import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import Karma from "@/pages/karma";
import Plans from "@/pages/plans";
import Consultations from "@/pages/consultations";
import Billing from "@/pages/billing";
import Radio from "@/pages/radio";
import Concierge from "@/pages/concierge";
import NotFound from "@/pages/not-found";

function Router() {
  const { data: userPlan } = useQuery<UserPlan>({
    queryKey: ["/api/user/plan"],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header plan={userPlan?.plan} />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/karma" component={Karma} />
          <Route path="/plans" component={Plans} />
          <Route path="/consultations" component={Consultations} />
          <Route path="/billing" component={Billing} />
          <Route path="/radio" component={Radio} />
          <Route path="/concierge" component={Concierge} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
