import type { UserPlan, InsertPaymentProof, Appointment, InsertAppointment, UpdateAppointmentStatus } from "@shared/schema";
import { randomBytes } from "crypto";

export interface IStorage {
  getUserPlan(): Promise<UserPlan>;
  upgradeToPro(proof: InsertPaymentProof): Promise<UserPlan>;
  getAppointment(id: string, token: string): Promise<Appointment | null>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  updateAppointmentStatus(id: string, update: UpdateAppointmentStatus): Promise<Appointment | null>;
  cancelAppointment(id: string): Promise<Appointment | null>;
}

export class MemStorage implements IStorage {
  private userPlan: UserPlan;
  private appointments: Map<string, Appointment>;

  constructor() {
    this.userPlan = {
      plan: "free",
    };
    this.appointments = new Map();
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

  async getAppointment(id: string, token: string): Promise<Appointment | null> {
    const appointment = this.appointments.get(id);
    if (!appointment || appointment.confirmationToken !== token) {
      return null;
    }
    return appointment;
  }

  async createAppointment(insert: InsertAppointment): Promise<Appointment> {
    const id = `appt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Generate secure confirmation token (32 bytes = 64 hex chars)
    const confirmationToken = randomBytes(32).toString('hex');
    
    // Session details mapping
    const sessionDetails = {
      "karma-dna-dive": { duration: 60, price: 2999 },
      "relationship-compatibility": { duration: 45, price: 2499 },
      "career-path": { duration: 45, price: 2499 },
      "monthly-checkin": { duration: 30, price: 1499 },
    };

    const details = sessionDetails[insert.sessionType];
    
    // Generate Jitsi meeting URL
    const meetingUrl = `https://meet.jit.si/astrokalki-${id}`;

    const appointment: Appointment = {
      id,
      confirmationToken,
      sessionType: insert.sessionType,
      customerName: insert.customerName,
      customerEmail: insert.customerEmail,
      customerPhone: insert.customerPhone,
      scheduledAt: insert.scheduledAt,
      duration: details.duration,
      price: details.price,
      status: "pending",
      meetingUrl,
      notes: insert.notes,
      createdAt: new Date().toISOString(),
    };

    this.appointments.set(id, appointment);
    return appointment;
  }

  async updateAppointmentStatus(id: string, update: UpdateAppointmentStatus): Promise<Appointment | null> {
    const appointment = this.appointments.get(id);
    if (!appointment) return null;

    const updated: Appointment = {
      ...appointment,
      status: update.status,
    };

    this.appointments.set(id, updated);
    return updated;
  }

  async cancelAppointment(id: string): Promise<Appointment | null> {
    const appointment = this.appointments.get(id);
    if (!appointment) return null;

    const cancelled: Appointment = {
      ...appointment,
      status: "cancelled",
    };

    this.appointments.set(id, cancelled);
    return cancelled;
  }
}

export const storage = new MemStorage();
