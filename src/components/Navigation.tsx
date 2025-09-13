import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Brain, 
  Calendar, 
  MessageSquare, 
  Shield, 
  Stethoscope,
  Menu,
  X,
  CreditCard
} from "lucide-react";
import { useState } from "react";
import PaymentModal from "./PaymentModal";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const navItems = [
    { icon: Stethoscope, label: "Records", href: "#records" },
    { icon: Calendar, label: "Consultations", href: "#consultations" },
    { icon: Brain, label: "AI Insights", href: "#ai" },
    { icon: Activity, label: "Monitoring", href: "#monitoring" },
    { icon: MessageSquare, label: "Messages", href: "#messages" },
    { icon: Shield, label: "Security", href: "#security" },
  ];

  return (
    <nav className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Activity className="h-8 w-8 text-primary mr-2" />
              <span className="font-bold text-xl text-foreground">CareNova</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.hash = item.href.replace('#','');
                      document.getElementById('app-tabs')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                document.getElementById("consultations")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Sign In
            </Button>
            <Button variant="medical" size="sm" onClick={() => setIsPaymentModalOpen(true)}>
              <CreditCard className="h-4 w-4 mr-2" />
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted-foreground hover:text-primary p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-muted-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center gap-2"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.hash = item.href.replace('#','');
                      document.getElementById('app-tabs')?.scrollIntoView({ behavior: 'smooth' });
                      setIsOpen(false);
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </a>
                );
              })}
              <div className="pt-4 space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    document.getElementById("consultations")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Sign In
                </Button>
                <Button variant="medical" size="sm" className="w-full" onClick={() => setIsPaymentModalOpen(true)}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
      />
    </nav>
  );
};

export default Navigation;
