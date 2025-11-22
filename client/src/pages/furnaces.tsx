import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from "recharts";
import { Flame, Thermometer, Zap, Activity, AlertTriangle, CheckCircle, MapPin, Settings, Eye, BarChart3, Wrench, Calendar, Clock, Power, RotateCcw, AlertCircle, CheckSquare, Camera, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";

const temperatureData = [
  { time: "00:00", temp: 1420, current: 1250 },
  { time: "04:00", temp: 1415, current: 1240 },
  { time: "08:00", temp: 1435, current: 1280 },
  { time: "12:00", temp: 1428, current: 1260 },
  { time: "16:00", temp: 1442, current: 1290 },
  { time: "20:00", temp: 1430, current: 1270 },
];

const emissionsData = [
  { time: "00:00", nox: 45, co: 120 },
  { time: "04:00", nox: 42, co: 115 },
  { time: "08:00", nox: 48, co: 125 },
  { time: "12:00", nox: 38, co: 110 },
  { time: "16:00", nox: 41, co: 118 },
  { time: "20:00", nox: 35, co: 105 },
];

const sensors = [
  { name: "Temperature Sensor", status: "healthy", value: "1420°C", location: "Main Chamber" },
  { name: "Vibration Sensor", status: "warning", value: "4.2 mm/s", location: "Motor Assembly" },
  { name: "Gas Sensor", status: "healthy", value: "98% O2", location: "Gas Manifold" },
  { name: "Humidity Sensor", status: "healthy", value: "45%", location: "Control Room" },
  { name: "Door Sensor", status: "healthy", value: "Closed", location: "Access Door" },
  { name: "Relay State", status: "healthy", value: "Active", location: "Power Panel" },
];

const alarms = [
  { id: "ALM001", severity: "critical", message: "Temperature exceeding threshold", time: "2 min ago", status: "active" },
  { id: "ALM002", severity: "warning", message: "High vibration detected", time: "15 min ago", status: "acknowledged" },
  { id: "ALM003", severity: "info", message: "Maintenance due in 3 days", time: "1 hour ago", status: "active" },
];

const maintenanceHistory = [
  { date: "2024-01-15", type: "Preventive", component: "Gas Valve", technician: "John Smith", status: "Completed", duration: "2.5 hours" },
  { date: "2024-01-12", type: "Corrective", component: "Temperature Sensor", technician: "Sarah Johnson", status: "Completed", duration: "1.2 hours" },
  { date: "2024-01-08", type: "Inspection", component: "Motor Bearing", technician: "Mike Davis", status: "Completed", duration: "3.1 hours" },
  { date: "2024-01-05", type: "Calibration", component: "Control Panel", technician: "Admin", status: "Completed", duration: "0.8 hours" },
];

const alertsHistory = [
  { id: "ALT001", severity: "critical", message: "Temperature spike to 1580°C", time: "2024-01-15 14:32", cause: "Gas flow interruption", resolution: "Restored gas supply" },
  { id: "ALT002", severity: "warning", message: "Vibration level 4.2 mm/s", time: "2024-01-15 13:45", cause: "Bearing wear", resolution: "Scheduled maintenance" },
  { id: "ALT003", severity: "info", message: "Power fluctuation detected", time: "2024-01-15 12:20", cause: "Grid instability", resolution: "Monitored and resolved" },
  { id: "ALT004", severity: "warning", message: "Door sensor malfunction", time: "2024-01-15 11:15", cause: "Sensor failure", resolution: "Replaced sensor" },
];

export default function Furnaces() {
  const [selectedFurnace] = useState("F1");
  const [cameraView, setCameraView] = useState("overview");
  const [isPlaying, setIsPlaying] = useState(false);
  const [timelinePosition, setTimelinePosition] = useState(50);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy": return <Badge className="bg-green-100 text-green-800">Healthy</Badge>;
      case "warning": return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case "critical": return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-600";
      case "warning": return "text-yellow-600";
      case "info": return "text-blue-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
              <Flame className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Blast Furnace 1</h1>
              <div className="flex items-center gap-2 text-blue-100">
                <MapPin className="w-4 h-4" />
                <span>Zone A - Production Line 1</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <Badge className="bg-green-100 text-green-800 text-sm px-3 py-1 mb-2">LIVE</Badge>
            <div className="text-blue-100 text-sm">Last updated: 2 seconds ago</div>
          </div>
        </div>
      </div>

      {/* Real-time Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Temperature Gauge */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Thermometer className="w-5 h-5 text-red-600" />
              Temperature
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="8"
                    strokeDasharray={`${(1420 / 1600) * 251.2} 251.2`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xl font-bold">1420</div>
                    <div className="text-xs text-muted-foreground">°C</div>
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">Target: 1450°C</div>
            </div>
          </CardContent>
        </Card>

        {/* Current & Energy Chart */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="w-5 h-5 text-yellow-600" />
              Power Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={temperatureData}>
                <Line
                  type="monotone"
                  dataKey="current"
                  stroke="#eab308"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="text-center mt-2">
              <div className="text-lg font-bold">1,250 A</div>
              <div className="text-sm text-muted-foreground">Current</div>
            </div>
          </CardContent>
        </Card>

        {/* Emissions Chart */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="w-5 h-5 text-orange-600" />
              Emissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={emissionsData.slice(-3)}>
                <Bar dataKey="nox" fill="#ef4444" />
                <Bar dataKey="co" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
            <div className="text-center mt-2">
              <div className="text-lg font-bold">45 ppm</div>
              <div className="text-sm text-muted-foreground">NOx Level</div>
            </div>
          </CardContent>
        </Card>

        {/* Scrap Purity */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="w-5 h-5 text-green-600" />
              Scrap Purity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">94%</div>
              <Progress value={94} className="mb-2" />
              <div className="text-sm text-muted-foreground">Quality Score</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health Card */}
      <Card>
        <CardHeader>
          <CardTitle>System Health Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sensors.map((sensor, index) => (
              <div key={index} className="text-center p-3 border rounded-lg">
                <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                  sensor.status === "healthy" ? "bg-green-500" :
                  sensor.status === "warning" ? "bg-yellow-500" : "bg-red-500"
                }`} />
                <div className="text-sm font-medium">{sensor.name}</div>
                <div className="text-lg font-bold">{sensor.value}</div>
                <div className="text-xs text-muted-foreground">{sensor.location}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Split Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Enhanced Digital Twin */}
        <div className="lg:col-span-2">
          <Card className="h-[600px]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Digital Twin View
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Select value={cameraView} onValueChange={setCameraView}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="overview">Overview</SelectItem>
                      <SelectItem value="internal">Internal</SelectItem>
                      <SelectItem value="scrap">Scrap Loading</SelectItem>
                      <SelectItem value="cooling">Cooling Path</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-full">
              <div className="relative h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden">
                {/* Furnace 3D Model Simulation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Flame className={`w-24 h-24 mx-auto mb-4 text-orange-400 ${cameraView === 'internal' ? 'animate-pulse' : ''}`} />
                    <div className="text-2xl font-bold mb-2">Blast Furnace 1</div>
                    <div className="text-sm opacity-75">
                      {cameraView === 'overview' && 'Overview Camera'}
                      {cameraView === 'internal' && 'Internal Furnace View'}
                      {cameraView === 'scrap' && 'Scrap Loading Simulation'}
                      {cameraView === 'cooling' && 'Cooling System View'}
                    </div>
                  </div>
                </div>

                {/* Environment Simulation Effects */}
                {cameraView === 'internal' && (
                  <>
                    {/* Temperature glow effect */}
                    <div className="absolute inset-0 bg-gradient-radial from-orange-500/20 via-transparent to-transparent animate-pulse" />
                    {/* Smoke particles */}
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gray-400/30 rounded-full blur-xl animate-bounce" />
                  </>
                )}

                {cameraView === 'scrap' && (
                  <>
                    {/* Conveyor animation */}
                    <div className="absolute bottom-20 left-0 right-0 h-2 bg-gray-600">
                      <div className="absolute inset-y-0 left-0 w-8 bg-orange-500 animate-pulse" style={{ animation: 'moveRight 3s linear infinite' }} />
                    </div>
                    {/* Scrap pieces */}
                    <div className="absolute bottom-24 left-10 w-3 h-3 bg-gray-400 rounded animate-bounce" />
                    <div className="absolute bottom-24 left-20 w-2 h-2 bg-gray-500 rounded animate-bounce" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute bottom-24 left-30 w-4 h-4 bg-gray-300 rounded animate-bounce" style={{ animationDelay: '1s' }} />
                  </>
                )}

                {cameraView === 'cooling' && (
                  <>
                    {/* Cooling pipes */}
                    <div className="absolute top-1/4 left-1/4 w-32 h-2 bg-blue-400 rounded animate-pulse" />
                    <div className="absolute top-1/3 right-1/4 w-24 h-2 bg-blue-400 rounded animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute bottom-1/3 left-1/3 w-28 h-2 bg-blue-400 rounded animate-pulse" style={{ animationDelay: '1s' }} />
                  </>
                )}

                {/* Enhanced Overlay Hotspots */}
                <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-red-500 rounded-full animate-pulse">
                  <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs p-3 rounded-lg shadow-lg min-w-32">
                    <div className="font-medium mb-1">Temperature Sensor</div>
                    <div className="text-orange-400 font-bold">1420°C</div>
                    <div className="text-xs opacity-75">Target: 1450°C</div>
                  </div>
                </div>

                <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-yellow-500 rounded-full animate-pulse">
                  <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs p-3 rounded-lg shadow-lg min-w-32">
                    <div className="font-medium mb-1">Vibration Monitor</div>
                    <div className="text-yellow-400 font-bold">3.2 mm/s</div>
                    <div className="text-xs opacity-75">Threshold: 5.0 mm/s</div>
                  </div>
                </div>

                <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-blue-500 rounded-full animate-pulse">
                  <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs p-3 rounded-lg shadow-lg min-w-32">
                    <div className="font-medium mb-1">Gas Flow Sensor</div>
                    <div className="text-blue-400 font-bold">98%</div>
                    <div className="text-xs opacity-75">O2 Concentration</div>
                  </div>
                </div>

                <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-green-500 rounded-full animate-pulse">
                  <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs p-3 rounded-lg shadow-lg min-w-32">
                    <div className="font-medium mb-1">Pressure Monitor</div>
                    <div className="text-green-400 font-bold">2.4 bar</div>
                    <div className="text-xs opacity-75">System Pressure</div>
                  </div>
                </div>

                {/* Control Panel */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm">
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Rotate
                    </Button>
                    <Button variant="secondary" size="sm">
                      <Zap className="w-4 h-4 mr-1" />
                      Zoom
                    </Button>
                    <Button variant="secondary" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      Reset
                    </Button>
                  </div>

                  {/* Timeline Controls */}
                  <div className="flex items-center gap-2 bg-black/50 rounded-lg p-2">
                    <Button variant="ghost" size="sm" onClick={() => setTimelinePosition(Math.max(0, timelinePosition - 10))}>
                      <SkipBack className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setIsPlaying(!isPlaying)}>
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setTimelinePosition(Math.min(100, timelinePosition + 10))}>
                      <SkipForward className="w-4 h-4" />
                    </Button>
                    <div className="w-24 mx-2">
                      <Slider
                        value={[timelinePosition]}
                        onValueChange={(value) => setTimelinePosition(value[0])}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    <span className="text-xs text-white font-mono w-12">
                      {Math.floor(timelinePosition * 24 / 100)}:00
                    </span>
                  </div>
                </div>

                {/* HUD Overlay */}
                <div className="absolute top-4 left-4 bg-black/70 text-white text-xs p-2 rounded">
                  <div>Camera: {cameraView.charAt(0).toUpperCase() + cameraView.slice(1)}</div>
                  <div>Time: {new Date().toLocaleTimeString()}</div>
                  <div>Status: Live Feed</div>
                </div>

                {/* Performance Metrics HUD */}
                <div className="absolute top-4 right-4 bg-black/70 text-white text-xs p-2 rounded">
                  <div>FPS: 60</div>
                  <div>Latency: 45ms</div>
                  <div>Quality: High</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Analytics & Controls */}
        <div className="space-y-6">
          {/* Real-time Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Real-time Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <Thermometer className="w-6 h-6 mx-auto mb-2 text-red-600" />
                  <div className="text-lg font-bold">1420°C</div>
                  <div className="text-xs text-muted-foreground">Temperature</div>
                </div>
                <div className="text-center">
                  <Zap className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
                  <div className="text-lg font-bold">1250 A</div>
                  <div className="text-xs text-muted-foreground">Current</div>
                </div>
                <div className="text-center">
                  <Activity className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <div className="text-lg font-bold">94%</div>
                  <div className="text-xs text-muted-foreground">Purity</div>
                </div>
                <div className="text-center">
                  <BarChart3 className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <div className="text-lg font-bold">45 ppm</div>
                  <div className="text-xs text-muted-foreground">Emissions</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Control Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Furnace Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Power Level (%)</label>
                <Slider defaultValue={[85]} max={100} step={1} className="mt-2" />
                <div className="text-xs text-muted-foreground mt-1">Current: 85%</div>
              </div>

              <div>
                <label className="text-sm font-medium">Oxygen Flow (%)</label>
                <Slider defaultValue={[92]} max={100} step={1} className="mt-2" />
                <div className="text-xs text-muted-foreground mt-1">Current: 92%</div>
              </div>

              <div>
                <label className="text-sm font-medium">Input Rate (tons/h)</label>
                <Slider defaultValue={[45]} max={60} step={1} className="mt-2" />
                <div className="text-xs text-muted-foreground mt-1">Current: 45 tons/h</div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button className="flex-1">Apply Changes</Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive" className="flex-1">
                      <Power className="w-4 h-4 mr-2" />
                      Emergency Stop
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2 text-red-600">
                        <AlertTriangle className="w-5 h-5" />
                        Emergency Shutdown
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <h4 className="font-medium text-red-800 mb-2">Safety Checklist</h4>
                        <div className="space-y-2">
                          {[
                            "Confirm all personnel are clear of danger zone",
                            "Verify emergency evacuation routes are clear",
                            "Check that all access doors are secured",
                            "Ensure backup power systems are active",
                            "Confirm emergency communication systems working"
                          ].map((step, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <CheckSquare className="w-4 h-4 text-red-600" />
                              <span className="text-sm">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">Cancel</Button>
                        <Button variant="destructive" className="flex-1">
                          Confirm Emergency Shutdown
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Section - History & Timeline */}
      <Tabs defaultValue="maintenance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="maintenance">Maintenance Timeline</TabsTrigger>
          <TabsTrigger value="alerts">Alerts History</TabsTrigger>
          <TabsTrigger value="performance">Performance Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5" />
                Maintenance Timeline & Repair Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {maintenanceHistory.map((maintenance, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      {index < maintenanceHistory.length - 1 && <div className="w-0.5 h-16 bg-gray-200 mt-2"></div>}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{maintenance.date}</span>
                          <Badge variant="outline">{maintenance.type}</Badge>
                        </div>
                        <Badge variant="outline" className="text-green-600">{maintenance.status}</Badge>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-100">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Component:</span>
                            <div className="font-medium">{maintenance.component}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Technician:</span>
                            <div className="font-medium">{maintenance.technician}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Duration:</span>
                            <div className="font-medium">{maintenance.duration}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Status:</span>
                            <div className="font-medium text-green-600">{maintenance.status}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Alerts History & Cause Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertsHistory.map((alert) => (
                  <div key={alert.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className={`w-5 h-5 ${getSeverityColor(alert.severity)}`} />
                        <div>
                          <div className="font-medium">{alert.message}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            {alert.time}
                          </div>
                        </div>
                      </div>
                      <Badge className={getSeverityColor(alert.severity) + " border-current"}>
                        {alert.severity}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Cause:</span>
                        <div className="font-medium mt-1">{alert.cause}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Resolution:</span>
                        <div className="font-medium mt-1 text-green-600">{alert.resolution}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={[
                    { time: "00:00", efficiency: 91, production: 1850 },
                    { time: "06:00", efficiency: 93, production: 1920 },
                    { time: "12:00", efficiency: 89, production: 1780 },
                    { time: "16:00", efficiency: 95, production: 2010 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="efficiency"
                      stackId="1"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.6}
                      name="Efficiency (%)"
                    />
                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="production"
                      stackId="2"
                      stroke="#22c55e"
                      fill="#22c55e"
                      fillOpacity={0.6}
                      name="Production (tons)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {[
                    { time: "14:32:15", level: "INFO", message: "Furnace temperature stabilized at 1420°C" },
                    { time: "14:28:42", level: "WARN", message: "Vibration level increased to 3.2 mm/s" },
                    { time: "14:25:18", level: "INFO", message: "Scrap batch S-2024-001 processing started" },
                    { time: "14:20:33", level: "INFO", message: "Energy optimization mode activated" },
                    { time: "14:15:27", level: "INFO", message: "Operator login: John Smith" },
                    { time: "14:10:12", level: "INFO", message: "Maintenance check completed successfully" },
                    { time: "14:05:48", level: "WARN", message: "Gas pressure fluctuation detected" },
                    { time: "14:00:15", level: "INFO", message: "Daily production target achieved" }
                  ].map((log, index) => (
                    <div key={index} className="flex gap-3 text-sm">
                      <span className="text-muted-foreground font-mono w-12">{log.time}</span>
                      <Badge variant={
                        log.level === "ERROR" ? "destructive" :
                        log.level === "WARN" ? "secondary" : "outline"
                      } className="w-12 justify-center">
                        {log.level}
                      </Badge>
                      <span className="flex-1">{log.message}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
