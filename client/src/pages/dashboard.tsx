import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Flame, Eye, Bell, VolumeX, Thermometer, Zap, Activity, AlertTriangle, User, Settings, LogOut, Clock, Pause, Play, Volume2, VolumeX as MuteIcon, Droplets, Wind, Battery, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { TemperatureGauge, VibrationGauge, EmissionGauge, ScrapPurityGauge, BatteryGauge, AirQualityGauge } from "@/components/ui/gauge";
import { useWebSocket } from "@/hooks/use-websocket";
import { useEffect, useState } from "react";

const furnaces = [
  {
    id: "F1",
    name: "Blast Furnace 1",
    status: "live",
    temperature: 1420,
    emissions: 85,
    purity: 94,
    current: 1250,
    vibration: 2.1,
    doorStatus: "closed"
  },
  {
    id: "F2",
    name: "Blast Furnace 2",
    status: "idle",
    temperature: 1200,
    emissions: 45,
    purity: 89,
    current: 980,
    vibration: 1.8,
    doorStatus: "closed"
  },
  {
    id: "F3",
    name: "Blast Furnace 3",
    status: "alert",
    temperature: 1580,
    emissions: 120,
    purity: 76,
    current: 1450,
    vibration: 4.2,
    doorStatus: "open"
  },
  {
    id: "F4",
    name: "Blast Furnace 4",
    status: "live",
    temperature: 1380,
    emissions: 78,
    purity: 91,
    current: 1180,
    vibration: 2.3,
    doorStatus: "closed"
  }
];

