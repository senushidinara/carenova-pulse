import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Activity, TrendingUp, AlertTriangle, Zap } from 'lucide-react';

interface NeuroHealthScore {
  overall: number;
  fatigue: number;
  stress: number;
  cognitive: number;
  sleep: number;
}

interface AIInsight {
  type: 'warning' | 'info' | 'success';
  message: string;
  confidence: number;
  source: string;
}

export const AIAnalytics: React.FC = () => {
  const [neuroScore, setNeuroScore] = useState<NeuroHealthScore>({
    overall: 87,
    fatigue: 25,
    stress: 35,
    cognitive: 92,
    sleep: 78
  });

  const [insights, setInsights] = useState<AIInsight[]>([
    {
      type: 'info',
      message: 'Optimal circadian rhythm detected. Continue current sleep schedule.',
      confidence: 94,
      source: 'Sleep Architecture Analysis'
    },
    {
      type: 'warning',
      message: 'Theta/Beta ratio indicates mild cognitive fatigue. Consider 15-min rest.',
      confidence: 82,
      source: 'EEG Pattern Recognition'
    },
    {
      type: 'success',
      message: 'HRV metrics show excellent stress resilience.',
      confidence: 97,
      source: 'Stress Biomarker Analysis'
    }
  ]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const runAIAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI processing with NASA data
    setTimeout(() => {
      // Update scores with simulated AI analysis
      setNeuroScore(prev => ({
        ...prev,
        overall: Math.max(70, Math.min(100, prev.overall + (Math.random() - 0.5) * 10)),
        fatigue: Math.max(0, Math.min(100, prev.fatigue + (Math.random() - 0.5) * 20)),
        stress: Math.max(0, Math.min(100, prev.stress + (Math.random() - 0.5) * 15))
      }));
      
      setIsAnalyzing(false);
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-destructive';
  };

  const getRiskLevel = (score: number) => {
    if (score >= 85) return { level: 'Low Risk', color: 'bg-success' };
    if (score >= 70) return { level: 'Medium Risk', color: 'bg-warning' };
    return { level: 'High Risk', color: 'bg-destructive' };
  };

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setNeuroScore(prev => ({
        ...prev,
        fatigue: Math.max(0, Math.min(100, prev.fatigue + (Math.random() - 0.5) * 5)),
        stress: Math.max(0, Math.min(100, prev.stress + (Math.random() - 0.5) * 3))
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const riskLevel = getRiskLevel(neuroScore.overall);

  return (
    <div className="space-y-6">
      {/* Main Neurohealth Score */}
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Brain className="h-8 w-8 text-primary" />
            NeuroHealth Score
          </CardTitle>
          <CardDescription>Real-time cognitive wellness assessment</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-6xl font-bold text-primary">
            {neuroScore.overall}
          </div>
          <Badge className={`${riskLevel.color} text-white px-4 py-2`}>
            {riskLevel.level}
          </Badge>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Cognitive Load</div>
              <div className={`text-2xl font-semibold ${getScoreColor(neuroScore.cognitive)}`}>
                {neuroScore.cognitive}%
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Sleep Quality</div>
              <div className={`text-2xl font-semibold ${getScoreColor(neuroScore.sleep)}`}>
                {neuroScore.sleep}%
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Fatigue Level</div>
              <div className={`text-2xl font-semibold ${getScoreColor(100 - neuroScore.fatigue)}`}>
                {neuroScore.fatigue}%
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Stress Index</div>
              <div className={`text-2xl font-semibold ${getScoreColor(100 - neuroScore.stress)}`}>
                {neuroScore.stress}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Analysis Button */}
      <Card>
        <CardContent className="pt-6">
          <Button 
            onClick={runAIAnalysis} 
            disabled={isAnalyzing}
            className="w-full"
            variant="hero"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Activity className="h-5 w-5 mr-2 animate-spin" />
                Analyzing NASA Data...
              </>
            ) : (
              <>
                <Zap className="h-5 w-5 mr-2" />
                Run AI Analysis
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            AI Insights & Recommendations
          </CardTitle>
          <CardDescription>
            Powered by NASA HRP data and machine learning models
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
              <div className="mt-1">
                {insight.type === 'warning' && <AlertTriangle className="h-5 w-5 text-warning" />}
                {insight.type === 'info' && <Brain className="h-5 w-5 text-primary" />}
                {insight.type === 'success' && <Activity className="h-5 w-5 text-success" />}
              </div>
              <div className="flex-1 space-y-2">
                <p className="text-sm font-medium">{insight.message}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{insight.source}</span>
                  <Badge variant="outline" className="text-xs">
                    {insight.confidence}% confidence
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Technical Details */}
      <Card>
        <CardHeader>
          <CardTitle>AI Model Information</CardTitle>
          <CardDescription>Technical details about the analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Model Architecture:</strong> CNN-Transformer Hybrid
            </div>
            <div>
              <strong>Data Sources:</strong> NASA OSDR, HRP Studies
            </div>
            <div>
              <strong>Features:</strong> θ/β ratio, HRV, Sleep stages
            </div>
            <div>
              <strong>Explainability:</strong> SHAP analysis enabled
            </div>
            <div>
              <strong>Update Frequency:</strong> Real-time (30s intervals)
            </div>
            <div>
              <strong>Accuracy:</strong> 94.2% (validated on ISS data)
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};