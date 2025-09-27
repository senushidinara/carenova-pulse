import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Brain, Waves, Eye, Volume2, Lightbulb, AlertTriangle, Activity, Zap } from 'lucide-react';

interface BiofeedbackState {
  alphaWaves: number;
  betaWaves: number;
  thetaWaves: number;
  gammaWaves: number;
  coherence: number;
}

interface EnvironmentalControl {
  lighting: {
    intensity: number;
    frequency: number;
    active: boolean;
  };
  audio: {
    volume: number;
    frequency: number;
    active: boolean;
  };
  neuralStimulation: {
    intensity: number;
    frequency: number;
    active: boolean;
  };
}

interface CriticalAlert {
  id: string;
  type: 'performance_drop' | 'fatigue_spike' | 'attention_lapse';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  prediction: string;
  timeToEvent: number; // minutes
}

export const AutonomousNeuroInterface: React.FC = () => {
  const [biofeedback, setBiofeedback] = useState<BiofeedbackState>({
    alphaWaves: 12.5,
    betaWaves: 18.3,
    thetaWaves: 6.8,
    gammaWaves: 35.2,
    coherence: 87.4
  });

  const [environmentalControl, setEnvironmentalControl] = useState<EnvironmentalControl>({
    lighting: { intensity: 65, frequency: 40, active: false },
    audio: { volume: 45, frequency: 528, active: false },
    neuralStimulation: { intensity: 1.5, frequency: 10, active: false }
  });

  const [alerts, setAlerts] = useState<CriticalAlert[]>([
    {
      id: 'alert-1',
      type: 'performance_drop',
      severity: 'medium',
      message: 'Cognitive performance decline detected',
      prediction: 'Critical attention lapse in 4.2 minutes during docking procedure',
      timeToEvent: 4.2
    }
  ]);

  const [autonomousMode, setAutonomousMode] = useState(true);
  const [interventionActive, setInterventionActive] = useState(false);

  // Simulate real-time biofeedback updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBiofeedback(prev => ({
        alphaWaves: Math.max(5, Math.min(20, prev.alphaWaves + (Math.random() - 0.5) * 2)),
        betaWaves: Math.max(10, Math.min(30, prev.betaWaves + (Math.random() - 0.5) * 3)),
        thetaWaves: Math.max(3, Math.min(12, prev.thetaWaves + (Math.random() - 0.5) * 1.5)),
        gammaWaves: Math.max(25, Math.min(50, prev.gammaWaves + (Math.random() - 0.5) * 4)),
        coherence: Math.max(60, Math.min(100, prev.coherence + (Math.random() - 0.5) * 5))
      }));

      // Countdown alert time
      setAlerts(prev => 
        prev.map(alert => ({
          ...alert,
          timeToEvent: Math.max(0, alert.timeToEvent - 0.1)
        })).filter(alert => alert.timeToEvent > 0)
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const executeAutonomousIntervention = async () => {
    setInterventionActive(true);
    
    // Activate environmental controls based on current brain state
    if (biofeedback.alphaWaves < 10) {
      setEnvironmentalControl(prev => ({
        ...prev,
        lighting: { ...prev.lighting, active: true, frequency: biofeedback.alphaWaves + 2 }
      }));
    }

    if (biofeedback.coherence < 80) {
      setEnvironmentalControl(prev => ({
        ...prev,
        audio: { ...prev.audio, active: true, frequency: 528 }
      }));
    }

    // Simulate intervention duration
    setTimeout(() => {
      setInterventionActive(false);
      setBiofeedback(prev => ({
        ...prev,
        alphaWaves: Math.min(20, prev.alphaWaves + 3),
        coherence: Math.min(100, prev.coherence + 8)
      }));
      
      // Clear alerts after successful intervention
      setAlerts([]);
    }, 5000);
  };

  const toggleEnvironmentalControl = (type: keyof EnvironmentalControl, active: boolean) => {
    setEnvironmentalControl(prev => ({
      ...prev,
      [type]: { ...prev[type], active }
    }));
  };

  const getWaveColor = (frequency: number, optimal: number) => {
    const deviation = Math.abs(frequency - optimal) / optimal;
    if (deviation < 0.1) return 'text-success';
    if (deviation < 0.3) return 'text-warning';
    return 'text-destructive';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-300/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-green-400" />
            Autonomous Neuro-Interface Calibration (ANIC)
          </CardTitle>
          <CardDescription>
            Closed-loop biofeedback system with predictive environmental control
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="biofeedback" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="biofeedback">Real-time EEG</TabsTrigger>
          <TabsTrigger value="environmental">Environmental Control</TabsTrigger>
          <TabsTrigger value="alerts">Predictive Alerts</TabsTrigger>
          <TabsTrigger value="autonomy">Autonomous Mode</TabsTrigger>
        </TabsList>

        <TabsContent value="biofeedback" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Waves className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium">Alpha Waves</span>
                  </div>
                  <div className={`text-2xl font-bold ${getWaveColor(biofeedback.alphaWaves, 12)}`}>
                    {biofeedback.alphaWaves.toFixed(1)} Hz
                  </div>
                  <Progress value={(biofeedback.alphaWaves / 20) * 100} className="h-2" />
                  <div className="text-xs text-muted-foreground">8-13 Hz optimal</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Waves className="h-4 w-4 text-green-400" />
                    <span className="text-sm font-medium">Beta Waves</span>
                  </div>
                  <div className={`text-2xl font-bold ${getWaveColor(biofeedback.betaWaves, 20)}`}>
                    {biofeedback.betaWaves.toFixed(1)} Hz
                  </div>
                  <Progress value={(biofeedback.betaWaves / 30) * 100} className="h-2" />
                  <div className="text-xs text-muted-foreground">13-30 Hz optimal</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Waves className="h-4 w-4 text-purple-400" />
                    <span className="text-sm font-medium">Theta Waves</span>
                  </div>
                  <div className={`text-2xl font-bold ${getWaveColor(biofeedback.thetaWaves, 7)}`}>
                    {biofeedback.thetaWaves.toFixed(1)} Hz
                  </div>
                  <Progress value={(biofeedback.thetaWaves / 12) * 100} className="h-2" />
                  <div className="text-xs text-muted-foreground">4-8 Hz optimal</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Waves className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-medium">Gamma Waves</span>
                  </div>
                  <div className={`text-2xl font-bold ${getWaveColor(biofeedback.gammaWaves, 40)}`}>
                    {biofeedback.gammaWaves.toFixed(1)} Hz
                  </div>
                  <Progress value={(biofeedback.gammaWaves / 50) * 100} className="h-2" />
                  <div className="text-xs text-muted-foreground">30-50 Hz optimal</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Neural Coherence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">
                    {biofeedback.coherence.toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Brain Wave Coherence</div>
                </div>
                <Progress value={biofeedback.coherence} className="h-4" />
                <div className="text-xs text-center text-muted-foreground">
                  High coherence indicates optimal cognitive state for complex tasks
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="environmental" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Gamma-Frequency Light Therapy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Active</span>
                  <Switch 
                    checked={environmentalControl.lighting.active}
                    onCheckedChange={(checked) => toggleEnvironmentalControl('lighting', checked)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm">Intensity: {environmentalControl.lighting.intensity}%</label>
                    <Progress value={environmentalControl.lighting.intensity} className="h-2 mt-1" />
                  </div>
                  <div>
                    <label className="text-sm">Frequency: {environmentalControl.lighting.frequency} Hz</label>
                    <Progress value={(environmentalControl.lighting.frequency / 100) * 100} className="h-2 mt-1" />
                  </div>
                </div>
                {environmentalControl.lighting.active && (
                  <div className="text-xs text-success">
                    Synchronized with alpha wave frequency for optimal entrainment
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5" />
                  Binaural Audio Stimulation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Active</span>
                  <Switch 
                    checked={environmentalControl.audio.active}
                    onCheckedChange={(checked) => toggleEnvironmentalControl('audio', checked)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm">Volume: {environmentalControl.audio.volume}%</label>
                    <Progress value={environmentalControl.audio.volume} className="h-2 mt-1" />
                  </div>
                  <div>
                    <label className="text-sm">Frequency: {environmentalControl.audio.frequency} Hz</label>
                    <Progress value={(environmentalControl.audio.frequency / 1000) * 100} className="h-2 mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Transcranial Stimulation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Active</span>
                  <Switch 
                    checked={environmentalControl.neuralStimulation.active}
                    onCheckedChange={(checked) => toggleEnvironmentalControl('neuralStimulation', checked)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm">Intensity: {environmentalControl.neuralStimulation.intensity} mA</label>
                    <Progress value={(environmentalControl.neuralStimulation.intensity / 3) * 100} className="h-2 mt-1" />
                  </div>
                  <div>
                    <label className="text-sm">Frequency: {environmentalControl.neuralStimulation.frequency} Hz</label>
                    <Progress value={(environmentalControl.neuralStimulation.frequency / 50) * 100} className="h-2 mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Predictive D-WAVE Steering Alerts
              </CardTitle>
              <CardDescription>
                AI-predicted critical cognitive events requiring immediate intervention
              </CardDescription>
            </CardHeader>
            <CardContent>
              {alerts.length > 0 ? (
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="p-4 border rounded-lg bg-muted/50">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge className={`${getSeverityColor(alert.severity)} text-white`}>
                              {alert.severity.toUpperCase()}
                            </Badge>
                            <span className="font-semibold">{alert.message}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{alert.prediction}</p>
                          <div className="text-xs font-mono">
                            Time to event: {alert.timeToEvent.toFixed(1)} minutes
                          </div>
                        </div>
                        <Button
                          onClick={executeAutonomousIntervention}
                          disabled={interventionActive}
                          variant="medical"
                          size="sm"
                        >
                          {interventionActive ? (
                            <>
                              <Activity className="h-4 w-4 mr-1 animate-spin" />
                              Intervening
                            </>
                          ) : (
                            'Intervene Now'
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Eye className="h-8 w-8 mx-auto mb-2" />
                  <p>No critical events detected</p>
                  <p className="text-xs">System monitoring 247 parameters in real-time</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="autonomy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Autonomous Operation Settings</CardTitle>
              <CardDescription>
                Configure automatic intervention thresholds and response protocols
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Autonomous Mode</h4>
                  <p className="text-sm text-muted-foreground">
                    Allow system to automatically execute interventions
                  </p>
                </div>
                <Switch 
                  checked={autonomousMode}
                  onCheckedChange={setAutonomousMode}
                />
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Intervention Thresholds</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <label>Alpha coherence threshold: &lt; 70%</label>
                    <Progress value={70} className="h-2 mt-1" />
                  </div>
                  <div>
                    <label>Performance drop prediction: &gt; 80%</label>
                    <Progress value={80} className="h-2 mt-1" />
                  </div>
                  <div>
                    <label>Attention lapse warning: &lt; 5 min</label>
                    <Progress value={83} className="h-2 mt-1" />
                  </div>
                  <div>
                    <label>Fatigue spike detection: &gt; 85%</label>
                    <Progress value={85} className="h-2 mt-1" />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium">Safety Protocol</p>
                <p className="text-xs text-muted-foreground mt-1">
                  All autonomous interventions are limited to non-invasive environmental 
                  adjustments and mild neural stimulation. Critical interventions require 
                  human oversight and confirmation.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};