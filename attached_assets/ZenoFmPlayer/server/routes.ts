import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { createPaypalOrder, capturePaypalOrder, loadPaypalDefault } from "./paypal";
import { insertPaymentProofSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
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

  // PayPal routes (from blueprint - DO NOT MODIFY)
  app.get("/paypal/setup", async (req, res) => {
    await loadPaypalDefault(req, res);
  });

  app.post("/paypal/order", async (req, res) => {
    await createPaypalOrder(req, res);
  });

  app.post("/paypal/order/:orderID/capture", async (req, res) => {
    await capturePaypalOrder(req, res);
  });

  const httpServer = createServer(app);
  return httpServer;
}
