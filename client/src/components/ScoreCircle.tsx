interface ScoreCircleProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  showLabel?: boolean;
}

export function ScoreCircle({ score, size = 'md', label, showLabel = true }: ScoreCircleProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  const labelSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const getColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 50) return 'text-warning';
    return 'text-destructive';
  };

  const getStrokeColor = (score: number) => {
    if (score >= 90) return 'hsl(var(--success))';
    if (score >= 50) return 'hsl(var(--warning))';
    return 'hsl(var(--destructive))';
  };

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2" data-testid={`score-circle-${label?.toLowerCase()}`}>
      <div className={`relative ${sizeClasses[size]}`}>
        <svg className="transform -rotate-90" width="100%" height="100%" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={getStrokeColor(score)}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-bold ${getColor(score)} ${textSizeClasses[size]}`} data-testid={`score-value-${label?.toLowerCase()}`}>
            {Math.round(score)}
          </span>
        </div>
      </div>
      {showLabel && label && (
        <span className={`text-muted-foreground font-medium ${labelSizeClasses[size]}`} data-testid={`score-label-${label.toLowerCase()}`}>
          {label}
        </span>
      )}
    </div>
  );
}
