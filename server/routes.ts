import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { analyzeKarmaDNA, scanKarmicDebts, analyzeCompatibility } from "./gemini";
import { 
  analysisRequestSchema, 
  insertPaymentProofSchema,
  compatibilityRequestSchema,
  insertAppointmentSchema,
  updateAppointmentStatusSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    const hasApiKey = !!(process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY);
    res.json({ 
      status: "ok", 
      features: {
        aiAnalysis: hasApiKey
      }
    });
  });

  // Test AI connection endpoint
  app.post("/api/test-ai", async (req, res) => {
    try {
      const hasApiKey = !!(process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY);
      if (!hasApiKey) {
        return res.status(503).json({ 
          success: false,
          error: "AI analysis is not configured. API key is missing." 
        });
      }

      // Test with a simple Karma DNA analysis
      const testRequest = {
        name: "Test User",
        birthDate: "1990-01-01",
        birthTime: "12:00",
        birthPlace: "New York, USA"
      };

      const result = await analyzeKarmaDNA(testRequest);
      
      res.json({ 
        success: true,
        message: "AI service is working correctly",
        testResult: {
          hasIntegrityScore: typeof result.integrityScore === 'number',
          hasReciprocityScore: typeof result.reciprocityScore === 'number',
          hasValueScore: typeof result.valueScore === 'number',
          hasActionSteps: Array.isArray(result.actionSteps),
          actionStepsCount: result.actionSteps?.length || 0
        }
      });
    } catch (error: any) {
      console.error("AI Test Error:", error);
      res.status(500).json({ 
        success: false,
        error: error.message || "AI test failed"
      });
    }
  });

  // Karma DNA Analysis
  app.post("/api/analysis/karma-dna", async (req, res) => {
    try {
      const hasApiKey = !!(process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY);
      if (!hasApiKey) {
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
      const hasApiKey = !!(process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY);
      if (!hasApiKey) {
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
      const hasApiKey = !!(process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY);
      if (!hasApiKey) {
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

  // Get single appointment (requires confirmation token for security)
  app.get("/api/appointments/:id", async (req, res) => {
    try {
      const { token } = req.query;
      if (!token || typeof token !== 'string') {
        return res.status(401).json({ error: "Confirmation token required" });
      }
      
      const appointment = await storage.getAppointment(req.params.id, token);
      if (!appointment) {
        return res.status(404).json({ error: "Appointment not found or invalid token" });
      }
      res.json(appointment);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch appointment" });
    }
  });

  // Create new appointment
  app.post("/api/appointments", async (req, res) => {
    try {
      const appointmentData = insertAppointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(appointmentData);
      res.status(201).json(appointment);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to create appointment" });
    }
  });

  // Update appointment status
  app.patch("/api/appointments/:id/status", async (req, res) => {
    try {
      const statusUpdate = updateAppointmentStatusSchema.parse(req.body);
      const appointment = await storage.updateAppointmentStatus(req.params.id, statusUpdate);
      if (!appointment) {
        return res.status(404).json({ error: "Appointment not found" });
      }
      res.json(appointment);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to update appointment" });
    }
  });

  // Cancel appointment
  app.delete("/api/appointments/:id", async (req, res) => {
    try {
      const appointment = await storage.cancelAppointment(req.params.id);
      if (!appointment) {
        return res.status(404).json({ error: "Appointment not found" });
      }
      res.json(appointment);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to cancel appointment" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
