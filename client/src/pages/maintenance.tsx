import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from "recharts";
import { Wrench, AlertTriangle, TrendingUp, Calendar, Activity, Gauge } from "lucide-react";

const vibrationData = [
  { time: "00:00", vibration: 2.1 },
  { time: "04:00", vibration: 2.3 },
  { time: "08:00", vibration: 3.1 },
  { time: "12:00", vibration: 4.2 },
  { time: "16:00", vibration: 3.8 },
  { time: "20:00", vibration: 2.5 },
];

const anomalyData = [
  { x: 1, y: 2.1, anomaly: false },
  { x: 2, y: 2.3, anomaly: false },
  { x: 3, y: 3.1, anomaly: false },
  { x: 4, y: 4.2, anomaly: true },
  { x: 5, y: 3.8, anomaly: false },
  { x: 6, y: 2.5, anomaly: false },
];

const components = [
  {
    name: "Main Motor",
    health: 78,
    risk: "Medium",
    nextMaintenance: "2024-02-15",
    status: "Normal",
    location: "Furnace 1"
  },
  {
    name: "Bearing Assembly",
    health: 45,
    risk: "High",
    nextMaintenance: "2024-01-28",
    status: "Warning",
    location: "Furnace 2"
  },
  {
    name: "Conveyor Belt",
    health: 92,
    risk: "Low",
    nextMaintenance: "2024-03-10",
    status: "Normal",
    location: "Furnace 1"
  },
  {
    name: "Gas Valve",
    health: 67,
    risk: "Medium",
    nextMaintenance: "2024-02-05",
    status: "Normal",
    location: "Furnace 3"
  },
];

export default function Maintenance() {
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low": return "text-green-600 bg-green-100";
      case "medium": return "text-yellow-600 bg-yellow-100";
      case "high": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Predictive Maintenance</h1>
          <p className="text-muted-foreground">AI-powered equipment health monitoring and maintenance scheduling</p>
        </div>
        <Badge variant="outline" className="text-accent">
          <Activity className="w-4 h-4 mr-1" />
          AI Monitoring Active
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Score</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining Life</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3 Years</div>
            <p className="text-xs text-muted-foreground">
              Average across all equipment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Maintenance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Jan 28</div>
            <p className="text-xs text-muted-foreground">
              Bearing Assembly - Furnace 2
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">1 critical</span>, 2 warnings
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vibration Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Vibration Trend Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={vibrationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis label={{ value: 'Vibration (mm/s)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="vibration"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Anomaly Detection */}
        <Card>
          <CardHeader>
            <CardTitle>Anomaly Detection</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={anomalyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" />
                <YAxis label={{ value: 'Vibration Level', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Scatter
                  dataKey="y"
                  fill="#22c55e"
                />
                {anomalyData.filter(d => d.anomaly).map((entry, index) => (
                  <Scatter
                    key={`anomaly-${index}`}
                    data={[entry]}
                    dataKey="y"
                    fill="#ef4444"
                  />
                ))}
              </ScatterChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Normal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm">Anomaly</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Components Table */}
      <Card>
        <CardHeader>
          <CardTitle>Equipment Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Component</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Health Score</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Next Maintenance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {components.map((component, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{component.name}</TableCell>
                  <TableCell>{component.location}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={component.health} className="w-16" />
                      <span className="text-sm font-mono">{component.health}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRiskColor(component.risk)}>
                      {component.risk}
                    </Badge>
                  </TableCell>
                  <TableCell>{component.nextMaintenance}</TableCell>
                  <TableCell>
                    <Badge variant={component.status === "Normal" ? "default" : "destructive"}>
                      {component.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Wrench className="w-4 h-4 mr-1" />
                      Schedule
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Maintenance Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Maintenance Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: "Jan 28, 2024", component: "Bearing Assembly", furnace: "F2", type: "Critical", priority: "High" },
              { date: "Feb 5, 2024", component: "Gas Valve", furnace: "F3", type: "Preventive", priority: "Medium" },
              { date: "Feb 15, 2024", component: "Main Motor", furnace: "F1", type: "Inspection", priority: "Low" },
              { date: "Feb 22, 2024", component: "Conveyor Belt", furnace: "F1", type: "Lubrication", priority: "Low" },
            ].map((schedule, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold">{schedule.date.split(',')[0]}</div>
                    <div className="text-sm text-muted-foreground">Jan</div>
                  </div>
                  <div>
                    <div className="font-medium">{schedule.component}</div>
                    <div className="text-sm text-muted-foreground">{schedule.furnace} - {schedule.type}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={
                    schedule.priority === "High" ? "destructive" :
                    schedule.priority === "Medium" ? "secondary" : "outline"
                  }>
                    {schedule.priority}
                  </Badge>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Maintenance History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Maintenance Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: "Jan 15, 2024", component: "Temperature Sensor", action: "Calibration", technician: "John Smith", status: "Completed" },
              { date: "Jan 12, 2024", component: "Gas Manifold", action: "Leak Test", technician: "Sarah Johnson", status: "Completed" },
              { date: "Jan 8, 2024", component: "Motor Bearing", action: "Lubrication", technician: "Mike Davis", status: "Completed" },
              { date: "Jan 5, 2024", component: "Control Panel", action: "Software Update", technician: "Admin", status: "Completed" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">{activity.component}</div>
                  <div className="text-sm text-muted-foreground">{activity.action} - {activity.technician}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{activity.date}</div>
                  <Badge variant="outline" className="text-green-600">{activity.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}