export default function Dashboard() {
  const { data: wsData, isConnected } = useWebSocket();

  // Real-time sensor data from WebSocket
  const [sensorData, setSensorData] = useState({
    temperature: 1420,
    emissions: 45,
    vibration: 3.2,
    purity: 94,
    energy: 1250,
    battery: 85,
    airQuality: 25,
    scrapLevel: 75
  });

  // Update sensor data from WebSocket
  useEffect(() => {
    if (wsData?.sensors) {
      const sensors = wsData.sensors;
      const newSensorData = {
        temperature: sensors.find((s: any) => s.type === 'temperature')?.value || 1420,
        emissions: sensors.find((s: any) => s.type === 'emissions')?.value || 45,
        vibration: sensors.find((s: any) => s.type === 'vibration')?.value || 3.2,
        purity: sensors.find((s: any) => s.type === 'purity')?.value || 94,
        energy: sensors.find((s: any) => s.type === 'energy')?.value || 1250,
        battery: sensors.find((s: any) => s.type === 'battery')?.value || 85,
        airQuality: sensors.find((s: any) => s.type === 'airQuality')?.value || 25,
        scrapLevel: sensors.find((s: any) => s.type === 'scrapLevel')?.value || 75
      };

      console.log('Dashboard received WebSocket data:', {
        sensorCount: sensors.length,
        gaugeData: {
          temperature: newSensorData.temperature,
          battery: newSensorData.battery,
          airQuality: newSensorData.airQuality,
          scrapLevel: newSensorData.scrapLevel
        },
        timestamp: wsData.timestamp
      });

      setSensorData(newSensorData);
    }
  }, [wsData]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "live":
        return <Badge className="bg-green-100 text-green-800 border-green-200">LIVE</Badge>;
      case "idle":
        return <Badge variant="secondary">IDLE</Badge>;
      case "alert":
        return <Badge className="bg-red-100 text-red-800 border-red-200">ALERT</Badge>;
      default:
        return <Badge variant="outline">UNKNOWN</Badge>;
    }
  };

  const getMetricColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value <= thresholds.good) return "text-green-600";
    if (value <= thresholds.warning) return "text-yellow-600";
    return "text-red-600";
  };

  const getSensorStatus = (value: number, type: string) => {
    switch (type) {
      case 'temperature':
        return value > 1600 ? 'critical' : value > 1500 ? 'warning' : 'normal';
      case 'vibration':
        return value > 4 ? 'critical' : value > 3 ? 'warning' : 'normal';
      case 'emissions':
        return value > 60 ? 'critical' : value > 40 ? 'warning' : 'normal';
      case 'battery':
        return value < 20 ? 'critical' : value < 40 ? 'warning' : 'normal';
      default:
        return 'normal';
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-screen-2xl mx-auto">
        {/* Top Bar */}
        <header className="flex items-center justify-between p-4 border-b border-border bg-background">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Steel Plant Alpha</h2>
              <p className="text-xs text-muted-foreground font-mono">Real-time Monitoring</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Global Alert Indicator */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              </div>
              <span className="text-sm text-muted-foreground">3 Active Alerts</span>
            </div>

            {/* Time Range Filter */}
            <Select defaultValue="24h">
              <SelectTrigger className="w-32">
                <Clock className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last Hour</SelectItem>
                <SelectItem value="6h">Last 6 Hours</SelectItem>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
              </SelectContent>
            </Select>

            {/* User Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>OP</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Operator</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      operator@steelplant.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Multi-Furnace Dashboard</h1>
            <p className="text-muted-foreground">Monitor all furnaces in real-time</p>
            <div className="flex items-center gap-2 mt-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              <span className="text-sm text-muted-foreground">
                {isConnected ? 'Live Data Connected' : 'Connecting...'}
              </span>
            </div>
          </div>

          {/* Industrial Gauge Panel */}
          <Card className="mb-6 bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-400" />
                Real-Time Sensor Gauges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                <div className="flex justify-center">
                  <TemperatureGauge
                    value={sensorData.temperature}
                    status={getSensorStatus(sensorData.temperature, 'temperature')}
                  />
                </div>
                <div className="flex justify-center">
                  <VibrationGauge
                    value={sensorData.vibration}
                    status={getSensorStatus(sensorData.vibration, 'vibration')}
                  />
                </div>
                <div className="flex justify-center">
                  <EmissionGauge
                    value={sensorData.emissions}
                    status={getSensorStatus(sensorData.emissions, 'emissions')}
                  />
                </div>
                <div className="flex justify-center">
                  <ScrapPurityGauge
                    value={sensorData.purity}
                    status="normal"
                  />
                </div>
                <div className="flex justify-center">
                  <BatteryGauge
                    value={sensorData.battery}
                    status={getSensorStatus(sensorData.battery, 'battery')}
                  />
                </div>
                <div className="flex justify-center">
                  <AirQualityGauge
                    value={sensorData.airQuality}
                    status="normal"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dashboard Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="safety">Safety</TabsTrigger>
              <TabsTrigger value="emissions">Emissions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Furnace Grid with Enhanced Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {wsData?.furnaces?.map((furnace: any) => (
                  <Popover key={furnace.id}>
                    <PopoverTrigger asChild>
                      <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{furnace.name}</CardTitle>
                            {getStatusBadge(furnace.status)}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              furnace.status === "active" ? "bg-green-500 animate-pulse" :
                              furnace.status === "idle" ? "bg-gray-400" :
                              "bg-red-500 animate-pulse"
                            }`} />
                            <span className="text-sm text-muted-foreground capitalize">{furnace.status}</span>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          {/* Mini Charts */}
                          <div className="h-16">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={[
                                { time: "00:00", value: furnace.temperature - 50 },
                                { time: "06:00", value: furnace.temperature - 20 },
                                { time: "12:00", value: furnace.temperature },
                                { time: "18:00", value: furnace.temperature - 30 }
                              ]}>
                                <Area
                                  type="monotone"
                                  dataKey="value"
                                  stroke="#3b82f6"
                                  fill="#3b82f6"
                                  fillOpacity={0.2}
                                  strokeWidth={2}
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>

                          {/* Key Metrics */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                              <Thermometer className={`w-5 h-5 mx-auto mb-1 ${getMetricColor(furnace.temperature, { good: 1400, warning: 1500 })}`} />
                              <div className={`text-lg font-bold ${getMetricColor(furnace.temperature, { good: 1400, warning: 1500 })}`}>
                                {furnace.temperature.toFixed(1)}°C
                              </div>
                              <div className="text-xs text-muted-foreground">Temperature</div>
                            </div>

                            <div className="text-center">
                              <Zap className={`w-5 h-5 mx-auto mb-1 ${getMetricColor(furnace.energyConsumption, { good: 1200, warning: 1400 })}`} />
                              <div className={`text-lg font-bold ${getMetricColor(furnace.energyConsumption, { good: 1200, warning: 1400 })}`}>
                                {furnace.energyConsumption.toFixed(0)}
                              </div>
                              <div className="text-xs text-muted-foreground">Energy (kW)</div>
                            </div>
                          </div>

                          {/* Real-time Indicators */}
                          <div className="flex justify-between items-center text-xs">
                            <div className="flex items-center gap-1">
                              <Wind className="w-3 h-3 text-blue-500" />
                              <span>Pressure: {furnace.pressure.toFixed(1)} bar</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Droplets className="w-3 h-3 text-blue-500" />
                              <span>Rate: {furnace.productionRate.toFixed(0)} t/h</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Battery className="w-3 h-3 text-green-500" />
                              <span>{sensorData.battery}%</span>
                            </div>
                          </div>

                          {/* Quick Actions */}
                          <div className="flex gap-1 pt-2 border-t">
                            <Button variant="outline" size="sm" className="flex-1 text-xs">
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm" className="text-xs">
                              <MuteIcon className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-xs">
                              <Pause className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-xs">
                              <Play className="w-3 h-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-4">
                        <h4 className="font-medium">{furnace.name} - Quick Stats</h4>

                        {/* Temperature History */}
                        <div>
                          <h5 className="text-sm font-medium mb-2">Temperature History (24h)</h5>
                          <ResponsiveContainer width="100%" height={60}>
                            <LineChart data={[
                              { time: "00:00", temp: 1410 },
                              { time: "06:00", temp: 1435 },
                              { time: "12:00", temp: 1420 },
                              { time: "18:00", temp: 1445 }
                            ]}>
                              <Line type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={2} dot={false} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Vibration History */}
                        <div>
                          <h5 className="text-sm font-medium mb-2">Vibration History (24h)</h5>
                          <ResponsiveContainer width="100%" height={60}>
                            <LineChart data={[
                              { time: "00:00", vib: 2.1 },
                              { time: "06:00", vib: 2.3 },
                              { time: "12:00", vib: 2.8 },
                              { time: "18:00", vib: furnace.vibration }
                            ]}>
                              <Line type="monotone" dataKey="vib" stroke="#f59e0b" strokeWidth={2} dot={false} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Recent Scrap Batches */}
                        <div>
                          <h5 className="text-sm font-medium mb-2">Recent Scrap Batches</h5>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Batch S-2024-001</span>
                              <span className="text-green-600">94% purity</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span>Batch S-2024-002</span>
                              <span className="text-yellow-600">87% purity</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Efficiency Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={[
                        { time: "00:00", f1: 92, f2: 89, f3: 94, f4: 91 },
                        { time: "06:00", f1: 94, f2: 91, f3: 96, f4: 93 },
                        { time: "12:00", f1: 91, f2: 88, f3: 93, f4: 90 },
                        { time: "16:00", f1: 95, f2: 92, f3: 97, f4: 94 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="f1" stroke="#3b82f6" name="Furnace 1" />
                        <Line type="monotone" dataKey="f2" stroke="#ef4444" name="Furnace 2" />
                        <Line type="monotone" dataKey="f3" stroke="#22c55e" name="Furnace 3" />
                        <Line type="monotone" dataKey="f4" stroke="#f59e0b" name="Furnace 4" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Production Rates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {furnaces.map((furnace, index) => (
                        <div key={furnace.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${
                              index === 0 ? 'bg-blue-500' :
                              index === 1 ? 'bg-red-500' :
                              index === 2 ? 'bg-green-500' : 'bg-yellow-500'
                            }`} />
                            <span className="text-sm font-medium">{furnace.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold">{Math.floor(Math.random() * 50) + 40} tons/h</div>
                            <div className="text-xs text-muted-foreground">{furnace.purity}% purity</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="safety" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      Critical Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                          <span className="text-sm font-medium">F3 Overheating</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">1580°C - Exceeds threshold</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wind className="w-5 h-5 text-blue-600" />
                      Gas Monitoring
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {furnaces.map((furnace) => (
                        <div key={furnace.id} className="flex justify-between items-center">
                          <span className="text-sm">{furnace.name}</span>
                          <Badge variant="outline" className="text-green-600">OK</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Droplets className="w-5 h-5 text-blue-600" />
                      Environmental
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Humidity</span>
                        <span className="font-medium">65%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Air Quality</span>
                        <span className="font-medium text-green-600">Good</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Temperature</span>
                        <span className="font-medium">24.5°C</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="emissions" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Real-time Emissions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={[
                        { time: "00:00", f1: 85, f2: 45, f3: 120, f4: 78 },
                        { time: "06:00", f1: 82, f2: 48, f3: 115, f4: 81 },
                        { time: "12:00", f1: 88, f2: 42, f3: 125, f4: 75 },
                        { time: "16:00", f1: 91, f2: 46, f3: 118, f4: 79 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="f1" stroke="#3b82f6" name="Furnace 1" />
                        <Line type="monotone" dataKey="f2" stroke="#ef4444" name="Furnace 2" />
                        <Line type="monotone" dataKey="f3" stroke="#22c55e" name="Furnace 3" />
                        <Line type="monotone" dataKey="f4" stroke="#f59e0b" name="Furnace 4" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {furnaces.map((furnace, index) => (
                        <div key={furnace.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${
                              furnace.emissions < 100 ? 'bg-green-500' : 'bg-red-500'
                            }`} />
                            <span className="font-medium">{furnace.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{furnace.emissions} ppm</div>
                            <div className={`text-xs ${furnace.emissions < 100 ? 'text-green-600' : 'text-red-600'}`}>
                              {furnace.emissions < 100 ? 'Within Limits' : 'Exceeds Limit'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Production Trends Chart */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Production Trends (Last 24 Hours)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={[
                  { time: "00:00", production: 1850, efficiency: 91 },
                  { time: "04:00", production: 1920, efficiency: 93 },
                  { time: "08:00", production: 2100, efficiency: 95 },
                  { time: "12:00", production: 2250, efficiency: 94 },
                  { time: "16:00", production: 2180, efficiency: 92 },
                  { time: "20:00", production: 2050, efficiency: 90 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="production"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name="Production (tons)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="efficiency"
                    stroke="#22c55e"
                    strokeWidth={2}
                    name="Efficiency (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* System Overview */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Active Furnaces</span>
                    <span className="font-medium">3/4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total Production</span>
                    <span className="font-medium">2,450 tons</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Avg Efficiency</span>
                    <span className="font-medium text-green-600">92.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Uptime</span>
                    <span className="font-medium text-green-600">99.7%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Active Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-red-50 rounded">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <div>
                      <div className="text-sm font-medium">F3 Overheating</div>
                      <div className="text-xs text-muted-foreground">2 min ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-yellow-50 rounded">
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    <div>
                      <div className="text-sm font-medium">F2 Low Purity</div>
                      <div className="text-xs text-muted-foreground">15 min ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-blue-50 rounded">
                    <AlertTriangle className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="text-sm font-medium">Maintenance Due</div>
                      <div className="text-xs text-muted-foreground">F1 - 2 days</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  Energy Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Power</span>
                    <span className="font-medium">4,680 kW</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Energy Saved</span>
                    <span className="font-medium text-green-600">$1,240</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">CO2 Reduced</span>
                    <span className="font-medium text-green-600">45 tons</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Cost per Ton</span>
                    <span className="font-medium">$18.45</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-red-600" />
                  Environmental
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Air Quality</span>
                    <span className="font-medium text-green-600">Good</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Emissions</span>
                    <span className="font-medium text-green-600">In Limits</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Temperature</span>
                    <span className="font-medium">24.5°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Humidity</span>
                    <span className="font-medium">65%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: "14:32", event: "Furnace F1 production started", type: "production", status: "success" },
                  { time: "14:28", event: "Scrap batch S-2024-001 processed", type: "quality", status: "success" },
                  { time: "14:25", event: "Maintenance alert: Bearing vibration high", type: "alert", status: "warning" },
                  { time: "14:20", event: "Energy optimization activated", type: "system", status: "info" },
                  { time: "14:15", event: "Operator login: John Smith", type: "security", status: "info" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === "success" ? "bg-green-500" :
                      activity.status === "warning" ? "bg-yellow-500" :
                      "bg-blue-500"
                    }`} />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{activity.event}</div>
                      <div className="text-xs text-muted-foreground">{activity.time}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
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
