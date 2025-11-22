import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Thermometer, Gauge, Activity, Droplet, Wind, Beaker, Search } from "lucide-react";
import { useState } from "react";
import { useWebSocket } from "@/hooks/use-websocket";

interface Sensor {
  id: string;
  name: string;
  type: "temperature" | "pressure" | "vibration" | "chemical" | "flow" | "level";
  value: number;
  unit: string;
  status: "healthy" | "warning" | "critical" | "offline";
  zone: string;
  trend: "up" | "down" | "stable";
}

export default function Sensors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterZone, setFilterZone] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const { data, isConnected } = useWebSocket();
  const sensors: Sensor[] = data?.sensors || [];

  const getIcon = (type: string) => {
    switch (type) {
      case "temperature": return Thermometer;
      case "pressure": return Gauge;
      case "vibration": return Activity;
      case "chemical": return Beaker;
      case "flow": return Wind;
      case "level": return Droplet;
      default: return Activity;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "bg-accent text-accent-foreground";
      case "warning": return "bg-yellow-500 text-background";
      case "critical": return "bg-destructive text-destructive-foreground";
      case "offline": return "bg-muted text-muted-foreground";
      default: return "bg-muted";
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return "↑";
    if (trend === "down") return "↓";
    return "→";
  };

  const filteredSensors = sensors.filter(sensor => {
    const matchesSearch = sensor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sensor.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesZone = filterZone === "all" || sensor.zone === filterZone;
    const matchesStatus = filterStatus === "all" || sensor.status === filterStatus;
    return matchesSearch && matchesZone && matchesStatus;
  });

  const zones = Array.from(new Set(sensors.map(s => s.zone)));

  return (
    <div className="flex-1 overflow-auto p-6 grid-bg">
      <div className="max-w-screen-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">IoT Sensor Network</h1>
          <p className="text-muted-foreground">Real-time monitoring of {sensors.length} active sensors</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search sensors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-sensors"
            />
          </div>
          <Select value={filterZone} onValueChange={setFilterZone}>
            <SelectTrigger className="w-full sm:w-48" data-testid="select-zone">
              <SelectValue placeholder="All Zones" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Zones</SelectItem>
              {zones.map(zone => (
                <SelectItem key={zone} value={zone}>{zone}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-48" data-testid="select-status">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="healthy">Healthy</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredSensors.map((sensor) => {
            const Icon = getIcon(sensor.type);
            return (
              <Card
                key={sensor.id}
                className="glass-card hover-elevate overflow-visible"
                data-testid={`card-sensor-${sensor.id.toLowerCase()}`}
              >
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-8 h-8 rounded-md bg-card flex items-center justify-center border border-card-border">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <Badge className={`${getStatusColor(sensor.status)} text-xs ${
                      sensor.status === "critical" ? "pulse-glow" : ""
                    }`}>
                      {sensor.status}
                    </Badge>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-card-foreground truncate" title={sensor.name}>
                      {sensor.name}
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">{sensor.id}</div>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold font-mono text-primary counter">
                      {typeof sensor.value === 'number' && sensor.value > 100 
                        ? Math.round(sensor.value)
                        : sensor.value.toFixed(1)
                      }
                    </span>
                    <span className="text-xs text-muted-foreground">{sensor.unit}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{sensor.zone}</span>
                    <span className="font-mono text-card-foreground">{getTrendIcon(sensor.trend)}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredSensors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No sensors found matching your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
