import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeatureCard from "@/components/FeatureCard";
import EEGVisualization from "@/components/EEGVisualization";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Database,
  Video,
  Brain,
  AlertTriangle,
  Users,
  Activity,
  MessageSquare,
  BarChart3,
  Shield,
  Calendar,
  Heart,
  Zap,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Database,
      title: "Centralized Medical Records",
      description: "Complete medical history in one secure, accessible location",
      features: [
        "Medications & allergy tracking",
        "Lab results & imaging storage",
        "Historical health timeline",
        "Multi-provider synchronization"
      ],
      status: "live" as const
    },
    {
      icon: Video,
      title: "Hybrid Consultations",
      description: "Seamlessly blend virtual and in-person healthcare",
      features: [
        "Minor issues handled virtually",
        "Major cases scheduled in-person",
        "Integrated appointment system",
        "Provider preference matching"
      ],
      status: "live" as const
    },
    {
      icon: Brain,
      title: "AI with Human Oversight",
      description: "Intelligent suggestions always verified by clinicians",
      features: [
        "Diagnostic assistance",
        "Treatment recommendations",
        "Clinical decision support",
        "Safety-first validation"
      ],
      status: "beta" as const
    },
    {
      icon: AlertTriangle,
      title: "Predictive Alerts",
      description: "Early warning system for potential health risks",
      features: [
        "Medication conflict detection",
        "Chronic condition monitoring",
        "Risk factor analysis",
        "Preventive care reminders"
      ],
      status: "live" as const
    },
    {
      icon: Users,
      title: "Community Health Hubs",
      description: "Ensuring equitable access to digital healthcare",
      features: [
        "Device-free consultation access",
        "Staff-assisted virtual visits",
        "Community health education",
        "Digital literacy support"
      ],
      status: "beta" as const
    },
    {
      icon: Activity,
      title: "Lifestyle & Habit Tracking",
      description: "Comprehensive wellness monitoring with actionable insights",
      features: [
        "Sleep pattern analysis",
        "Diet & exercise tracking",
        "Mental health monitoring",
        "Personalized recommendations"
      ],
      status: "live" as const
    },
    {
      icon: MessageSquare,
      title: "Real-Time Messaging",
      description: "Secure communication between patients and clinicians",
      features: [
        "Encrypted messaging",
        "File sharing capabilities",
        "Video consultations",
        "Emergency contact system"
      ],
      status: "live" as const
    },
    {
      icon: BarChart3,
      title: "Insights Dashboard",
      description: "Comprehensive analytics for healthcare providers",
      features: [
        "Patient adherence tracking",
        "Risk trend analysis",
        "Population health metrics",
        "Outcome predictions"
      ],
      status: "beta" as const
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with complete audit trails",
      features: [
        "Role-based access control",
        "End-to-end encryption",
        "Comprehensive audit logs",
        "HIPAA compliance"
      ],
      status: "live" as const
    }
  ];

  const stats = [
    { icon: Users, value: "50K+", label: "Active Patients" },
    { icon: Heart, value: "99.9%", label: "Uptime" },
    { icon: Shield, value: "100%", label: "HIPAA Compliant" },
    { icon: Zap, value: "2.3s", label: "Avg Response Time" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center card-shadow">
                  <CardContent className="p-6">
                    <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* EEG Monitoring Section */}
      <section id="monitoring" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Brain className="h-3 w-3 mr-1" />
              Real-time Neurological Monitoring
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Advanced EEG Waveform Analysis
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Monitor brain activity in real-time with multi-channel EEG visualization, 
              frequency band analysis, and sleep stage correlation.
            </p>
          </div>
          
          <EEGVisualization />
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Zap className="h-3 w-3 mr-1" />
              Platform Features
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Comprehensive Healthcare Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need for modern healthcare delivery, from patient records 
              to AI-powered insights, all in one secure platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                {...feature}
                gradient={index % 3 === 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section id="security" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">
                <Shield className="h-3 w-3 mr-1" />
                Security & Compliance
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Enterprise-Grade Security
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Your patient data is protected by military-grade encryption and 
                comprehensive compliance frameworks that exceed industry standards.
              </p>
              
              <div className="space-y-4">
                {[
                  "HIPAA & HITECH Compliance",
                  "SOC 2 Type II Certification",
                  "FDA 21 CFR Part 11 Compliance",
                  "End-to-end Encryption",
                  "Zero-trust Architecture",
                  "Comprehensive Audit Trails"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Card className="p-8 medical-shadow">
              <div className="space-y-6">
                <div className="text-center">
                  <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Security Score</h3>
                  <div className="text-4xl font-bold text-primary">A+</div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Encryption Strength</span>
                    <Badge variant="secondary">AES-256</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Uptime SLA</span>
                    <Badge variant="secondary">99.99%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Incident Response</span>
                    <Badge variant="secondary">&lt; 15 min</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Healthcare Practice?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of healthcare providers already using Carenova to deliver 
            better patient outcomes with AI-powered insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="xl"
              className="group"
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Schedule Demo
            </Button>
          </div>
          
          <p className="text-sm text-white/70 mt-6">
            No credit card required • 30-day free trial • Setup in under 5 minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <Activity className="h-8 w-8 text-primary mr-2" />
                <span className="font-bold text-xl">Carenova</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Transforming healthcare through AI-powered medical records, 
                secure communications, and predictive health analytics.
              </p>
              <div className="flex gap-4">
                <Badge variant="outline">HIPAA Compliant</Badge>
                <Badge variant="outline">SOC 2 Certified</Badge>
                <Badge variant="outline">FDA Approved</Badge>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-primary">Features</a></li>
                <li><a href="#security" className="hover:text-primary">Security</a></li>
                <li><a href="#monitoring" className="hover:text-primary">Monitoring</a></li>
                <li><a href="#" className="hover:text-primary">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">About</a></li>
                <li><a href="#" className="hover:text-primary">Careers</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
                <li><a href="#" className="hover:text-primary">Support</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 Carenova Healthcare. All rights reserved. Built with security and privacy first.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;