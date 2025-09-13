import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import DashboardTabs from "@/components/DashboardTabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Calendar, ArrowRight, Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />

      {/* App Tabs (records, consultations, ai, monitoring, messages, lifestyle, reports, security) */}
      <DashboardTabs />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Transform Your Healthcare Practice?</h2>
          <p className="text-xl text-white/90 mb-8">Join providers using CareNova to deliver better outcomes with AI‑assisted insights.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="xl" className="group">
              Start Free Trial
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Calendar className="h-5 w-5 mr-2" />
              Schedule Demo
            </Button>
          </div>
          <p className="text-sm text-white/70 mt-6">No credit card required • 30‑day free trial • Setup in minutes</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <Activity className="h-8 w-8 text-primary mr-2" />
                <span className="font-bold text-xl">CareNova</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">AI‑powered medical records, secure communications, and predictive health analytics.</p>
              <div className="flex gap-4">
                <Badge variant="outline">HIPAA Compliant</Badge>
                <Badge variant="outline">SOC 2 Certified</Badge>
                <Badge variant="outline">FDA Approved</Badge>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#records" className="hover:text-primary">Records</a></li>
                <li><a href="#consultations" className="hover:text-primary">Consultations</a></li>
                <li><a href="#monitoring" className="hover:text-primary">Monitoring</a></li>
                <li><a href="#reports" className="hover:text-primary">Reports</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Trust</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Shield className="h-4 w-4 text-primary"/>Security</li>
                <li>Privacy‑first architecture</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">© 2024 CareNova Healthcare. All rights reserved. Built with security and privacy as our first priority.</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
