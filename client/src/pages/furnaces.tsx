import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Gauge, Zap, Activity } from "lucide-react";
import { useWebSocket } from "@/hooks/use-websocket";

interface Furnace {
  id: string;
  name: string;
  status: "active" | "idle" | "maintenance" | "offline";
  temperature: number;
  targetTemperature: number;
  pressure: number;
  targetPressure: number;
  productionRate: number;
  energyConsumption: number;
  composition: {
    carbon: number;
    silicon: number;
    manganese: number;
    iron: number;
  };
}

export default function Furnaces() {
  const { data, isConnected } = useWebSocket();
  const furnaces: Furnace[] = data?.furnaces || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-accent";
      case "idle": return "bg-primary";
      case "maintenance": return "bg-yellow-500";
      case "offline": return "bg-muted";
      default: return "bg-muted";
    }
  };

  const getTemperatureColor = (temp: number, target: number) => {
    const diff = Math.abs(temp - target);
    if (diff < 30) return "text-accent";
    if (diff < 50) return "text-yellow-500";
    return "text-destructive";
  };

  return (
    <div className="flex-1 overflow-auto p-6 grid-bg">
      <div className="max-w-screen-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Multi-Furnace Monitoring</h1>
          <p className="text-muted-foreground">Live status and control for all steel production furnaces</p>
        </div>

        {!isConnected && (
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-yellow-500">
                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                <span>Connecting to live furnace data...</span>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {furnaces.map((furnace) => (
            <Card
              key={furnace.id}
              className="glass-card hover-elevate overflow-visible"
              data-testid={`card-furnace-${furnace.id.toLowerCase()}`}
            >
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-card flex items-center justify-center border border-card-border">
                    <Flame className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base text-card-foreground">{furnace.name}</CardTitle>
                    <p className="text-xs text-muted-foreground font-mono">{furnace.id}</p>
                  </div>
                </div>
                <Badge
                  className={`${getStatusColor(furnace.status)} text-background font-medium ${
                    furnace.status === "active" ? "pulse-glow" : ""
                  }`}
                  data-testid={`badge-status-${furnace.id.toLowerCase()}`}
                >
                  {furnace.status}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Gauge className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Temperature</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-2xl font-bold font-mono counter ${
                        getTemperatureColor(furnace.temperature, furnace.targetTemperature)
                      } glow-text`}>
                        {Math.round(furnace.temperature)}
                      </span>
                      <span className="text-xs text-muted-foreground">°C</span>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      Target: {furnace.targetTemperature}°C
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Activity className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Pressure</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold font-mono text-primary counter">
                        {furnace.pressure.toFixed(1)}
                      </span>
                      <span className="text-xs text-muted-foreground">bar</span>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      Target: {furnace.targetPressure} bar
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Production Rate</span>
                    <span className="font-mono text-card-foreground">{furnace.productionRate} t/h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-3 h-3 text-yellow-500" />
                    <span className="text-xs text-muted-foreground">Energy</span>
                    <span className="ml-auto text-xs font-mono text-card-foreground">
                      {furnace.energyConsumption} kW
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-card-border">
                  <div className="text-xs text-muted-foreground mb-2">Chemical Composition</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(furnace.composition).map(([element, value]) => (
                      <div key={element} className="flex justify-between">
                        <span className="text-muted-foreground capitalize">{element}</span>
                        <span className="font-mono text-card-foreground">{value.toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
