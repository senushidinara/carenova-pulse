import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Satellite, Database, Brain, Activity, Download, RefreshCw } from 'lucide-react';

interface NASADataset {
  id: string;
  name: string;
  type: 'EEG' | 'Sleep' | 'HRV' | 'Biomarkers';
  status: 'synced' | 'syncing' | 'error';
  lastUpdate: string;
  size: string;
  samples: number;
}

interface ModelPerformance {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
}

export const NASADataIntegration: React.FC = () => {
  const [datasets, setDatasets] = useState<NASADataset[]>([
    {
      id: 'sharp-eeg',
      name: 'SHARP EEG Cognitive Load',
      type: 'EEG',
      status: 'synced',
      lastUpdate: '2 min ago',
      size: '1.2 GB',
      samples: 15420
    },
    {
      id: 'iss-sleep',
      name: 'ISS Sleep Architecture',
      type: 'Sleep',
      status: 'synced',
      lastUpdate: '5 min ago',
      size: '850 MB',
      samples: 8930
    },
    {
      id: 'hrv-stress',
      name: 'HRV Stress Biomarkers',
      type: 'HRV',
      status: 'syncing',
      lastUpdate: 'Syncing...',
      size: '450 MB',
      samples: 12100
    },
    {
      id: 'cortisol-rhythm',
      name: 'Cortisol Circadian Rhythms',
      type: 'Biomarkers',
      status: 'synced',
      lastUpdate: '1 hour ago',
      size: '120 MB',
      samples: 3450
    }
  ]);

  const [modelPerformance, setModelPerformance] = useState<ModelPerformance>({
    accuracy: 94.2,
    precision: 91.8,
    recall: 96.1,
    f1Score: 93.9
  });

  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);

  const handleDataSync = (datasetId: string) => {
    setDatasets(prev => 
      prev.map(d => 
        d.id === datasetId 
          ? { ...d, status: 'syncing' as const, lastUpdate: 'Syncing...' }
          : d
      )
    );

    // Simulate sync completion
    setTimeout(() => {
      setDatasets(prev => 
        prev.map(d => 
          d.id === datasetId 
            ? { ...d, status: 'synced' as const, lastUpdate: 'Just now' }
            : d
        )
      );
    }, 3000);
  };

  const handleModelTraining = () => {
    setIsTraining(true);
    setTrainingProgress(0);

    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          // Update model performance
          setModelPerformance(prev => ({
            accuracy: Math.min(100, prev.accuracy + Math.random() * 2),
            precision: Math.min(100, prev.precision + Math.random() * 2),
            recall: Math.min(100, prev.recall + Math.random() * 2),
            f1Score: Math.min(100, prev.f1Score + Math.random() * 2)
          }));
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'synced': return 'bg-success';
      case 'syncing': return 'bg-warning';
      case 'error': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'EEG': return <Brain className="h-4 w-4" />;
      case 'Sleep': return <Activity className="h-4 w-4" />;
      case 'HRV': return <Activity className="h-4 w-4" />;
      case 'Biomarkers': return <Database className="h-4 w-4" />;
      default: return <Database className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Satellite className="h-6 w-6 text-primary" />
            NASA Data Integration Hub
          </CardTitle>
          <CardDescription>
            Real-time synchronization with NASA Human Research Program datasets
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="datasets" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="datasets">Datasets</TabsTrigger>
          <TabsTrigger value="models">AI Models</TabsTrigger>
          <TabsTrigger value="pipeline">Data Pipeline</TabsTrigger>
        </TabsList>

        <TabsContent value="datasets" className="space-y-4">
          <div className="grid gap-4">
            {datasets.map((dataset) => (
              <Card key={dataset.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(dataset.type)}
                      <div>
                        <h3 className="font-semibold">{dataset.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {dataset.samples.toLocaleString()} samples • {dataset.size}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={`${getStatusColor(dataset.status)} text-white`}>
                        {dataset.status}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDataSync(dataset.id)}
                        disabled={dataset.status === 'syncing'}
                      >
                        {dataset.status === 'syncing' ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <Download className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Last updated: {dataset.lastUpdate}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>CNN-Transformer Hybrid Model</CardTitle>
              <CardDescription>
                Advanced neural network for physiological signal analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{modelPerformance.accuracy.toFixed(1)}%</div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{modelPerformance.precision.toFixed(1)}%</div>
                  <div className="text-sm text-muted-foreground">Precision</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{modelPerformance.recall.toFixed(1)}%</div>
                  <div className="text-sm text-muted-foreground">Recall</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{modelPerformance.f1Score.toFixed(1)}%</div>
                  <div className="text-sm text-muted-foreground">F1-Score</div>
                </div>
              </div>

              {isTraining && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Training Progress</span>
                    <span>{trainingProgress.toFixed(0)}%</span>
                  </div>
                  <Progress value={trainingProgress} className="h-2" />
                </div>
              )}

              <Button 
                onClick={handleModelTraining}
                disabled={isTraining}
                className="w-full"
                variant="medical"
              >
                {isTraining ? 'Training Model...' : 'Retrain Model with Latest Data'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Model Architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <strong>Input Features:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>θ/β EEG ratio (fatigue indicator)</li>
                      <li>HRV time-domain metrics (rMSSD)</li>
                      <li>Sleep architecture (REM/NREM)</li>
                      <li>Circadian rhythm markers</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Processing Layers:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>1D CNN for local patterns</li>
                      <li>Transformer for long-term dependencies</li>
                      <li>SHAP explainability layer</li>
                      <li>Risk prediction output</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Data Pipeline</CardTitle>
              <CardDescription>
                End-to-end processing from NASA repositories to clinical insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-semibold">NASA OSDR Data Ingestion</h4>
                    <p className="text-sm text-muted-foreground">Automated fetch from Human Research Program datasets</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-semibold">Signal Processing & Feature Extraction</h4>
                    <p className="text-sm text-muted-foreground">MNE-Python for EEG, NeuroKit2 for HRV analysis</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-semibold">AI Model Inference</h4>
                    <p className="text-sm text-muted-foreground">Real-time scoring using trained CNN-Transformer</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                  <div>
                    <h4 className="font-semibold">Knowledge Engine Integration</h4>
                    <p className="text-sm text-muted-foreground">NLP-mined interventions from NASA publications</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">5</div>
                  <div>
                    <h4 className="font-semibold">Clinical Dashboard Output</h4>
                    <p className="text-sm text-muted-foreground">Actionable insights with SHAP explainability</p>
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