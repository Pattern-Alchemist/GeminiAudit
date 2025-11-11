import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Check, CreditCard, Smartphone } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { InsertPaymentProof } from "@shared/schema";
import PayPalButton from "@/components/PayPalButton";

export default function Billing() {
  const [utr, setUtr] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [paypalProcessing, setPaypalProcessing] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const copyUPI = () => {
    navigator.clipboard?.writeText("9211271977@hdfcbank");
    toast({
      title: "UPI ID Copied",
      description: "9211271977@hdfcbank copied to clipboard",
    });
  };

  const submitProof = useMutation({
    mutationFn: async (proof: InsertPaymentProof) => {
      return await apiRequest("POST", "/api/payment/proof", proof);
    },
    onSuccess: () => {
      toast({
        title: "✓ Pro Unlocked!",
        description: "Your Pro plan has been activated successfully",
      });
      setModalOpen(false);
      setUtr("");
      queryClient.invalidateQueries({ queryKey: ["/api/user/plan"] });
    },
    onError: () => {
      toast({
        title: "Verification Failed",
        description: "Please check your UTR and try again",
        variant: "destructive",
      });
    },
  });

  const handleSubmitProof = () => {
    if (utr.length < 6) {
      toast({
        title: "Invalid UTR",
        description: "Please enter a valid UTR number",
        variant: "destructive",
      });
      return;
    }
    submitProof.mutate({ utr, timestamp: new Date().toISOString() });
  };

  useEffect(() => {
    const handlePayPalStart = () => {
      setPaypalProcessing(true);
    };

    const handlePayPalSuccess = () => {
      submitProof.mutate({ 
        utr: "PAYPAL_" + Date.now(), 
        timestamp: new Date().toISOString() 
      });
    };

    const handlePayPalCancel = () => {
      setPaypalProcessing(false);
      toast({
        title: "Payment Cancelled",
        description: "PayPal checkout was cancelled",
      });
    };

    const handlePayPalError = () => {
      setPaypalProcessing(false);
      toast({
        title: "Payment Failed",
        description: "PayPal checkout encountered an error. Please try again.",
        variant: "destructive",
      });
    };

    const handlePayPalComplete = () => {
      setPaypalProcessing(false);
    };

    window.addEventListener('paypal-start', handlePayPalStart);
    window.addEventListener('paypal-success', handlePayPalSuccess);
    window.addEventListener('paypal-cancel', handlePayPalCancel);
    window.addEventListener('paypal-error', handlePayPalError);
    window.addEventListener('paypal-complete', handlePayPalComplete);

    return () => {
      window.removeEventListener('paypal-start', handlePayPalStart);
      window.removeEventListener('paypal-success', handlePayPalSuccess);
      window.removeEventListener('paypal-cancel', handlePayPalCancel);
      window.removeEventListener('paypal-error', handlePayPalError);
      window.removeEventListener('paypal-complete', handlePayPalComplete);
    };
  }, []);

  const proFeatures = [
    "Advanced Impact Windows",
    "House Radar analysis",
    "Bond Karma compatibility",
    "Priority support",
    "1 consultation credit",
    "Early access to new tools",
  ];

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="font-serif text-5xl font-extrabold mb-4" data-testid="text-billing-title">
          Upgrade to Pro
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Unlock advanced tools and personalized support for your karmic journey
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* UPI Payment */}
        <Card className="p-8 shadow-xl" data-testid="card-upi-payment">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
              <Smartphone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold">Pay via UPI</h2>
              <p className="text-sm text-muted-foreground">India only</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <Label className="text-base mb-2 block">1. Send payment to</Label>
              <div className="flex gap-3 items-center">
                <code className="flex-1 p-3 bg-card-border/50 rounded-md text-sm font-mono" data-testid="text-upi-id">
                  9211271977@hdfcbank
                </code>
                <Button size="sm" variant="outline" onClick={copyUPI} data-testid="button-copy-upi-billing">
                  Copy
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Amount: ₹999 (one-time, lifetime access)
              </p>
            </div>

            <div>
              <Label className="text-base mb-2 block">2. Or use UPI app</Label>
              <Button
                variant="outline"
                className="w-full"
                asChild
                data-testid="button-open-upi-app"
              >
                <a href="upi://pay?pa=9211271977%40hdfcbank&pn=AstroKalki&am=999&cu=INR">
                  Open UPI App
                </a>
              </Button>
            </div>

            <div>
              <Label className="text-base mb-2 block">
                3. Submit payment proof
              </Label>
              <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="w-full bg-primary/15 hover:bg-primary/25 text-primary border-primary/45"
                    data-testid="button-submit-proof"
                  >
                    Submit UTR / Transaction ID
                  </Button>
                </DialogTrigger>
                <DialogContent data-testid="modal-upi-proof">
                  <DialogHeader>
                    <DialogTitle>Submit Payment Proof</DialogTitle>
                    <DialogDescription>
                      Enter your UPI transaction reference number (UTR) to verify
                      payment
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <Label htmlFor="utr">UTR / Transaction ID</Label>
                      <Input
                        id="utr"
                        placeholder="Enter 12-digit UTR number"
                        value={utr}
                        onChange={(e) => setUtr(e.target.value)}
                        data-testid="input-utr"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        You can find this in your payment app's transaction history
                      </p>
                    </div>
                    <Button
                      className="w-full bg-primary/15 hover:bg-primary/25 text-primary border-primary/45"
                      onClick={handleSubmitProof}
                      disabled={submitProof.isPending}
                      data-testid="button-mark-paid"
                    >
                      {submitProof.isPending
                        ? "Verifying..."
                        : "Mark Paid & Unlock Pro"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </Card>

        {/* PayPal Payment */}
        <Card className="p-8 shadow-xl" data-testid="card-paypal-payment">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold">Pay via PayPal</h2>
              <p className="text-sm text-muted-foreground">International</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Secure international payment via PayPal. Credit/debit cards
                accepted.
              </p>
              <div className="p-4 bg-card-border/30 rounded-lg mb-4">
                <div className="text-sm font-semibold mb-1">Amount</div>
                <div className="font-serif text-3xl font-bold" data-testid="text-paypal-amount">$12 USD</div>
                <div className="text-xs text-muted-foreground mt-1">
                  One-time payment, lifetime access
                </div>
              </div>
              <div 
                className={`w-full ${paypalProcessing ? 'opacity-50 pointer-events-none' : ''}`} 
                data-testid="paypal-button-container"
              >
                <PayPalButton amount="12" currency="USD" intent="CAPTURE" />
              </div>
              {paypalProcessing ? (
                <p className="text-sm text-primary text-center mt-3 font-medium">
                  Processing payment...
                </p>
              ) : (
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  Secure checkout powered by PayPal
                </p>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Pro Plan Benefits */}
      <Card className="p-8 shadow-xl" data-testid="card-pro-benefits">
        <h2 className="font-serif text-2xl font-bold mb-6 flex items-center gap-2">
          <Badge className="bg-gold/15 text-gold border-gold/40">PRO</Badge>
          What You Get
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {proFeatures.map((feature, i) => (
            <div key={i} className="flex items-start gap-3" data-testid={`feature-${i}`}>
              <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Security Notice */}
      <Card className="p-6 mt-8 bg-muted/30" data-testid="card-security">
        <p className="text-sm text-muted-foreground text-center">
          🔒 All payments are secure. We never store your payment details. For
          support, contact us at{" "}
          <a href="mailto:support@astrokalki.com" className="text-primary underline">
            support@astrokalki.com
          </a>
        </p>
      </Card>
    </div>
  );
}
