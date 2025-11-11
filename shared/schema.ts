import { z } from "zod";

// Analysis Request Types
export const analysisRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  birthDate: z.string().min(1, "Birth date is required"),
  birthTime: z.string().optional(),
  birthPlace: z.string().optional(),
});

export type AnalysisRequest = z.infer<typeof analysisRequestSchema>;

// Karma DNA Analysis Result
export const karmaDNAResultSchema = z.object({
  coreLesson: z.string(),
  shadowTrigger: z.string(),
  boundaryRule: z.string(),
  strengthsAnalysis: z.string(),
  challengesAnalysis: z.string(),
  actionSteps: z.array(z.string()),
  integrityScore: z.number().min(0).max(100),
  reciprocityScore: z.number().min(0).max(100),
  valueScore: z.number().min(0).max(100),
  activationWindow: z.object({
    start: z.string(),
    end: z.string(),
    description: z.string(),
  }),
});

export type KarmaDNAResult = z.infer<typeof karmaDNAResultSchema>;

// Karmic Debts Analysis Result
export const karmicDebtsResultSchema = z.object({
  debts: z.array(z.object({
    code: z.number(),
    title: z.string(),
    description: z.string(),
    impact: z.string(),
    healingAction: z.string(),
    severity: z.enum(['low', 'medium', 'high']),
  })),
  overallGuidance: z.string(),
});

export type KarmicDebtsResult = z.infer<typeof karmicDebtsResultSchema>;

// Compatibility Analysis Request
export const compatibilityRequestSchema = z.object({
  person1: analysisRequestSchema,
  person2: analysisRequestSchema,
});

export type CompatibilityRequest = z.infer<typeof compatibilityRequestSchema>;

// Compatibility Analysis Result
export const compatibilityResultSchema = z.object({
  overallScore: z.number().min(0).max(100),
  mindCompatibility: z.number().min(0).max(100),
  heartCompatibility: z.number().min(0).max(100),
  willCompatibility: z.number().min(0).max(100),
  strengths: z.array(z.string()),
  challenges: z.array(z.string()),
  growthOpportunities: z.array(z.string()),
  bondPurpose: z.string(),
  recommendations: z.array(z.string()),
});

export type CompatibilityResult = z.infer<typeof compatibilityResultSchema>;

// Impact Windows Analysis Result
export const impactWindowsResultSchema = z.object({
  windows: z.array(z.object({
    title: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    description: z.string(),
    opportunities: z.array(z.string()),
    recommendations: z.array(z.string()),
    intensity: z.enum(['low', 'medium', 'high']),
  })),
  keyThemes: z.array(z.string()),
});

export type ImpactWindowsResult = z.infer<typeof impactWindowsResultSchema>;

// Payment Plan Types (keep existing for billing)
export type PlanType = "free" | "pro";

export const paymentProofSchema = z.object({
  utr: z.string().min(6, "UTR must be at least 6 characters"),
  amount: z.number().min(1),
  timestamp: z.string().optional(),
});

export type PaymentProof = z.infer<typeof paymentProofSchema>;

export const userPlanSchema = z.object({
  plan: z.enum(["free", "pro"]),
  upgradedAt: z.string().optional(),
  paymentMethod: z.enum(["upi", "paypal"]).optional(),
  transactionId: z.string().optional(),
});

export type UserPlan = z.infer<typeof userPlanSchema>;

export const insertPaymentProofSchema = paymentProofSchema;
export type InsertPaymentProof = z.infer<typeof insertPaymentProofSchema>;
