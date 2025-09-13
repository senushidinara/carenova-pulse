import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import EEGVisualization from "@/components/EEGVisualization";
import {
  Activity,
  Brain,
  Calendar,
  MessageSquare,
  Shield,
  Stethoscope,
  LineChart as LineChartIcon,
  HeartPulse,
  Users,
  Zap,
  Bell
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Legend
} from "recharts";

const heroImages = [
  "https://cdn.builder.io/api/v1/image/assets%2Faeae393b121c48bc965ef344df5e7f0b%2Fe3e09a32339c42dd9183b5ca8c728cfd?format=webp&width=800",
  "https://cdn.builder.io/api/v1/image/assets%2Faeae393b121c48bc965ef344df5e7f0b%2F1aa1e8199802449a8ac371b55257a7b8?format=webp&width=800",
  "https://cdn.builder.io/api/v1/image/assets%2Faeae393b121c48bc965ef344df5e7f0b%2F6c1f95ea2b064b749a5a254204a8bff5?format=webp&width=800",
  "https://cdn.builder.io/api/v1/image/assets%2Faeae393b121c48bc965ef344df5e7f0b%2Ff0546ca0478449a79bd345d1f15bfa1c?format=webp&width=800",
  "https://cdn.builder.io/api/v1/image/assets%2Faeae393b121c48bc965ef344df5e7f0b%2Fbb42270a69654d47a675cf561c9f138b?format=webp&width=800",
  "https://cdn.builder.io/api/v1/image/assets%2Faeae393b121c48bc965ef344df5e7f0b%2F0b83f2193a0840629060ea7a62a13091?format=webp&width=800",
];

const vitalsData = [
  { name: "Jan", hr: 72, steps: 6400, sleep: 7.2 },
  { name: "Feb", hr: 70, steps: 7200, sleep: 7.5 },
  { name: "Mar", hr: 71, steps: 6800, sleep: 7.1 },
  { name: "Apr", hr: 69, steps: 7600, sleep: 7.8 },
  { name: "May", hr: 68, steps: 8100, sleep: 7.6 },
  { name: "Jun", hr: 70, steps: 7900, sleep: 7.4 },
];

const adherenceData = [
  { name: "W1", adherence: 92, risk: 8 },
  { name: "W2", adherence: 89, risk: 11 },
  { name: "W3", adherence: 93, risk: 7 },
  { name: "W4", adherence: 95, risk: 5 },
];

const clinicians = [
  { name: "Dr. Mia Thompson", specialty: "Internal Medicine" },
  { name: "Dr. Omar Rahman", specialty: "Neurology" },
  { name: "Dr. Aisha Patel", specialty: "Family Medicine" },
];

