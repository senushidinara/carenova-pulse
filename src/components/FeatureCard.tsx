import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  status: "live" | "beta" | "coming-soon";
  gradient?: boolean;
}

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  features, 
  status,
  gradient = false 
}: FeatureCardProps) => {
  const statusColors = {
    live: "bg-success text-success-foreground",
    beta: "bg-warning text-warning-foreground",
    "coming-soon": "bg-muted text-muted-foreground"
  };

  const statusLabels = {
    live: "Live",
    beta: "Beta",
    "coming-soon": "Coming Soon"
  };

  return (
    <Card className={`card-shadow hover:floating-shadow transition-all duration-300 h-full ${
      gradient ? "bg-gradient-to-br from-card to-muted/20" : ""
    }`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
            </div>
          </div>
          <Badge className={statusColors[status]}>
            {statusLabels[status]}
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;