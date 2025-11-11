import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Check, Smartphone, CreditCard, Copy, Zap, Shield, Calendar } from "lucide-react";

export default function Billing() {
  const { toast } = useToast();
  const [upiTxnId, setUpiTxnId] = useState("");
  const [showUpiForm, setShowUpiForm] = useState(false);

  const upiId = "9211271977@hdfcbank";

  const copyUpiId = () => {
    navigator.clipboard?.writeText(upiId);
    toast({
      title: "UPI ID Copied",
      description: `${upiId} copied to clipboard`,
    });
  };

  const openUpiApp = () => {
    // UPI deep link - works on mobile devices with UPI apps
    const upiLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=AstroKalki&cu=INR`;
    
    // Try to open UPI app on mobile
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    if (isMobile) {
      window.location.href = upiLink;
    } else {
      toast({
        title: "Mobile Required",
        description: "UPI links work on mobile devices. Please copy the UPI ID and use your UPI app.",
      });
      copyUpiId();
    }
  };

  const handleUpiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!upiTxnId || upiTxnId.length < 6) {
      toast({
        title: "Invalid Transaction ID",
        description: "Please enter a valid UPI transaction ID (minimum 6 characters)",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Payment Verification In Progress",
      description: "We'll verify your payment and activate Pro within 24 hours",
    });
    setUpiTxnId("");
    setShowUpiForm(false);
  };

  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      description: "Get started with basic analysis",
      features: [
        "1 Karma DNA analysis per month",
        "Basic karmic debt scan",
        "Community support",
        "Educational content"
      ],
      limitations: [
        "Limited analysis depth",
        "No priority support",
        "No consultations included"
      ],
      current: true
    },
    {
      name: "Pro",
      price: "₹100",
      period: "per month",
      description: "Full access to all AI-powered tools",
      features: [
        "Unlimited Karma DNA analyses",
        "Deep karmic debt analysis",
        "90-day impact windows",
        "Relationship compatibility",
        "Daily personalized guidance",
        "1 free consultation credit/month",
        "Priority email support",
        "Early access to new features",
        "Export analysis reports"
      ],
      popular: true,
      current: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4" data-testid="text-billing-title">
            Choose Your Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start with free basic analysis or unlock full AI-powered insights with Pro
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {plans.map((plan, i) => (
            <Card 
              key={i} 
              className={`p-8 relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}
              data-testid={`card-plan-${plan.name.toLowerCase()}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              )}
              {plan.current && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-success/10 text-success border-success/20">
                  Current Plan
                </Badge>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-heading font-bold mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">/{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, fi) => (
                  <div key={fi} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
                {plan.limitations && plan.limitations.map((limitation, li) => (
                  <div key={`lim-${li}`} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-muted-foreground mt-0.5">✕</span>
                    <span>{limitation}</span>
                  </div>
                ))}
              </div>

              {!plan.current ? (
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => setShowUpiForm(true)}
                  data-testid={`button-upgrade-${plan.name.toLowerCase()}`}
                >
                  Upgrade to {plan.name}
                </Button>
              ) : (
                <Button className="w-full" size="lg" variant="outline" disabled>
                  Current Plan
                </Button>
              )}
            </Card>
          ))}
        </div>

        {/* Payment Options */}
        {showUpiForm && (
          <Card className="p-8 mb-12" data-testid="card-payment-options">
            <h2 className="text-2xl font-heading font-bold mb-6 text-center">Complete Your Payment</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* UPI Payment */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-heading font-bold">Pay with UPI</h3>
                  <Badge variant="outline" className="ml-auto">Recommended</Badge>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">UPI ID:</span>
                      <Badge variant="outline" className="font-mono text-xs">
                        {upiId}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={copyUpiId}
                        data-testid="button-copy-upi"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy UPI ID
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={openUpiApp}
                        data-testid="button-open-upi-app"
                      >
                        <Smartphone className="h-4 w-4 mr-2" />
                        Open UPI App
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-md">
                    <div className="text-sm space-y-2">
                      <div className="font-semibold">How to pay:</div>
                      <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                        <li>Copy the UPI ID or click "Open UPI App" (mobile only)</li>
                        <li>Open any UPI app (GPay, PhonePe, Paytm, etc.)</li>
                        <li>Send ₹100 to the UPI ID above</li>
                        <li>Copy your transaction/UPI ID below</li>
                      </ol>
                    </div>
                  </div>

                  <form onSubmit={handleUpiSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="upi-txn-id">UPI Transaction ID / UTR Number *</Label>
                      <Input
                        id="upi-txn-id"
                        placeholder="Enter 12-digit transaction ID"
                        value={upiTxnId}
                        onChange={(e) => setUpiTxnId(e.target.value)}
                        data-testid="input-upi-txn-id"
                        required
                        minLength={6}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Find this in your payment confirmation message
                      </p>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      data-testid="button-submit-upi-payment"
                    >
                      Verify Payment & Activate Pro
                    </Button>
                  </form>
                </div>
              </div>

              {/* PayPal Payment */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-heading font-bold">Pay with PayPal</h3>
                </div>

                <div className="p-4 bg-muted/30 rounded-md">
                  <p className="text-sm text-muted-foreground mb-4">
                    Secure international payments via PayPal
                  </p>
                  <Button 
                    className="w-full" 
                    size="lg"
                    asChild
                    data-testid="button-pay-with-paypal"
                  >
                    <a
                      href="https://paypal.me/kaus777/100"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Pay ₹100 via PayPal
                    </a>
                  </Button>
                  <p className="text-xs text-muted-foreground mt-3 text-center">
                    After payment, contact support with your PayPal transaction ID
                  </p>
                </div>

                <div className="p-4 bg-muted/30 rounded-md">
                  <div className="text-sm space-y-2">
                    <div className="font-semibold mb-2">Why choose PayPal?</div>
                    <div className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-success mt-0.5" />
                      <span className="text-muted-foreground">Secure & buyer protected</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CreditCard className="h-4 w-4 text-success mt-0.5" />
                      <span className="text-muted-foreground">Use credit/debit cards</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Zap className="h-4 w-4 text-success mt-0.5" />
                      <span className="text-muted-foreground">Instant activation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Button 
                variant="ghost" 
                onClick={() => setShowUpiForm(false)}
                data-testid="button-cancel-payment"
              >
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* Trust Indicators */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-heading font-bold mb-2">Secure Payments</h3>
            <p className="text-sm text-muted-foreground">
              All transactions are encrypted and secure
            </p>
          </Card>
          <Card className="p-6 text-center">
            <Calendar className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-heading font-bold mb-2">Cancel Anytime</h3>
            <p className="text-sm text-muted-foreground">
              No long-term commitments or hidden fees
            </p>
          </Card>
          <Card className="p-6 text-center">
            <Zap className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-heading font-bold mb-2">Instant Activation</h3>
            <p className="text-sm text-muted-foreground">
              Pro features activate within 24 hours
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
