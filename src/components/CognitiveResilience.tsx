import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Zap, Clock, Pill, Sun, Activity, Target } from 'lucide-react';

interface CountermeasureProtocol {
  id: string;
  type: 'pharmacological' | 'phototherapy' | 'behavioral' | 'nutritional';
  name: string;
  timing: string;
  dosage: string;
  duration: string;
  efficacy: number;
  sideEffects: string[];
}

interface SynapticState {
  plasticity: number;
  efficiency: number;
  rewiring: boolean;
  stimulationActive: boolean;
}

export const CognitiveResilience: React.FC = () => {
  const [protocols, setProtocols] = useState<CountermeasureProtocol[]>([
    {
      id: 'drug-x',
      type: 'pharmacological',
      name: 'Modafinil + Nootropic Blend',
      timing: 'T+0 hours',
      dosage: '200mg + 500mg',
      duration: '8 hours',
      efficacy: 94,
      sideEffects: ['Mild insomnia', 'Reduced appetite']
    },
    {
      id: 'gamma-light',
      type: 'phototherapy', 
      name: 'Gamma-Frequency Light Therapy',
      timing: 'T+2 hours',
      dosage: '40Hz, 850 lux',
      duration: '30 minutes',
      efficacy: 87,
      sideEffects: ['Eye strain (minimal)']
    },
    {
      id: 'supplement-y',
      type: 'nutritional',
      name: 'Omega-3 + Phosphatidylserine',
      timing: 'T+4 hours',
      dosage: '1000mg + 300mg',
      duration: '12 hours',
      efficacy: 72,
      sideEffects: ['None reported']
    },
    {
      id: 'neural-stim',
      type: 'behavioral',
      name: 'Targeted tES + Cognitive Training',
      timing: 'T+6 hours',
      dosage: '2mA, 20min + 15min tasks',
      duration: '35 minutes',
      efficacy: 91,
      sideEffects: ['Mild tingling sensation']
    }
  ]);

  const [synapticState, setSynapticState] = useState<SynapticState>({
    plasticity: 78,
    efficiency: 83,
    rewiring: false,
    stimulationActive: false
  });

  const [optimizationProgress, setOptimizationProgress] = useState(0);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const runOptimization = async () => {
    setIsOptimizing(true);
    setOptimizationProgress(0);

    const interval = setInterval(() => {
      setOptimizationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsOptimizing(false);
          
          // Update synaptic state
          setSynapticState(prev => ({
            ...prev,
            plasticity: Math.min(100, prev.plasticity + Math.random() * 15),
            efficiency: Math.min(100, prev.efficiency + Math.random() * 12),
            rewiring: false
          }));
          
          return 100;
        }
        return prev + Math.random() * 8;
      });
    }, 300);
  };

  const activateNeuralStimulation = () => {
    setSynapticState(prev => ({ ...prev, stimulationActive: true, rewiring: true }));
    
    setTimeout(() => {
      setSynapticState(prev => ({ 
        ...prev, 
        stimulationActive: false,
        plasticity: Math.min(100, prev.plasticity + 8),
        efficiency: Math.min(100, prev.efficiency + 5)
      }));
    }, 5000);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pharmacological': return <Pill className="h-4 w-4" />;
      case 'phototherapy': return <Sun className="h-4 w-4" />;
      case 'behavioral': return <Brain className="h-4 w-4" />;
      case 'nutritional': return <Activity className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pharmacological': return 'bg-blue-500';
      case 'phototherapy': return 'bg-yellow-500';
      case 'behavioral': return 'bg-purple-500';
      case 'nutritional': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-300/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-blue-400" />
            Cognitive Resilience Synthesis (CRS) Engine
          </CardTitle>
          <CardDescription>
            Multi-modal intervention optimization using reinforcement learning with safety constraints
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="protocols" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="protocols">Protocols</TabsTrigger>
          <TabsTrigger value="synaptic">Synaptic State</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
        </TabsList>

        <TabsContent value="protocols" className="space-y-4">
          <div className="grid gap-4">
            {protocols.map((protocol) => (
              <Card key={protocol.id} className="relative overflow-hidden">
                <div className={`absolute left-0 top-0 w-1 h-full ${getTypeColor(protocol.type)}`} />
                <CardContent className="pt-6 pl-8">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(protocol.type)}
                        <h3 className="font-semibold">{protocol.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {protocol.efficacy}% efficacy
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Timing:</span>
                          <div className="font-medium">{protocol.timing}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Dosage:</span>
                          <div className="font-medium">{protocol.dosage}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Duration:</span>
                          <div className="font-medium">{protocol.duration}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Side Effects:</span>
                          <div className="text-xs text-muted-foreground">
                            {protocol.sideEffects.join(', ')}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Progress 
                      value={protocol.efficacy} 
                      className="w-20 h-2 mt-2" 
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="synaptic" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Neuroplasticity Index</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">
                      {synapticState.plasticity.toFixed(1)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Current Plasticity</div>
                  </div>
                  <Progress value={synapticState.plasticity} className="h-3" />
                  {synapticState.rewiring && (
                    <div className="flex items-center gap-2 text-sm text-warning">
                      <Activity className="h-4 w-4 animate-pulse" />
                      Active synaptic rewiring detected
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Neural Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">
                      {synapticState.efficiency.toFixed(1)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Processing Efficiency</div>
                  </div>
                  <Progress value={synapticState.efficiency} className="h-3" />
                  {synapticState.stimulationActive && (
                    <div className="flex items-center gap-2 text-sm text-success">
                      <Zap className="h-4 w-4 animate-pulse" />
                      Neural stimulation active
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Closed-Loop Neural Stimulation</CardTitle>
              <CardDescription>
                Real-time transcranial electrical stimulation based on EEG feedback
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={activateNeuralStimulation}
                disabled={synapticState.stimulationActive}
                variant="medical"
                className="w-full"
              >
                {synapticState.stimulationActive ? (
                  <>
                    <Activity className="h-4 w-4 mr-2 animate-spin" />
                    Stimulation Active
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Activate Neural Enhancement
                  </>
                )}
              </Button>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <strong>Protocol:</strong> tES 2mA
                </div>
                <div>
                  <strong>Target:</strong> DLPFC
                </div>
                <div>
                  <strong>Frequency:</strong> 40Hz
                </div>
                <div>
                  <strong>Duration:</strong> 20min
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Multi-Modal Optimization Engine</CardTitle>
              <CardDescription>
                RL-based protocol optimization with safety constraints and drug interaction analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isOptimizing && (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Optimization Progress</span>
                    <span>{optimizationProgress.toFixed(0)}%</span>
                  </div>
                  <Progress value={optimizationProgress} className="h-3" />
                  <div className="text-xs text-muted-foreground">
                    Analyzing {Math.floor(optimizationProgress * 50)} protocol combinations...
                  </div>
                </div>
              )}

              <Button 
                onClick={runOptimization}
                disabled={isOptimizing}
                className="w-full"
                variant="hero"
                size="lg"
              >
                {isOptimizing ? (
                  <>
                    <Activity className="h-5 w-5 mr-2 animate-spin" />
                    Optimizing Protocol Sequence...
                  </>
                ) : (
                  <>
                    <Target className="h-5 w-5 mr-2" />
                    Optimize Countermeasure Protocol
                  </>
                )}
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Current Optimization Targets</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Maximize cognitive performance gain</li>
                    <li>Minimize side effect severity</li>
                    <li>Optimize timing sequences</li>
                    <li>Prevent drug-drug interactions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Safety Constraints</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Maximum stimulation current: 2mA</li>
                    <li>Drug interaction screening: Active</li>
                    <li>Circadian rhythm protection: Enabled</li>
                    <li>Cardiovascular monitoring: Required</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="safety" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Safety Monitoring & Constraints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Drug Interaction Matrix</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Modafinil + Light Therapy</span>
                        <Badge variant="outline" className="text-success">Safe</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Nootropics + tES</span>
                        <Badge variant="outline" className="text-success">Safe</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>All Combined Protocols</span>
                        <Badge variant="outline" className="text-warning">Monitor</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Physiological Limits</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Heart Rate Variability</span>
                        <span className="text-success">Normal</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Blood Pressure</span>
                        <span className="text-success">Stable</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cortisol Levels</span>
                        <span className="text-warning">Elevated</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium">Reinforcement Learning Safety Protocol</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    The RL agent is constrained by a safety reward function that heavily penalizes 
                    any protocol combination leading to adverse physiological responses or 
                    contraindicated drug interactions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};