export default function DashboardTabs() {
  const [value, setValue] = useState<string>("records");

  // Sync selected tab with URL hash for seamless nav
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) setValue(hash);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const onChange = (val: string) => {
    setValue(val);
    if (window.location.hash !== `#${val}`) window.location.hash = `#${val}`;
    document.getElementById("app-tabs")?.scrollIntoView({ behavior: "smooth" });
  };

  const recordsItems = useMemo(() => ([
    { label: "Atorvastatin 20 mg", value: "Active" },
    { label: "Metformin 500 mg", value: "Active" },
    { label: "Amoxicillin 500 mg", value: "Completed" },
  ]), []);

  return (
    <section id="app-tabs" className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs value={value} onValueChange={onChange} className="w-full">
          <TabsList className="w-full overflow-x-auto bg-white/40 dark:bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-white/30">
            <TabsTrigger value="records"><Stethoscope className="h-4 w-4 mr-2 text-primary"/>Records</TabsTrigger>
            <TabsTrigger value="consultations"><Calendar className="h-4 w-4 mr-2 text-secondary"/>Consultations</TabsTrigger>
            <TabsTrigger value="ai"><Brain className="h-4 w-4 mr-2 text-primary"/>AI & Alerts</TabsTrigger>
            <TabsTrigger value="monitoring"><Activity className="h-4 w-4 mr-2 text-primary"/>Monitoring</TabsTrigger>
            <TabsTrigger value="messages"><MessageSquare className="h-4 w-4 mr-2 text-secondary"/>Messages</TabsTrigger>
            <TabsTrigger value="lifestyle"><HeartPulse className="h-4 w-4 mr-2 text-primary"/>Lifestyle</TabsTrigger>
            <TabsTrigger value="reports"><LineChartIcon className="h-4 w-4 mr-2 text-secondary"/>Reports</TabsTrigger>
            <TabsTrigger value="security"><Shield className="h-4 w-4 mr-2 text-primary"/>Security</TabsTrigger>
          </TabsList>

          {/* Records */}
          <TabsContent value="records" className="mt-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="card-shadow">
                <CardHeader><CardTitle>Medications</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  {recordsItems.map((r, i) => (
                    <div key={i} className="flex justify-between"><span>{r.label}</span><span>{r.value}</span></div>
                  ))}
                </CardContent>
              </Card>
              <Card className="card-shadow">
                <CardHeader><CardTitle>Lab Results</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between"><span>CBC</span><span>Normal</span></div>
                  <div className="flex justify-between"><span>HbA1c</span><span>7.1%</span></div>
                  <div className="flex justify-between"><span>Lipid Panel</span><span>Borderline</span></div>
                </CardContent>
              </Card>
              <Card className="card-shadow">
                <CardHeader><CardTitle>Imaging</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between"><span>Chest X‑ray</span><span>Clear</span></div>
                  <div className="flex justify-between"><span>Brain MRI</span><span>Follow‑up</span></div>
                  <div className="flex justify-between"><span>Abdominal Ultrasound</span><span>Normal</span></div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Consultations */}
          <TabsContent value="consultations" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary"/>Request Appointment</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
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
                        <Input id="type" placeholder="Virtual or In‑person" required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea id="notes" placeholder="Symptoms or purpose of visit" />
                    </div>
                    <div className="flex items-center gap-3">
                      <Button type="submit" variant="hero">Submit Request</Button>
                      <Badge className="bg-gradient-to-r from-primary to-secondary text-white"><Zap className="h-3 w-3 mr-1"/>Verified by clinicians</Badge>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <div className="grid gap-4">
                {heroImages.slice(1,4).map((src, i) => (
                  <div key={i} className="relative overflow-hidden rounded-xl medical-shadow">
                    <img src={src} className="w-full h-44 object-cover" alt="CareNova virtual consultation" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* AI & Alerts */}
          <TabsContent value="ai" className="mt-6">
            <div className="grid md:grid-cols-3 gap-6">
              {["Risk Flags", "Treatment Suggestions", "Follow‑up Reminders"].map((title, i) => (
                <Card key={i} className="card-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Brain className="h-4 w-4 text-secondary"/>{title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Insights are reviewed by clinicians before being added to the care plan.
                  </CardContent>
                </Card>
              ))}
              <Card className="md:col-span-3 card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Bell className="h-4 w-4 text-primary"/>Recent Notifications</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                  <div>Medication conflict detected • Resolved by Dr. Thompson</div>
                  <div>Elevated HbA1c trend • Lifestyle plan updated</div>
                  <div>Sleep efficiency improving • Keep current routine</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Monitoring */}
          <TabsContent value="monitoring" className="mt-6">
            <EEGVisualization />
          </TabsContent>

          {/* Messages */}
          <TabsContent value="messages" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <Card className="card-shadow">
                <CardHeader><CardTitle className="flex items-center gap-2"><MessageSquare className="h-4 w-4 text-primary"/>Secure Message</CardTitle></CardHeader>
                <CardContent>
                  <form className="space-y-4">
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
                    <Button type="submit" variant="medical">Send</Button>
                    <p className="text-xs text-muted-foreground mt-2">Not for emergencies. Response times may vary.</p>
                  </form>
                </CardContent>
              </Card>
              <div className="grid gap-4">
                {heroImages.slice(3,6).map((src, i) => (
                  <div key={i} className="relative overflow-hidden rounded-xl medical-shadow">
                    <img src={src} className="w-full h-44 object-cover" alt="CareNova messaging" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Lifestyle */}
          <TabsContent value="lifestyle" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="card-shadow">
                <CardHeader><CardTitle className="flex items-center gap-2"><HeartPulse className="h-4 w-4 text-primary"/>Vitals & Habits</CardTitle></CardHeader>
                <CardContent style={{height: 260}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={vitalsData} margin={{ left: 0, right: 0 }}>
                      <defs>
                        <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.6}/>
                          <stop offset="95%" stopColor="#60A5FA" stopOpacity={0.05}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Area type="monotone" dataKey="steps" stroke="#60A5FA" fillOpacity={1} fill="url(#colorSteps)" yAxisId="left" />
                      <Line type="monotone" dataKey="sleep" stroke="#EC4899" yAxisId="right" />
                      <Line type="monotone" dataKey="hr" stroke="#A78BFA" yAxisId="right" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="card-shadow">
                <CardHeader><CardTitle>Adherence & Risk</CardTitle></CardHeader>
                <CardContent style={{height: 260}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={adherenceData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="adherence" fill="#60A5FA" radius={[6,6,0,0]} />
                      <Bar dataKey="risk" fill="#EC4899" radius={[6,6,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reports */}
          <TabsContent value="reports" className="mt-6">
            <Card className="card-shadow">
              <CardHeader><CardTitle className="flex items-center gap-2"><LineChartIcon className="h-4 w-4 text-primary"/>Insights Dashboard</CardTitle></CardHeader>
              <CardContent style={{height: 300}}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={vitalsData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="steps" stroke="#60A5FA" />
                    <Line type="monotone" dataKey="sleep" stroke="#EC4899" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <Card className="card-shadow">
                <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="h-4 w-4 text-primary"/>Security & Compliance</CardTitle></CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <div>HIPAA & HITECH compliance • SOC 2 Type II • Audit trails</div>
                  <div>End‑to‑end encryption • Zero‑trust architecture</div>
                  <div>Role‑based access control • Incident response &lt; 15 min</div>
                </CardContent>
              </Card>
              <Card className="card-shadow">
                <CardHeader><CardTitle className="flex items-center gap-2"><Users className="h-4 w-4 text-secondary"/>Community Health Hubs</CardTitle></CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Patients without personal devices receive guided access to virtual care at local hubs.
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
