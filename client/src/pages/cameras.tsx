import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Maximize2, Play, Pause } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { CameraFeed } from "@shared/schema";

export default function Cameras() {
  const [expandedCamera, setExpandedCamera] = useState<string | null>(null);
  
  const { data: cameras = [], isLoading } = useQuery<CameraFeed[]>({
    queryKey: ['/api/cameras'],
    refetchInterval: 3000, // Refetch every 3 seconds for new detections
  });

  return (
    <div className="flex-1 overflow-auto p-6 grid-bg">
      <div className="max-w-screen-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Camera Detection System</h1>
          <p className="text-muted-foreground">AI-powered visual inspection across {cameras.length} camera feeds</p>
        </div>

        {isLoading && (
          <Card className="glass-card">
            <CardContent className="p-6 text-center text-muted-foreground">
              Loading camera feeds...
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4 mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Cameras</p>
                    <p className="text-2xl font-bold font-mono text-accent counter">
                      {cameras.filter(c => c.status === "online").length}
                    </p>
                  </div>
                  <Camera className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Detections</p>
                    <p className="text-2xl font-bold font-mono text-yellow-500 counter">
                      {cameras.reduce((sum, cam) => sum + cam.defectCount, 0)}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <span className="text-yellow-500 text-lg">!</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Detection Rate</p>
                    <p className="text-2xl font-bold font-mono text-primary counter">
                      {((cameras.filter(c => c.defectCount > 0).length / cameras.length) * 100).toFixed(0)}%
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary text-lg">✓</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cameras.map((camera) => (
            <Card
              key={camera.id}
              className="glass-card hover-elevate overflow-visible"
              data-testid={`card-camera-${camera.id.toLowerCase()}`}
            >
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-card flex items-center justify-center border border-card-border">
                    <Camera className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base text-card-foreground">{camera.name}</CardTitle>
                    <p className="text-xs text-muted-foreground font-mono">{camera.location}</p>
                  </div>
                </div>
                <Badge
                  className={`${
                    camera.status === "online" 
                      ? "bg-accent text-accent-foreground pulse-glow" 
                      : "bg-muted text-muted-foreground"
                  }`}
                  data-testid={`badge-status-${camera.id.toLowerCase()}`}
                >
                  {camera.status}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                <div
                  className="relative aspect-video bg-background rounded-md overflow-hidden border border-card-border"
                  data-testid={`video-feed-${camera.id.toLowerCase()}`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      {camera.status === "online" ? (
                        <>
                          <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                            <Play className="w-8 h-8 text-primary" />
                          </div>
                          <p className="text-xs text-muted-foreground">Live Feed</p>
                        </>
                      ) : (
                        <>
                          <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-muted/20 flex items-center justify-center">
                            <Pause className="w-8 h-8 text-muted-foreground" />
                          </div>
                          <p className="text-xs text-muted-foreground">Offline</p>
                        </>
                      )}
                    </div>
                  </div>

                  {camera.detections.map((detection) => (
                    <div
                      key={detection.id}
                      className="absolute border-2 border-destructive rounded glow-accent"
                      style={{
                        left: `${(detection.boundingBox.x / 400) * 100}%`,
                        top: `${(detection.boundingBox.y / 300) * 100}%`,
                        width: `${(detection.boundingBox.width / 400) * 100}%`,
                        height: `${(detection.boundingBox.height / 300) * 100}%`,
                      }}
                    >
                      <div className="absolute -top-6 left-0 bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded">
                        {detection.type} ({Math.round(detection.confidence * 100)}%)
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-muted-foreground">Defects:</div>
                    <Badge
                      variant={camera.defectCount > 0 ? "destructive" : "secondary"}
                      className="font-mono"
                      data-testid={`badge-defects-${camera.id.toLowerCase()}`}
                    >
                      {camera.defectCount}
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setExpandedCamera(expandedCamera === camera.id ? null : camera.id)}
                    data-testid={`button-expand-${camera.id.toLowerCase()}`}
                  >
                    <Maximize2 className="w-3 h-3 mr-2" />
                    {expandedCamera === camera.id ? "Minimize" : "Expand"}
                  </Button>
                </div>

                {camera.detections.length > 0 && (
                  <div className="pt-3 border-t border-card-border space-y-2">
                    <div className="text-xs text-muted-foreground font-semibold">Detected Issues:</div>
                    {camera.detections.map((detection) => (
                      <div
                        key={detection.id}
                        className="flex items-center justify-between text-xs p-2 rounded glass"
                      >
                        <span className="text-card-foreground">{detection.type}</span>
                        <Badge variant="outline" className="font-mono text-xs">
                          {Math.round(detection.confidence * 100)}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
