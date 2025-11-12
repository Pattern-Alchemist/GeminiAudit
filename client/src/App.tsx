import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";

import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import Karma from "@/pages/karma";
import Consultations from "@/pages/consultations";
import Billing from "@/pages/billing";
import Radio from "@/pages/radio";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/karma" component={Karma} />
          <Route path="/consultations" component={Consultations} />
          <Route path="/radio" component={Radio} />
          <Route path="/billing" component={Billing} />
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
