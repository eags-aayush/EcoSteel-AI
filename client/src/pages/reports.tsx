import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Download, FileText, TrendingUp, Zap, Recycle, AlertTriangle, Calendar } from "lucide-react";

const efficiencyData = [
  { month: "Jan", efficiency: 89 },
  { month: "Feb", efficiency: 92 },
  { month: "Mar", efficiency: 88 },
  { month: "Apr", efficiency: 94 },
  { month: "May", efficiency: 91 },
  { month: "Jun", efficiency: 96 },
];

const emissionsData = [
  { month: "Jan", nox: 45, co: 120 },
  { month: "Feb", nox: 42, co: 115 },
  { month: "Mar", nox: 48, co: 125 },
  { month: "Apr", nox: 38, co: 110 },
  { month: "May", nox: 41, co: 118 },
  { month: "Jun", nox: 35, co: 105 },
];

const scrapQualityData = [
  { name: "High Quality", value: 65, color: "#22c55e" },
  { name: "Medium Quality", value: 25, color: "#eab308" },
  { name: "Low Quality", value: 10, color: "#ef4444" },
];

const maintenanceData = [
  { month: "Jan", events: 12 },
  { month: "Feb", events: 8 },
  { month: "Mar", events: 15 },
  { month: "Apr", events: 6 },
  { month: "May", events: 9 },
  { month: "Jun", events: 4 },
];

const energySavingsData = [
  { month: "Jan", savings: 12500 },
  { month: "Feb", savings: 15200 },
  { month: "Mar", savings: 13800 },
  { month: "Apr", savings: 18900 },
  { month: "May", savings: 16700 },
  { month: "Jun", savings: 21300 },
];

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  const reportCards = [
    {
      title: "Efficiency Report",
      icon: TrendingUp,
      value: "92.4%",
      change: "+3.2%",
      trend: "up",
      description: "Average furnace efficiency"
    },
    {
      title: "Emissions Report",
      icon: Zap,
      value: "IN LIMITS",
      change: "-8.5%",
      trend: "down",
      description: "vs regulatory thresholds"
    },
    {
      title: "Scrap Quality",
      icon: Recycle,
      value: "87.3%",
      change: "+2.1%",
      trend: "up",
      description: "Average purity score"
    },
    {
      title: "Maintenance Events",
      icon: AlertTriangle,
      value: "9",
      change: "-45%",
      trend: "down",
      description: "This month"
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive performance reports and analytics</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={card.trend === "up" ? "text-green-600" : "text-red-600"}>
                  {card.change}
                </span>{" "}
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Tabs */}
      <Tabs defaultValue="monthly" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily">Daily Reports</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Reports</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Production Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Production Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Total Production</span>
                    <span className="font-bold">2,450 tons</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average Efficiency</span>
                    <span className="font-bold text-green-600">92.4%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Energy Consumption</span>
                    <span className="font-bold">4,680 kWh</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Scrap Utilization</span>
                    <span className="font-bold">87.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daily Quality Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Quality Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Average Purity</span>
                    <span className="font-bold">89.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Defect Rate</span>
                    <span className="font-bold text-red-600">2.1%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Grade A Output</span>
                    <span className="font-bold text-green-600">94.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Customer Returns</span>
                    <span className="font-bold">0.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Furnace Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Furnace Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={[
                    { furnace: "F1", efficiency: 94 },
                    { furnace: "F2", efficiency: 89 },
                    { furnace: "F3", efficiency: 87 },
                    { furnace: "F4", efficiency: 92 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="furnace" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="efficiency" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Environmental Impact */}
            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>CO2 Emissions</span>
                    <span className="font-bold">45 tons</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Energy Saved</span>
                    <span className="font-bold text-green-600">$1,240</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Water Usage</span>
                    <span className="font-bold">2,300 m³</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Waste Recycled</span>
                    <span className="font-bold text-green-600">89.7%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Efficiency Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={[
                    { day: "Mon", efficiency: 91 },
                    { day: "Tue", efficiency: 93 },
                    { day: "Wed", efficiency: 89 },
                    { day: "Thu", efficiency: 95 },
                    { day: "Fri", efficiency: 92 },
                    { day: "Sat", efficiency: 88 },
                    { day: "Sun", efficiency: 90 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="efficiency" stroke="#3b82f6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Weekly Production */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Production Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { day: "Mon", production: 18500 },
                    { day: "Tue", production: 19200 },
                    { day: "Wed", production: 17800 },
                    { day: "Thu", production: 20100 },
                    { day: "Fri", production: 19600 },
                    { day: "Sat", production: 15200 },
                    { day: "Sun", production: 16800 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="production" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Scheduled</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Unscheduled</span>
                    <span className="font-medium text-red-600">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Downtime</span>
                    <span className="font-medium">2.3 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Control</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Inspections</span>
                    <span className="font-medium">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Passed</span>
                    <span className="font-medium text-green-600">45</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Failed</span>
                    <span className="font-medium text-red-600">2</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Operating Cost</span>
                    <span className="font-medium">$45,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost per Ton</span>
                    <span className="font-medium">$18.45</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Savings</span>
                    <span className="font-medium text-green-600">$2,340</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Efficiency Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Furnace Efficiency Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={efficiencyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[85, 100]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="efficiency"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Emissions Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Emissions Reduction</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={emissionsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="nox" fill="#ef4444" name="NOx (ppm)" />
                    <Bar dataKey="co" fill="#f97316" name="CO (ppm)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Scrap Quality Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Scrap Quality Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={scrapQualityData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {scrapQualityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Maintenance Events */}
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Events</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={maintenanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="events" fill="#eab308" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Energy Savings */}
          <Card>
            <CardHeader>
              <CardTitle>Energy Savings & Cost Reduction</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={energySavingsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Savings"]} />
                  <Line
                    type="monotone"
                    dataKey="savings"
                    stroke="#22c55e"
                    strokeWidth={3}
                    dot={{ fill: '#22c55e', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  $108,400
                </div>
                <p className="text-sm text-muted-foreground">
                  Total energy savings this year
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quarterly">
          <Card>
            <CardContent className="flex items-center justify-center h-64">
              <div className="text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Quarterly Reports</h3>
                <p className="text-muted-foreground">Detailed quarterly analysis coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="annual">
          <Card>
            <CardContent className="flex items-center justify-center h-64">
              <div className="text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Annual Reports</h3>
                <p className="text-muted-foreground">Comprehensive annual analysis coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}