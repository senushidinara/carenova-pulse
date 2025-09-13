import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Shield, Zap, Users, Calendar } from "lucide-react";
const heroImage = "https://cdn.builder.io/api/v1/image/assets%2Faeae393b121c48bc965ef344df5e7f0b%2Fe3e09a32339c42dd9183b5ca8c728cfd?format=webp&width=1200";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 fade-in-up">
            <div className="space-y-4">
              <Badge variant="outline" className="w-fit">
                <Zap className="h-3 w-3 mr-1" />
                AI-Powered Healthcare Platform
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                Centralized
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Medical Records
                </span>
                Reimagined
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl">
                Secure, AI-powered medical records with hybrid consultations, predictive alerts, 
                and real-time health monitoring. Where safety meets innovation.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Bank-level Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-secondary" />
                <span className="text-sm font-medium">AI-Powered Insights</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Community Access</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-secondary" />
                <span className="text-sm font-medium">Hybrid Consultations</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="xl"
                className="group"
              >
                Start Free Trial
                <Zap className="h-5 w-5 ml-2 group-hover:animate-pulse" />
              </Button>
              
              <Button 
                variant="outline" 
                size="xl"
                className="group"
              >
                <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">Trusted by healthcare providers</p>
              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">HIPAA</Badge>
                  <span className="text-xs">Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">SOC 2</Badge>
                  <span className="text-xs">Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">FDA</Badge>
                  <span className="text-xs">Approved</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative lg:block">
            <div className="relative rounded-2xl overflow-hidden medical-shadow">
              <img
                src={heroImage}
                alt="CareNova Medical Dashboard"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20" />
              
              {/* Floating Elements */}
              <div className="absolute top-6 right-6 bg-card/90 backdrop-blur-sm rounded-lg p-4 card-shadow">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Live Monitoring</span>
                </div>
              </div>
              
              <div className="absolute bottom-6 left-6 bg-card/90 backdrop-blur-sm rounded-lg p-4 card-shadow">
                <div className="text-sm">
                  <div className="font-semibold text-primary">98.7%</div>
                  <div className="text-muted-foreground">EEG prediction accuracy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
