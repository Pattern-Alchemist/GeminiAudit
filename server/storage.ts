import type { UserPlan, InsertPaymentProof } from "@shared/schema";

export interface IStorage {
  getUserPlan(): Promise<UserPlan>;
  upgradeToPro(proof: InsertPaymentProof): Promise<UserPlan>;
}

export class MemStorage implements IStorage {
  private userPlan: UserPlan;

  constructor() {
    this.userPlan = {
      plan: "free",
    };
  }

  async getUserPlan(): Promise<UserPlan> {
    return this.userPlan;
  }

  async upgradeToPro(proof: InsertPaymentProof): Promise<UserPlan> {
    // In a real app, you would verify the payment with the payment gateway
    // For now, we just upgrade the plan
    this.userPlan = {
      plan: "pro",
      upgradedAt: new Date().toISOString(),
      paymentMethod: "upi",
      transactionId: proof.utr,
    };
    return this.userPlan;
  }
}

export const storage = new MemStorage();
