import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { analyzeKarmaDNA, scanKarmicDebts, analyzeCompatibility } from "./gemini";
import { 
  analysisRequestSchema, 
  insertPaymentProofSchema,
  compatibilityRequestSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    const hasGeminiKey = !!process.env.GEMINI_API_KEY;
    res.json({ 
      status: "ok", 
      features: {
        aiAnalysis: hasGeminiKey
      }
    });
  });

  // Karma DNA Analysis
  app.post("/api/analysis/karma-dna", async (req, res) => {
    try {
      if (!process.env.GEMINI_API_KEY) {
        return res.status(503).json({ 
          error: "AI analysis is not configured. Please contact support." 
        });
      }

      const validatedData = analysisRequestSchema.parse(req.body);
      const result = await analyzeKarmaDNA(validatedData);
      res.json(result);
    } catch (error: any) {
      console.error("Karma DNA Analysis Error:", error);
      res.status(500).json({ 
        error: error.message || "Analysis failed. Please try again." 
      });
    }
  });

  // Karmic Debts Scanning
  app.post("/api/analysis/karmic-debts", async (req, res) => {
    try {
      if (!process.env.GEMINI_API_KEY) {
        return res.status(503).json({ 
          error: "AI analysis is not configured. Please contact support." 
        });
      }

      const validatedData = analysisRequestSchema.parse(req.body);
      const result = await scanKarmicDebts(validatedData);
      res.json(result);
    } catch (error: any) {
      console.error("Karmic Debts Analysis Error:", error);
      res.status(500).json({ 
        error: error.message || "Analysis failed. Please try again." 
      });
    }
  });

  // Compatibility Analysis
  app.post("/api/analysis/compatibility", async (req, res) => {
    try {
      if (!process.env.GEMINI_API_KEY) {
        return res.status(503).json({ 
          error: "AI analysis is not configured. Please contact support." 
        });
      }

      const validatedData = compatibilityRequestSchema.parse(req.body);
      const result = await analyzeCompatibility(validatedData);
      res.json(result);
    } catch (error: any) {
      console.error("Compatibility Analysis Error:", error);
      res.status(500).json({ 
        error: error.message || "Analysis failed. Please try again." 
      });
    }
  });

  // Get user plan status
  app.get("/api/user/plan", async (_req, res) => {
    try {
      const plan = await storage.getUserPlan();
      res.json(plan);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch plan" });
    }
  });

  // Submit UPI payment proof
  app.post("/api/payment/proof", async (req, res) => {
    try {
      const proof = insertPaymentProofSchema.parse(req.body);
      const updatedPlan = await storage.upgradeToPro(proof);
      res.json(updatedPlan);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Invalid payment proof" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
