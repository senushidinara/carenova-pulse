import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  Shield, 
  CheckCircle2, 
  Star,
  Clock,
  Users,
  Zap
} from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal = ({ isOpen, onClose }: PaymentModalProps) => {
  const [selectedPlan, setSelectedPlan] = useState("professional");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: 99,
      period: "month",
      description: "Perfect for small practices",
      features: [
        "Up to 100 patients",
        "Basic EEG monitoring",
        "Standard support",
        "Mobile app access"
      ],
      popular: false
    },
    {
      id: "professional",
      name: "Professional",
      price: 299,
      period: "month",
      description: "Most popular for growing practices",
      features: [
        "Up to 1,000 patients",
        "Advanced EEG analytics",
        "AI-powered insights",
        "Priority support",
        "Custom integrations",
        "Advanced reporting"
      ],
      popular: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 599,
      period: "month",
      description: "For large healthcare organizations",
      features: [
        "Unlimited patients",
        "Full AI suite",
        "24/7 dedicated support",
        "Custom deployment",
        "Advanced security",
        "Multi-location support"
      ],
      popular: false
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Mock payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment Successful! 🎉",
        description: `Welcome to Carenova ${plans.find(p => p.id === selectedPlan)?.name}! Your account is being set up.`,
      });
      onClose();
    }, 2000);
  };

  const selectedPlanData = plans.find(p => p.id === selectedPlan);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-primary" />
            Choose Your Carenova Plan
          </DialogTitle>
        </DialogHeader>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Plan Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Select a Plan</h3>
            
            <div className="space-y-3">
              {plans.map((plan) => (
                <Card 
                  key={plan.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedPlan === plan.id 
                      ? 'ring-2 ring-primary border-primary' 
                      : 'hover:border-primary/50'
                  } ${plan.popular ? 'medical-shadow' : ''}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      {plan.popular && (
                        <Badge className="bg-gradient-to-r from-primary to-secondary text-white">
                          <Star className="h-3 w-3 mr-1" />
                          Most Popular
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-primary">${plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Payment Form */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Payment Details</h3>
            
            {/* Order Summary */}
            <Card className="medical-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Carenova {selectedPlanData?.name}</span>
                  <span className="font-semibold">${selectedPlanData?.price}/month</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Setup fee</span>
                  <span className="line-through">$199</span>
                </div>
                <div className="flex justify-between text-sm text-success">
                  <span>First month discount</span>
                  <span>-$50</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total (First Month)</span>
                  <span className="text-primary">${selectedPlanData ? selectedPlanData.price - 50 : 0}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Then ${selectedPlanData?.price}/month. Cancel anytime.
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-success" />
                  Secure Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="4242 4242 4242 4242" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  <Shield className="h-4 w-4 text-success" />
                  <span className="text-sm">Your payment is secured with 256-bit SSL encryption</span>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  What you get immediately:
                </h4>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-primary" />
                    Instant account activation
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3 text-primary" />
                    Dedicated onboarding specialist
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-3 w-3 text-primary" />
                    30-day money-back guarantee
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full"
              variant="hero"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Complete Payment - ${selectedPlanData ? selectedPlanData.price - 50 : 0}
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By completing this payment, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
