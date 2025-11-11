interface ScoreRingProps {
  value: number;
  label: string;
}

export function ScoreRing({ value, label }: ScoreRingProps) {
  const r = 26;
  const c = 2 * Math.PI * r;
  const o = c - (value / 100) * c;
  
  // Color based on thresholds: 70+ = success (teal), 40-69 = warning (gold), <40 = danger (rose)
  const strokeColor = 
    value >= 70 
      ? "hsl(var(--success))" 
      : value >= 40 
      ? "hsl(var(--warning))" 
      : "hsl(var(--destructive))";

  return (
    <div className="flex flex-col items-center gap-1" data-testid={`score-ring-${label.toLowerCase()}`}>
      <svg width={72} height={72} viewBox="0 0 72 72">
        <circle
          cx={36}
          cy={36}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,.1)"
          strokeWidth={8}
        />
        <circle
          cx={36}
          cy={36}
          r={r}
          fill="none"
          stroke={strokeColor}
          strokeWidth={8}
          strokeDasharray={c}
          strokeDashoffset={o}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.8s ease-out" }}
        />
        <text
          x={36}
          y={40}
          textAnchor="middle"
          fontSize={12}
          fill="currentColor"
          fontWeight={700}
        >
          {value}
        </text>
      </svg>
      <div className="text-xs text-muted-foreground" data-testid={`text-${label.toLowerCase()}-score`}>{label}</div>
    </div>
  );
}
