import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Atom, Dna, Brain, Zap, Clock, AlertTriangle, Activity } from 'lucide-react';

interface QuantumState {
  coherence: number;
  entanglement: number;
  processing: boolean;
}

interface TauProtein {
  concentration: number;
  foldingState: 'normal' | 'misfolded' | 'aggregated';
  riskLevel: number;
}

export const QuantumNeuroSimulation: React.FC = () => {
  const [quantumState, setQuantumState] = useState<QuantumState>({
    coherence: 94.7,
    entanglement: 87.3,
    processing: false
  });

  const [tauProtein, setTauProtein] = useState<TauProtein>({
    concentration: 2.3,
    foldingState: 'normal',
    riskLevel: 15
  });

  const [simulationProgress, setSimulationProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const runQuantumSimulation = async () => {
    setIsRunning(true);
    setSimulationProgress(0);
    setQuantumState(prev => ({ ...prev, processing: true }));

    const interval = setInterval(() => {
      setSimulationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          setQuantumState(prev => ({ 
            ...prev, 
            processing: false,
            coherence: Math.min(100, prev.coherence + Math.random() * 5),
            entanglement: Math.min(100, prev.entanglement + Math.random() * 3)
          }));
          
          // Update tau protein analysis
          setTauProtein(prev => ({
            ...prev,
            concentration: Math.max(0, prev.concentration + (Math.random() - 0.7) * 0.5),
            riskLevel: Math.max(0, Math.min(100, prev.riskLevel + (Math.random() - 0.6) * 10))
          }));
          
          return 100;
        }
        return prev + Math.random() * 8;
      });
    }, 200);
  };

  const getProteinColor = (state: string) => {
    switch (state) {
      case 'normal': return 'text-success';
      case 'misfolded': return 'text-warning';
      case 'aggregated': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskColor = (risk: number) => {
    if (risk < 25) return 'text-success';
    if (risk < 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-300/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Atom className="h-6 w-6 text-purple-400" />
            Causal Quantum Neuro-Simulation (CQNS)
          </CardTitle>
          <CardDescription>
            Quantum computing-powered protein folding simulation for neurodegeneration prediction
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="quantum" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="quantum">Quantum State</TabsTrigger>
          <TabsTrigger value="proteins">Protein Analysis</TabsTrigger>
          <TabsTrigger value="simulation">Simulation</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="quantum" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quantum Coherence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">
                      {quantumState.coherence.toFixed(1)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Coherence Level</div>
                  </div>
                  <Progress value={quantumState.coherence} className="h-3" />
                  <div className="flex items-center gap-2 text-sm">
                    <Activity className="h-4 w-4" />
                    Quantum gates operational: 2,048
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Entanglement Fidelity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">
                      {quantumState.entanglement.toFixed(1)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Bell State Fidelity</div>
                  </div>
                  <Progress value={quantumState.entanglement} className="h-3" />
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="h-4 w-4" />
                    Entangled qubits: 512
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quantum Processing Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <strong>Algorithm:</strong> Variational Quantum Eigensolver
                </div>
                <div>
                  <strong>Topology:</strong> Surface Code
                </div>
                <div>
                  <strong>Error Rate:</strong> 0.001%
                </div>
                <div>
                  <strong>Temperature:</strong> 10 mK
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="proteins" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dna className="h-5 w-5 text-primary" />
                  Tau Protein Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {tauProtein.concentration.toFixed(1)} μg/mL
                  </div>
                  <div className="text-sm text-muted-foreground">Concentration</div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Folding State:</span>
                  <Badge className={getProteinColor(tauProtein.foldingState)}>
                    {tauProtein.foldingState}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Risk Level:</span>
                  <span className={`font-semibold ${getRiskColor(tauProtein.riskLevel)}`}>
                    {tauProtein.riskLevel.toFixed(0)}%
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Microgravity Effects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Protein Aggregation Rate:</span>
                  <span className="text-warning">+23%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tau Phosphorylation:</span>
                  <span className="text-warning">+15%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Neuroinflammation:</span>
                  <span className="text-destructive">+8%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Clearance Efficiency:</span>
                  <span className="text-destructive">-12%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Genomic Markers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>APOE4 Expression:</span>
                  <span className="text-success">Normal</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>MAPT Gene Variants:</span>
                  <span className="text-success">Protective</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Telomerase Activity:</span>
                  <span className="text-warning">Reduced</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>DNA Repair Genes:</span>
                  <span className="text-success">Active</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="simulation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quantum Protein Folding Simulation</CardTitle>
              <CardDescription>
                Modeling exponential protein interaction states using quantum annealing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isRunning && (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Simulation Progress</span>
                    <span>{simulationProgress.toFixed(0)}%</span>
                  </div>
                  <Progress value={simulationProgress} className="h-3" />
                  <div className="text-xs text-muted-foreground">
                    Analyzing {Math.floor(simulationProgress * 10000)} protein conformations...
                  </div>
                </div>
              )}

              <Button 
                onClick={runQuantumSimulation}
                disabled={isRunning}
                className="w-full"
                variant="hero"
                size="lg"
              >
                {isRunning ? (
                  <>
                    <Activity className="h-5 w-5 mr-2 animate-spin" />
                    Running Quantum Simulation...
                  </>
                ) : (
                  <>
                    <Atom className="h-5 w-5 mr-2" />
                    Execute CQNS Analysis
                  </>
                )}
              </Button>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Simulation Parameters:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-1 text-xs">
                    <li>Protein conformations: 10^18</li>
                    <li>Quantum states: 2^512</li>
                    <li>Energy landscapes: 1,024</li>
                    <li>Interaction potentials: Van der Waals</li>
                  </ul>
                </div>
                <div>
                  <strong>Output Metrics:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-1 text-xs">
                    <li>Folding pathway probability</li>
                    <li>Aggregation propensity</li>
                    <li>Binding affinity predictions</li>
                    <li>Stability under stress</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Neurodegeneration Risk Predictions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Short-term (30 days)</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Cognitive decline</span>
                      <span className="text-success text-sm">2.3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Memory impairment</span>
                      <span className="text-success text-sm">1.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Protein aggregation</span>
                      <span className="text-warning text-sm">8.4%</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Long-term (20 years)</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Alzheimer's risk</span>
                      <span className="text-warning text-sm">23.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Tauopathy progression</span>
                      <span className="text-warning text-sm">31.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Severe impairment</span>
                      <span className="text-success text-sm">7.9%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Quantum Prediction Alert</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Simulation predicts 15% increase in tau misfolding under prolonged microgravity. 
                      Recommend implementing targeted countermeasures within 72 hours.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};