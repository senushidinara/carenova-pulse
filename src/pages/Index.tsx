import { useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeatureCard from "@/components/FeatureCard";
import EEGVisualization from "@/components/EEGVisualization";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { connectWallet, readRecord, writeRecord } from "@/xion";
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
  FileText,
  Stethoscope,
  Send,
  ArrowRight
} from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [wallet, setWallet] = useState<string | null>(null);
  const [record, setRecord] = useState<string>("");
  const [input, setInput] = useState<string>("");

  const handleConnect = async () => {
    try {
      const addr = await connectWallet();
      setWallet(addr);
      toast({ title: "Wallet connected", description: addr });
    } catch (e: any) {
      toast({ title: "Connection failed", description: e.message, variant: "destructive" });
    }
  };

  const handleRead = async () => {
    try {
      const value = await readRecord();
      setRecord(value);
      toast({ title: "Record fetched" });
    } catch (e: any) {
      toast({ title: "Read failed", description: e.message, variant: "destructive" as any });
    }
  };

  const handleWrite = async () => {
    try {
      const msg = await writeRecord(input);
      toast({ title: msg });
      setInput("");
    } catch (e: any) {
      toast({ title: "Write failed", description: e.message, variant: "destructive" as any });
    }
  };

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

  const submitHandler = (msg: string) => (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: msg, description: "Action completed successfully." });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />

      {/* XION Testnet Demo */}
      <section id="xion" className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                CareNova - Health Record (XION Testnet)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {!wallet ? (
                  <Button onClick={handleConnect}>Connect Wallet</Button>
                ) : (
                  <div className="text-sm text-muted-foreground">Connected: {wallet}</div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <Button onClick={handleRead} variant="secondary">Read Health Record</Button>
                  <div className="text-sm">Current Record: {record || ""}</div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                  <Input placeholder="Enter new record..." value={input} onChange={(e) => setInput(e.target.value)} />
                  <Button onClick={handleWrite} variant="hero">Update Record</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Records Section */}
      <section id="records" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <FileText className="h-3 w-3 mr-1" />
              Records
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Centralized Medical Records</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              View medications, allergies, lab results, imaging, and a full history timeline.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {["Medications", "Lab Results", "Imaging"].map((title, i) => (
              <Card key={i} className="card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="h-5 w-5 text-primary" />
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between"><span>Name</span><span>Status</span></div>
                  <div className="flex justify-between"><span>Example item</span><span>Active</span></div>
                  <div className="flex justify-between"><span>Example item</span><span>Archived</span></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Consultations Section */}
      <section id="consultations" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <Badge variant="outline" className="mb-4">
                <Calendar className="h-3 w-3 mr-1" />
                Consultations
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Hybrid Consultations</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Request a virtual or in-person appointment. We will confirm availability via email.
              </p>

              <form onSubmit={submitHandler("Consultation request sent") } className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Jane Doe" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="jane@example.com" required />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Preferred Date</Label>
                    <Input id="date" type="date" required />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Input id="type" placeholder="Virtual / In-person" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Symptoms or purpose of visit" />
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full sm:w-auto">
                  Submit Request
                </Button>
              </form>
            </div>

            <Card className="p-6 card-shadow">
              <CardHeader>
                <CardTitle>How it works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" />Submit a request</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" />We match a clinician</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" />Get confirmation by email</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Insights Section */}
      <section id="ai" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Brain className="h-3 w-3 mr-1" />
              AI Insights
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Clinical AI Insights</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Evidence-backed suggestions to support clinical decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {["Risk Flags", "Treatment Suggestions", "Follow-up Reminders"].map((t, i) => (
              <Card key={i} className="card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-secondary" />{t}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Sample content generated from anonymized, aggregated patterns and clinician rules.
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Messages Section */}
      <section id="messages" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <Badge variant="outline" className="mb-4">
                <MessageSquare className="h-3 w-3 mr-1" />
                Messages
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Secure Messaging</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Send a secure message to your care team. You will receive a reply via email.
              </p>

              <form onSubmit={submitHandler("Message sent") } className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fromName">Your Name</Label>
                    <Input id="fromName" placeholder="Jane Doe" required />
                  </div>
                  <div>
                    <Label htmlFor="fromEmail">Your Email</Label>
                    <Input id="fromEmail" type="email" placeholder="jane@example.com" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Write your message" required />
                </div>
                <Button type="submit" variant="medical" className="w-full sm:w-auto">
                  <Send className="h-4 w-4 mr-2" /> Send Secure Message
                </Button>
              </form>
            </div>

            <Card className="p-6 card-shadow">
              <CardHeader>
                <CardTitle>Messaging Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div>Do not include emergency issues. Call local emergency services instead.</div>
                <div>Response times may vary. For urgent issues, request a consultation.</div>
                <div>Attachments and images are supported after account verification.</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

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
                {["HIPAA & HITECH Compliance","SOC 2 Type II Certification","FDA 21 CFR Part 11 Compliance","End-to-end Encryption","Zero-trust Architecture","Comprehensive Audit Trails"].map((item, index) => (
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
                <li><a href="#consultations" className="hover:text-primary">Consultations</a></li>
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
