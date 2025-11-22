import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Download, Calendar } from "lucide-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Area, AreaChart, Bar, BarChart } from "recharts";
import type { ProductionMetrics, Prediction } from "@shared/schema";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("24h");

  const { data: metrics = [], isLoading: metricsLoading } = useQuery<ProductionMetrics[]>({
    queryKey: ['/api/production-metrics', timeRange],
    refetchInterval: 5000,
  });

  const { data: predictions = [], isLoading: predictionsLoading } = useQuery<Prediction[]>({
    queryKey: ['/api/predictions'],
  });

  // Transform metrics data for charts
  const throughputData = metrics.map((m, i) => ({
    time: new Date(m.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    value: m.throughput,
  }));

  const defectRateData = metrics.map((m, i) => ({
    time: new Date(m.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    value: m.defectRate,
  }));

  const energyData = metrics.map((m, i) => ({
    time: new Date(m.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    value: m.energyConsumption,
  }));

  const oeeData = metrics.map((m, i) => ({
    time: new Date(m.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    availability: m.oee * 0.92,
    performance: m.oee * 0.95,
    quality: m.quality,
  }));

  const avgThroughput = metrics.length > 0 
    ? metrics.reduce((sum, m) => sum + m.throughput, 0) / metrics.length 
    : 0;
  const avgDefectRate = metrics.length > 0 
    ? metrics.reduce((sum, m) => sum + m.defectRate, 0) / metrics.length 
    : 0;
  const avgEnergy = metrics.length > 0 
    ? metrics.reduce((sum, m) => sum + m.energyConsumption, 0) / metrics.length 
    : 0;
  const avgOEE = metrics.length > 0 
    ? metrics.reduce((sum, m) => sum + m.oee, 0) / metrics.length 
    : 0;

  const isLoading = metricsLoading || predictionsLoading;

  return (
    <div className="flex-1 overflow-auto p-6 grid-bg">
      <div className="max-w-screen-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Production Analytics</h1>
            <p className="text-muted-foreground">Comprehensive performance metrics and trends</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" data-testid="button-date-range">
              <Calendar className="w-4 h-4 mr-2" />
              Last 24h
            </Button>
            <Button variant="default" data-testid="button-export">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {isLoading && (
          <Card className="glass-card">
            <CardContent className="p-6 text-center text-muted-foreground">
              Loading analytics data...
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Avg Throughput</p>
                <p className="text-2xl font-bold font-mono text-accent counter">{avgThroughput.toFixed(0)}</p>
                <p className="text-xs text-muted-foreground">tons/hour</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Avg Defect Rate</p>
                <p className="text-2xl font-bold font-mono text-yellow-500 counter">{avgDefectRate.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground">%</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Energy Usage</p>
                <p className="text-2xl font-bold font-mono text-primary counter">{avgEnergy.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">MWh</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Overall OEE</p>
                <p className="text-2xl font-bold font-mono text-accent counter">{avgOEE.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground">%</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Throughput Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={throughputData}>
                <defs>
                  <linearGradient id="colorThroughput" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
                <XAxis
                  dataKey="time"
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  fontSize={12}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                    color: "hsl(var(--popover-foreground))",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  fill="url(#colorThroughput)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Defect Rate Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={defectRateData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
                  <XAxis
                    dataKey="time"
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                    fontSize={12}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                    fontSize={12}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                      color: "hsl(var(--popover-foreground))",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="rgb(234 179 8)"
                    strokeWidth={2}
                    dot={{ fill: "rgb(234 179 8)", r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Energy Consumption</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
                  <XAxis
                    dataKey="time"
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                    fontSize={12}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                    fontSize={12}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                      color: "hsl(var(--popover-foreground))",
                    }}
                  />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">OEE Components</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={oeeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
                <XAxis
                  dataKey="time"
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  fontSize={12}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  fontSize={12}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                    color: "hsl(var(--popover-foreground))",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="availability"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  name="Availability"
                />
                <Line
                  type="monotone"
                  dataKey="performance"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Performance"
                />
                <Line
                  type="monotone"
                  dataKey="quality"
                  stroke="rgb(234 179 8)"
                  strokeWidth={2}
                  name="Quality"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
