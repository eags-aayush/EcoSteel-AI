import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RefreshCw, ExternalLink, Zap, Wifi, Cpu, Activity } from "lucide-react";

export default function IoTSimulation() {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const refreshSimulation = () => {
    setIsLoading(true);
    const iframe = document.getElementById('wokwi-iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = iframe.src;
    }
  };

  return (
    <div className="flex-1 overflow-auto p-3 md:p-6 grid-bg">
      <div className="max-w-screen-2xl mx-auto space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 md:mb-3 flex items-center gap-3">
              <Cpu className="w-10 h-10 text-primary" />
              IoT Simulation
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Real-time IoT device simulation with ESP32 and sensors
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="flex items-center gap-2">
              <Wifi className="w-3 h-3" />
              Live Simulation
            </Badge>
            <Button variant="outline" size="sm" onClick={refreshSimulation}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a
                href="https://wokwi.com/projects/448318345180665857"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Open in Wokwi
              </a>
            </Button>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-lg font-medium">ESP32 Status</p>
                  <p className="text-sm text-muted-foreground">Online</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Wifi className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-lg font-medium">Network</p>
                  <p className="text-sm text-muted-foreground">Connected</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-lg font-medium">Sensors</p>
                  <p className="text-sm text-muted-foreground">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Wokwi Simulation Embed */}
        <div className="flex justify-center">
          <Card className="glass-card overflow-hidden" style={{ width: '70%', maxWidth: '1000px' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Cpu className="w-6 h-6" />
                ESP32 IoT Device Simulation
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative w-full" style={{ height: '600px' }}>
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-xl text-muted-foreground font-semibold">Loading IoT Simulation...</p>
                    </div>
                  </div>
                )}
                <iframe
                  id="wokwi-iframe"
                  src="https://wokwi.com/projects/448318345180665857"
                  className="w-full h-full border-0"
                  title="ESP32 IoT Simulation"
                  onLoad={handleIframeLoad}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Simulation Info */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-2xl">Simulation Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-xl">Hardware Components</h4>
                <ul className="text-lg text-muted-foreground space-y-2">
                  <li>• ESP32 Microcontroller</li>
                  <li>• DHT11 Temperature Sensor</li>
                  <li>• MQ-135 Air Quality Sensor</li>
                  <li>• Vibration Sensor (SW-420)</li>
                  <li>• LED Indicators</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-xl">Features</h4>
                <ul className="text-lg text-muted-foreground space-y-2">
                  <li>• Real-time sensor data</li>
                  <li>• WiFi connectivity simulation</li>
                  <li>• MQTT protocol support</li>
                  <li>• Industrial monitoring</li>
                  <li>• Alert system integration</li>
                </ul>
              </div>
            </div>
            <div className="pt-6 border-t">
              <p className="text-lg text-muted-foreground">
                This simulation demonstrates a complete IoT setup for industrial monitoring.
                The ESP32 collects data from various sensors and transmits it to the EcoSteel AI platform
                for real-time analysis and predictive maintenance.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}