import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ComposedChart, Area } from "recharts";
import { BarChart3, TrendingUp, Zap, Thermometer, Activity, Eye, Settings } from "lucide-react";
import { useState } from "react";

const furnaceData = [
  {
    id: "F1",
    name: "Blast Furnace 1",
    temperature: [1420, 1415, 1435, 1428, 1442, 1430],
    power: [1250, 1240, 1280, 1260, 1290, 1270],
    emissions: [85, 82, 88, 92, 89, 87],
    efficiency: [92, 91, 94, 93, 95, 94],
    status: "live"
  },
  {
    id: "F2",
    name: "Blast Furnace 2",
    temperature: [1380, 1375, 1395, 1388, 1402, 1390],
    power: [1180, 1170, 1210, 1190, 1220, 1200],
    emissions: [78, 75, 82, 85, 79, 77],
    efficiency: [89, 88, 91, 90, 92, 91],
    status: "live"
  },
  {
    id: "F3",
    name: "Blast Furnace 3",
    temperature: [1450, 1445, 1465, 1458, 1472, 1460],
    power: [1320, 1310, 1350, 1330, 1360, 1340],
    emissions: [95, 92, 98, 102, 99, 97],
    efficiency: [87, 86, 89, 88, 90, 89],
    status: "alert"
  },
  {
    id: "F4",
    name: "Blast Furnace 4",
    temperature: [1400, 1395, 1415, 1408, 1422, 1410],
    power: [1220, 1210, 1250, 1230, 1260, 1240],
    emissions: [82, 79, 85, 88, 83, 81],
    efficiency: [91, 90, 93, 92, 94, 93],
    status: "idle"
  }
];

const timeLabels = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"];

