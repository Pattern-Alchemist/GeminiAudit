import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Loader2 } from "lucide-react";

interface AnalysisStep {
  label: string;
  completed: boolean;
}

interface AnalysisProgressProps {
  steps: AnalysisStep[];
  currentStep: number;
}

export function AnalysisProgress({ steps, currentStep }: AnalysisProgressProps) {
  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="space-y-4" data-testid="analysis-progress">
      <Progress value={progress} className="h-2" />
      <div className="space-y-2">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className="flex items-center gap-3 text-sm"
            data-testid={`progress-step-${index}`}
          >
            {step.completed ? (
              <CheckCircle2 className="h-4 w-4 text-success" />
            ) : index === currentStep ? (
              <Loader2 className="h-4 w-4 text-primary animate-spin" />
            ) : (
              <div className="h-4 w-4 rounded-full border-2 border-muted" />
            )}
            <span className={step.completed ? "text-foreground" : index === currentStep ? "text-primary font-medium" : "text-muted-foreground"}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
