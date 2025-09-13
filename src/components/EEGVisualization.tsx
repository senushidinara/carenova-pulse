import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EEGWaveProps {
  frequency: string;
  color: string;
  amplitude: number;
  region: string;
}

const EEGWave = ({ frequency, color, amplitude, region }: EEGWaveProps) => {
  const [points, setPoints] = useState<number[]>([]);

  useEffect(() => {
    const generateWave = () => {
      const newPoints = [];
      const time = Date.now() / 1000;
      
      for (let i = 0; i < 200; i++) {
        const x = (i - 100) / 10;
        const wave = Math.sin((x + time) * amplitude) * (20 + Math.random() * 10);
        newPoints.push(wave);
      }
      setPoints(newPoints);
    };

    generateWave();
    const interval = setInterval(generateWave, 100);
    return () => clearInterval(interval);
  }, [amplitude]);

  const pathData = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${index * 2} ${50 + point}`)
    .join(' ');

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: color }} />
          <span className="text-sm font-medium">{frequency}</span>
          <Badge variant="outline" className="text-xs">{region}</Badge>
        </div>
        <span className="text-xs text-muted-foreground">{Math.floor(amplitude * 10)}Hz</span>
      </div>
      <div className="bg-black/5 dark:bg-white/5 rounded-lg p-4 overflow-hidden">
        <svg width="400" height="100" className="w-full">
          <defs>
            <linearGradient id={`gradient-${frequency}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color} stopOpacity="0.1" />
              <stop offset="50%" stopColor={color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={color} stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            d={pathData}
            stroke={color}
            strokeWidth="2"
            fill="none"
            className="animate-eeg-wave"
          />
          <path
            d={`${pathData} L ${points.length * 2} 100 L 0 100 Z`}
            fill={`url(#gradient-${frequency})`}
            opacity="0.3"
          />
        </svg>
      </div>
    </div>
  );
};

const EEGVisualization = () => {
  const [sleepStage, setSleepStage] = useState("REM");

  const brainRegions = [
    { name: "Frontal", waves: [
      { frequency: "Delta", color: "#60A5FA", amplitude: 0.5, region: "F3-F4" },
      { frequency: "Alpha", color: "#EC4899", amplitude: 0.8, region: "F3-F4" },
    ]},
    { name: "Temporal", waves: [
      { frequency: "Theta", color: "#A78BFA", amplitude: 0.6, region: "T3-T4" },
      { frequency: "Beta", color: "#38BDF8", amplitude: 1.2, region: "T3-T4" },
    ]},
    { name: "Parietal", waves: [
      { frequency: "Alpha", color: "#EC4899", amplitude: 0.7, region: "P3-P4" },
      { frequency: "Gamma", color: "#A78BFA", amplitude: 1.5, region: "P3-P4" },
    ]},
    { name: "Occipital", waves: [
      { frequency: "Alpha", color: "#EC4899", amplitude: 0.9, region: "O1-O2" },
      { frequency: "Delta", color: "#60A5FA", amplitude: 0.4, region: "O1-O2" },
    ]},
  ];

  useEffect(() => {
    const stages = ["REM", "NREM 1", "NREM 2", "NREM 3"];
    const interval = setInterval(() => {
      setSleepStage(stages[Math.floor(Math.random() * stages.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <Card className="card-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              Real-time EEG Monitoring
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Sleep Stage: {sleepStage}</Badge>
              <Badge variant="secondary">Recording</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {brainRegions.map((region) => (
            <div key={region.name} className="space-y-3">
              <h3 className="font-semibold text-primary">{region.name} Cortex</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {region.waves.map((wave) => (
                  <EEGWave
                    key={`${region.name}-${wave.frequency}`}
                    frequency={wave.frequency}
                    color={wave.color}
                    amplitude={wave.amplitude}
                    region={wave.region}
                  />
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="card-shadow">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">8.5Hz</div>
              <div className="text-sm text-muted-foreground">Dominant Alpha</div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-shadow">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">92%</div>
              <div className="text-sm text-muted-foreground">Sleep Efficiency</div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-shadow">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">3.2μV</div>
              <div className="text-sm text-muted-foreground">Avg Amplitude</div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-shadow">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">Normal</div>
              <div className="text-sm text-muted-foreground">Brain Activity</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EEGVisualization;
