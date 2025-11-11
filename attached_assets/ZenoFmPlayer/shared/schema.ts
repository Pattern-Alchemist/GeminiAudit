import { z } from "zod";

// Karma DNA Form and Output Types
export const karmaFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  date: z.string().min(1, "Birth date is required"),
  time: z.string().optional(),
  place: z.string().optional(),
});

export type KarmaForm = z.infer<typeof karmaFormSchema>;

export const karmaOutputSchema = z.object({
  scores: z.object({
    integrity: z.number().min(0).max(100),
    reciprocity: z.number().min(0).max(100),
    value: z.number().min(0).max(100),
  }),
  core: z.string(),
  shadow: z.string(),
  boundary: z.string(),
  window: z.object({
    start: z.string(),
    end: z.string(),
  }),
});

export type KarmaOutput = z.infer<typeof karmaOutputSchema>;

// Karmic Debt Types
export const karmicDebtSchema = z.object({
  code: z.union([z.literal(13), z.literal(14), z.literal(16), z.literal(19)]),
  label: z.string(),
  why: z.string(),
  action: z.string(),
});

export type KarmicDebt = z.infer<typeof karmicDebtSchema>;

// Payment Plan Types
export type PlanType = "free" | "pro";

export const paymentProofSchema = z.object({
  utr: z.string().min(6, "UTR must be at least 6 characters"),
  timestamp: z.string().optional(),
});

export type PaymentProof = z.infer<typeof paymentProofSchema>;

// User Plan Status
export const userPlanSchema = z.object({
  plan: z.enum(["free", "pro"]),
  upgradedAt: z.string().optional(),
  paymentMethod: z.enum(["upi", "paypal"]).optional(),
  transactionId: z.string().optional(),
});

export type UserPlan = z.infer<typeof userPlanSchema>;

// Insert schemas for API requests
export const insertPaymentProofSchema = paymentProofSchema;
export type InsertPaymentProof = z.infer<typeof insertPaymentProofSchema>;
