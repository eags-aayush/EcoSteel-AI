import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Zap, Award, Gauge } from "lucide-react";
import { useWebSocket } from "@/hooks/use-websocket";

interface KPI {
  label: string;
  value: number;
  unit: string;
  change: number;
  trend: "up" | "down" | "stable";
  status: "good" | "warning" | "critical";
  icon: typeof Activity;
}

const iconMap = {
  "Production Rate": Activity,
  "Energy Efficiency": Zap,
  "Quality Score": Award,
  "Equipment Health": Gauge,
};

export default function Dashboard() {
  const { data, isConnected } = useWebSocket();

  const kpis: KPI[] = data?.kpis?.map(kpi => ({
    ...kpi,
    icon: iconMap[kpi.label as keyof typeof iconMap] || Activity,
  })) || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "text-accent";
      case "warning": return "text-yellow-500";
      case "critical": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return "↑";
    if (trend === "down") return "↓";
    return "→";
  };

  return (
    <div className="flex-1 overflow-auto p-6 grid-bg">
      <div className="max-w-screen-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Real-time steel plant monitoring and control</p>
        </div>

        {!isConnected && (
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-yellow-500">
                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                <span>Connecting to live data stream...</span>
              </div>
            </CardContent>
          </Card>
        )}

        {kpis.length === 0 && isConnected && (
          <Card className="glass-card">
            <CardContent className="p-6 text-center text-muted-foreground">
              Loading KPI data...
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => (
            <Card
              key={index}
              className="glass-card hover-elevate overflow-visible"
              data-testid={`card-kpi-${kpi.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">
                  {kpi.label}
                </CardTitle>
                <kpi.icon className={`w-4 h-4 ${getStatusColor(kpi.status)}`} />
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-3xl font-bold font-mono counter ${getStatusColor(kpi.status)} glow-text`}>
                      {kpi.value.toFixed(1)}
                    </span>
                    <span className="text-sm text-muted-foreground font-mono">{kpi.unit}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={kpi.change > 0 ? "default" : "secondary"}
                      className="text-xs font-mono"
                      data-testid={`badge-change-${kpi.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {getTrendIcon(kpi.trend)} {Math.abs(kpi.change).toFixed(1)}%
                    </Badge>
                    <span className="text-xs text-muted-foreground">vs last hour</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 glass-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Production Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Production chart will render here with real-time data
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Quick Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { severity: "warning", message: "Furnace 3 temp approaching limit", time: "2m ago" },
                  { severity: "info", message: "Maintenance scheduled for F1", time: "1h ago" },
                  { severity: "critical", message: "Sensor B12 offline", time: "5m ago" },
                ].map((alert, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-md glass hover-elevate"
                    data-testid={`alert-${i}`}
                  >
                    <div className={`w-2 h-2 rounded-full mt-1.5 pulse-glow ${
                      alert.severity === "critical" ? "bg-destructive" :
                      alert.severity === "warning" ? "bg-yellow-500" :
                      "bg-primary"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-card-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1 font-mono">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
