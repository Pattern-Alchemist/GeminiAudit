import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Video, MessageSquare, CheckCircle2, ExternalLink } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertAppointmentSchema, type InsertAppointment, type Appointment } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Stored appointments with tokens in localStorage
interface StoredAppointment {
  id: string;
  token: string;
}

const STORAGE_KEY = 'astrokalki_appointments';

function getStoredAppointments(): StoredAppointment[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function storeAppointment(id: string, token: string) {
  const appointments = getStoredAppointments();
  appointments.push({ id, token });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
}

export default function Consultations() {
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);
  const { toast } = useToast();

  // Load appointments from localStorage on mount
  useEffect(() => {
    async function loadAppointments() {
      const stored = getStoredAppointments();
      const loaded: Appointment[] = [];
      
      for (const { id, token } of stored) {
        try {
          const res = await fetch(`/api/appointments/${id}?token=${token}`);
          if (res.ok) {
            const appointment = await res.json();
            loaded.push(appointment);
          }
        } catch (error) {
          console.error(`Failed to load appointment ${id}:`, error);
        }
      }
      
      setAppointments(loaded);
      setAppointmentsLoading(false);
    }
    
    loadAppointments();
  }, []);

  const sessions = [
    {
      id: "karma-dna-dive",
      title: "Karma DNA Deep Dive",
      duration: "60 minutes",
      price: "₹2,999",
      description: "Comprehensive birth chart analysis with personalized action plan and ongoing support",
      icon: Calendar,
      features: ["Full birth chart analysis", "Core patterns & triggers", "90-day action plan", "Follow-up email support"]
    },
    {
      id: "relationship-compatibility",
      title: "Relationship Compatibility",
      duration: "45 minutes",
      price: "₹2,499",
      description: "Deep bond analysis for you and your partner with relationship guidance",
      icon: MessageSquare,
      features: ["Mind/Heart/Will compatibility", "Strength & challenge areas", "Growth opportunities", "Communication strategies"]
    },
    {
      id: "career-path",
      title: "Career Path Reading",
      duration: "45 minutes",
      price: "₹2,499",
      description: "Identify your dharmic path and optimal timing for career moves",
      icon: Clock,
      features: ["Career dharma analysis", "Breakthrough windows", "Skill alignment", "Decision timing guidance"]
    },
    {
      id: "monthly-checkin",
      title: "Monthly Check-In",
      duration: "30 minutes",
      price: "₹1,499",
      description: "Review progress, adjust practices, and set new intentions",
      icon: Video,
      features: ["Progress review", "Practice adjustments", "New goals setting", "Q&A session"]
    },
  ];

  const createAppointmentMutation = useMutation({
    mutationFn: async (data: InsertAppointment) => {
      const res = await apiRequest("POST", "/api/appointments", data);
      return await res.json();
    },
    onSuccess: (appointment: Appointment) => {
      // Store appointment with token in localStorage
      storeAppointment(appointment.id, appointment.confirmationToken);
      
      // Add to appointments list
      setAppointments(prev => [...prev, appointment]);
      
      setBookingDialogOpen(false);
      toast({
        title: "Appointment Booked!",
        description: "Check your email for confirmation and meeting link.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Booking Failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });

  const form = useForm<InsertAppointment>({
    resolver: zodResolver(insertAppointmentSchema),
    defaultValues: {
      sessionType: "karma-dna-dive",
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      scheduledAt: "",
      notes: "",
    },
  });

  function handleBookSession(sessionId: string) {
    setSelectedSession(sessionId);
    form.setValue("sessionType", sessionId as any);
    setBookingDialogOpen(true);
  }

  function onSubmit(data: InsertAppointment) {
    createAppointmentMutation.mutate(data);
  }

  const upcomingAppointments = appointments?.filter(
    (a) => a.status !== "cancelled" && new Date(a.scheduledAt) > new Date()
  ) || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20" data-testid="badge-expert-guidance">
            Expert Guidance
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4" data-testid="text-consultations-title">
            Book a Personal Consultation
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Work one-on-one with our astrologers for personalized, actionable guidance powered by years of experience and AI insights.
          </p>
        </div>

        {/* Upcoming Appointments */}
        {upcomingAppointments.length > 0 && (
          <Card className="p-6 mb-8 bg-primary/5 border-primary/20" data-testid="card-upcoming-appointments">
            <h2 className="text-xl font-heading font-bold mb-4">Your Upcoming Sessions</h2>
            <div className="space-y-4">
              {upcomingAppointments.map((appt) => (
                <div key={appt.id} className="flex items-center justify-between gap-4 p-4 bg-card rounded-md" data-testid={`appointment-${appt.id}`}>
                  <div className="flex-1">
                    <div className="font-semibold mb-1">
                      {sessions.find(s => s.id === appt.sessionType)?.title}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      {new Date(appt.scheduledAt).toLocaleString()}
                    </div>
                  </div>
                  {appt.meetingUrl && (
                    <Button asChild data-testid={`button-join-${appt.id}`}>
                      <a href={appt.meetingUrl} target="_blank" rel="noreferrer">
                        <Video className="h-4 w-4 mr-2" />
                        Join Meeting
                      </a>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Session Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {sessions.map((session, i) => (
            <Card key={i} className="p-6 hover-elevate transition-all" data-testid={`card-session-${i}`}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <session.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-bold mb-1">{session.title}</h3>
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {session.duration}
                    </Badge>
                    <span className="font-bold text-lg text-primary" data-testid={`price-${i}`}>
                      {session.price}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                {session.description}
              </p>

              <div className="space-y-2 mb-6">
                {session.features.map((feature, fi) => (
                  <div key={fi} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                className="w-full" 
                onClick={() => handleBookSession(session.id)}
                data-testid={`button-book-${i}`}
              >
                Book This Session
              </Button>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <Card className="p-8 mb-12" data-testid="card-how-it-works">
          <h2 className="text-2xl font-heading font-bold text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Choose Session", description: "Select the consultation type that fits your current needs" },
              { step: "2", title: "Schedule Time", description: "Pick a convenient date and time from available slots" },
              { step: "3", title: "Complete Payment", description: "Secure payment via UPI, PayPal, or payment gateway" },
              { step: "4", title: "Join & Transform", description: "Meet via video call and receive your personalized insights" }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">{item.step}</span>
                </div>
                <h3 className="font-heading font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pro Benefits */}
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-success/5 border-primary/20" data-testid="card-pro-benefits">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <Badge className="mb-3 bg-warning/10 text-warning border-warning/20">
                Pro Member Benefit
              </Badge>
              <h3 className="text-xl font-heading font-bold mb-2">
                Get 1 Free Consultation Credit
              </h3>
              <p className="text-muted-foreground">
                Pro members receive one complimentary 30-minute consultation session each month, plus priority scheduling and exclusive content.
              </p>
            </div>
            <Button size="lg" data-testid="button-upgrade-to-pro">
              Upgrade to Pro
            </Button>
          </div>
        </Card>
      </div>

      {/* Booking Dialog */}
      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
        <DialogContent className="max-w-md" data-testid="dialog-book-appointment">
          <DialogHeader>
            <DialogTitle>Book Your Consultation</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} data-testid="input-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your@email.com" {...field} data-testid="input-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customerPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="+91 1234567890" {...field} data-testid="input-phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="scheduledAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Date & Time</FormLabel>
                    <FormControl>
                      <Input 
                        type="datetime-local" 
                        {...field} 
                        data-testid="input-datetime"
                        min={new Date().toISOString().slice(0, 16)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Requests (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any specific topics you'd like to discuss..." 
                        {...field} 
                        data-testid="textarea-notes"
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setBookingDialogOpen(false)}
                  className="flex-1"
                  data-testid="button-cancel-booking"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={createAppointmentMutation.isPending}
                  data-testid="button-submit-booking"
                >
                  {createAppointmentMutation.isPending ? "Booking..." : "Book Now"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