export default function MultiFurnace() {
  const [selectedMetric, setSelectedMetric] = useState("temperature");
  const [selectedFurnaces, setSelectedFurnaces] = useState(["F1", "F2", "F3", "F4"]);

  const getMetricData = () => {
    return timeLabels.map((time, index) => {
      const dataPoint: any = { time };
      selectedFurnaces.forEach(furnaceId => {
        const furnace = furnaceData.find(f => f.id === furnaceId);
        if (furnace) {
          dataPoint[furnaceId] = furnace[selectedMetric as keyof typeof furnace][index];
        }
      });
      return dataPoint;
    });
  };

  const getMetricLabel = (metric: string) => {
    switch (metric) {
      case "temperature": return "Temperature (°C)";
      case "power": return "Power (A)";
      case "emissions": return "Emissions (ppm)";
      case "efficiency": return "Efficiency (%)";
      default: return metric;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "live": return <Badge className="bg-green-100 text-green-800">LIVE</Badge>;
      case "idle": return <Badge variant="secondary">IDLE</Badge>;
      case "alert": return <Badge className="bg-red-100 text-red-800">ALERT</Badge>;
      default: return <Badge variant="outline">UNKNOWN</Badge>;
    }
  };

  const toggleFurnace = (furnaceId: string) => {
    setSelectedFurnaces(prev =>
      prev.includes(furnaceId)
        ? prev.filter(id => id !== furnaceId)
        : [...prev, furnaceId]
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Multi-Furnace Comparison</h1>
          <p className="text-muted-foreground">Compare performance across all furnaces simultaneously</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
          <Button>
            <BarChart3 className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Furnace Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Furnaces to Compare</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {furnaceData.map((furnace) => (
              <Button
                key={furnace.id}
                variant={selectedFurnaces.includes(furnace.id) ? "default" : "outline"}
                onClick={() => toggleFurnace(furnace.id)}
                className="flex items-center gap-2"
              >
                {getStatusBadge(furnace.status)}
                {furnace.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Metric Selection and Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Metric Selection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Compare By:</label>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="temperature">
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4" />
                      Temperature
                    </div>
                  </SelectItem>
                  <SelectItem value="power">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Power Consumption
                    </div>
                  </SelectItem>
                  <SelectItem value="emissions">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Emissions
                    </div>
                  </SelectItem>
                  <SelectItem value="efficiency">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Efficiency
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Current Values</h4>
              {selectedFurnaces.map(furnaceId => {
                const furnace = furnaceData.find(f => f.id === furnaceId);
                if (!furnace) return null;

                const currentValue = furnace[selectedMetric as keyof typeof furnace][furnace[selectedMetric as keyof typeof furnace].length - 1];
                const unit = selectedMetric === "temperature" ? "°C" :
                           selectedMetric === "power" ? "A" :
                           selectedMetric === "emissions" ? "ppm" : "%";

                return (
                  <div key={furnaceId} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                    <span className="text-sm">{furnace.name}</span>
                    <span className="font-mono font-medium">{currentValue}{unit}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>{getMetricLabel(selectedMetric)} Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={getMetricData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                {selectedFurnaces.map((furnaceId, index) => {
                  const colors = ["#3b82f6", "#ef4444", "#22c55e", "#f59e0b"];
                  return (
                    <Line
                      key={furnaceId}
                      type="monotone"
                      dataKey={furnaceId}
                      stroke={colors[index % colors.length]}
                      strokeWidth={2}
                      name={furnaceData.find(f => f.id === furnaceId)?.name}
                      dot={{ fill: colors[index % colors.length], strokeWidth: 2, r: 4 }}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Comparison Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {selectedFurnaces.map(furnaceId => {
              const furnace = furnaceData.find(f => f.id === furnaceId);
              if (!furnace) return null;

              return (
                <Card key={furnaceId}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{furnace.name}</CardTitle>
                      {getStatusBadge(furnace.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-muted-foreground">Temp</div>
                        <div className="font-bold">{furnace.temperature[furnace.temperature.length - 1]}°C</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Power</div>
                        <div className="font-bold">{furnace.power[furnace.power.length - 1]}A</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Emissions</div>
                        <div className="font-bold">{furnace.emissions[furnace.emissions.length - 1]}ppm</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Efficiency</div>
                        <div className="font-bold">{furnace.efficiency[furnace.efficiency.length - 1]}%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Temperature Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={timeLabels.map((time, index) => ({
                    time,
                    F1: furnaceData[0].temperature[index],
                    F2: furnaceData[1].temperature[index],
                    F3: furnaceData[2].temperature[index],
                    F4: furnaceData[3].temperature[index]
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="F1" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="F2" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="F3" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="F4" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Power Consumption Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={timeLabels.map((time, index) => ({
                    time,
                    F1: furnaceData[0].power[index],
                    F2: furnaceData[1].power[index],
                    F3: furnaceData[2].power[index],
                    F4: furnaceData[3].power[index]
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="F1" fill="#3b82f6" name="Furnace 1" />
                    <Bar dataKey="F2" fill="#ef4444" name="Furnace 2" />
                    <Bar dataKey="F3" fill="#22c55e" name="Furnace 3" />
                    <Bar dataKey="F4" fill="#f59e0b" name="Furnace 4" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="efficiency">
          <Card>
            <CardHeader>
              <CardTitle>Efficiency Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={timeLabels.map((time, index) => ({
                  time,
                  F1: furnaceData[0].efficiency[index],
                  F2: furnaceData[1].efficiency[index],
                  F3: furnaceData[2].efficiency[index],
                  F4: furnaceData[3].efficiency[index]
                }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[85, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="F1" stroke="#3b82f6" strokeWidth={3} name="Furnace 1" />
                  <Line type="monotone" dataKey="F2" stroke="#ef4444" strokeWidth={3} name="Furnace 2" />
                  <Line type="monotone" dataKey="F3" stroke="#22c55e" strokeWidth={3} name="Furnace 3" />
                  <Line type="monotone" dataKey="F4" stroke="#f59e0b" strokeWidth={3} name="Furnace 4" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Active Alerts Across Furnaces</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { furnace: "F3", severity: "critical", message: "Temperature exceeding threshold", time: "2 min ago" },
                  { furnace: "F2", severity: "warning", message: "High vibration detected", time: "15 min ago" },
                  { furnace: "F1", severity: "info", message: "Maintenance due in 3 days", time: "1 hour ago" },
                  { furnace: "F4", severity: "warning", message: "Power consumption spike", time: "30 min ago" }
                ].map((alert, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant={alert.severity === "critical" ? "destructive" : alert.severity === "warning" ? "secondary" : "outline"}>
                        {alert.furnace}
                      </Badge>
                      <div>
                        <div className="font-medium">{alert.message}</div>
                        <div className="text-sm text-muted-foreground">{alert.time}</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}