import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        
        <h1 className="text-4xl font-heading font-bold mb-2" data-testid="text-404-title">404</h1>
        <h2 className="text-xl font-heading font-semibold mb-4">Page Not Found</h2>
        
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild data-testid="button-go-home">
            <Link href="/">Go Home</Link>
          </Button>
          <Button variant="outline" asChild data-testid="button-start-analysis">
            <Link href="/karma">Start Analysis</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
