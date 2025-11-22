import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Smartphone, AlertTriangle, CheckCircle, Wrench, Zap, Thermometer, Camera } from "lucide-react";

const arInstructions = [
  {
    id: 1,
    title: "High Vibration Detected",
    description: "Motor M3 showing abnormal vibration levels",
    severity: "high",
    location: "Furnace 1 - Motor Assembly",
    steps: [
      "Approach motor M3 safely",
      "Check vibration sensor readings",
      "Inspect bearing housing for damage",
      "Check lubrication levels",
      "Schedule maintenance if vibration > 5.0 mm/s"
    ],
    icon: AlertTriangle,
    color: "text-red-600"
  },
  {
    id: 2,
    title: "Door Safety Lock",
    description: "Ensure safety interlock is engaged",
    severity: "critical",
    location: "Furnace 2 - Access Door",
    steps: [
      "Verify door is fully closed",
      "Check safety lock indicator light",
      "Test emergency stop functionality",
      "Confirm pressure sensors are active",
      "Only proceed with lock engaged"
    ],
    icon: CheckCircle,
    color: "text-green-600"
  },
  {
    id: 3,
    title: "Overheating Zone",
    description: "Temperature exceeding safe limits",
    severity: "high",
    location: "Furnace 3 - Heating Zone B",
    steps: [
      "Reduce power input by 20%",
      "Check cooling system status",
      "Monitor temperature for 5 minutes",
      "Inspect insulation integrity",
      "Contact maintenance if temp > 1500°C"
    ],
    icon: Thermometer,
    color: "text-orange-600"
  },
  {
    id: 4,
    title: "Gas Leak Detected",
    description: "Minor gas pressure fluctuation",
    severity: "medium",
    location: "Furnace 1 - Gas Manifold",
    steps: [
      "Isolate affected gas line",
      "Check pressure gauges",
      "Inspect valve connections",
      "Run leak detection test",
      "Replace faulty components"
    ],
    icon: Zap,
    color: "text-yellow-600"
  }
];

export default function ARGuide() {
  const [selectedInstruction, setSelectedInstruction] = useState(arInstructions[0]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-100 text-red-800 border-red-200";
      case "high": return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium": return "bg-yellow-50 text-yellow-800 border-yellow-200";
      default: return "bg-gray-50 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">AR Operator Guide</h1>
          <p className="text-muted-foreground">Augmented reality assistance for furnace operations</p>
        </div>
        <Badge variant="outline" className="text-accent">
          <Smartphone className="w-4 h-4 mr-1" />
          Mobile Optimized
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Camera Preview Mockup */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Live AR View
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-[9/16] bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg overflow-hidden">
                {/* Mock AR overlay elements */}
                <div className="absolute inset-0">
                  {/* Furnace outline */}
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-1/3 border-2 border-blue-400 rounded-lg opacity-75">
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                      Furnace 1
                    </div>
                  </div>

                  {/* Warning indicators */}
                  <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-red-500 rounded-full animate-pulse">
                    <div className="absolute -right-20 top-0 bg-red-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      High Vibration
                    </div>
                  </div>

                  <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-orange-500 rounded-full animate-pulse">
                    <div className="absolute -left-24 top-0 bg-orange-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      Overheating
                    </div>
                  </div>

                  {/* Sensor data overlays */}
                  <div className="absolute top-1/2 left-1/6 bg-black/70 text-white text-xs p-2 rounded">
                    <div>T: 1420°C</div>
                    <div>V: 3.2 mm/s</div>
                  </div>

                  <div className="absolute bottom-1/4 right-1/6 bg-black/70 text-white text-xs p-2 rounded">
                    <div>Gas: 98%</div>
                    <div>Door: LOCKED</div>
                  </div>
                </div>

                {/* Camera frame indicator */}
                <div className="absolute inset-2 border border-white/30 rounded pointer-events-none">
                  <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-white"></div>
                  <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-white"></div>
                  <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-white"></div>
                  <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-white"></div>
                </div>

                {/* Center crosshair */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 border border-white/50 rounded-full">
                    <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button className="flex-1">
                  <Camera className="w-4 h-4 mr-2" />
                  Scan Equipment
                </Button>
                <Button variant="outline">
                  <Wrench className="w-4 h-4 mr-2" />
                  Maintenance Mode
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions Panel */}
        <div className="space-y-6">
          {/* Active Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Active Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {arInstructions.map((instruction) => (
                <div
                  key={instruction.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedInstruction.id === instruction.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedInstruction(instruction)}
                >
                  <div className="flex items-start gap-3">
                    <instruction.icon className={`w-5 h-5 mt-0.5 ${instruction.color}`} />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{instruction.title}</div>
                      <div className="text-xs text-muted-foreground">{instruction.location}</div>
                      <Badge className={`mt-1 text-xs ${getSeverityColor(instruction.severity)}`}>
                        {instruction.severity}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Detailed Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <selectedInstruction.icon className={`w-5 h-5 ${selectedInstruction.color}`} />
                  <span className="font-medium">{selectedInstruction.title}</span>
                </div>
                <p className="text-sm text-muted-foreground">{selectedInstruction.description}</p>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Step-by-step procedure:</h4>
                  <ol className="space-y-1">
                    {selectedInstruction.steps.map((step, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mt-0.5">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="pt-3 border-t">
                  <Button className="w-full">
                    Mark as Complete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>AR System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-sm font-medium">Camera</div>
              <div className="text-xs text-muted-foreground">Active</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-sm font-medium">GPS</div>
              <div className="text-xs text-muted-foreground">Locked</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-sm font-medium">Sensors</div>
              <div className="text-xs text-muted-foreground">Connected</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-sm font-medium">Network</div>
              <div className="text-xs text-muted-foreground">Limited</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}