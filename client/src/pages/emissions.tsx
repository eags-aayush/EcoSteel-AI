import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Zap, AlertTriangle, CheckCircle, TrendingUp, TrendingDown } from "lucide-react";

const emissionsData = [
  { time: "00:00", nox: 45, co: 120, pm: 15 },
  { time: "04:00", nox: 52, co: 135, pm: 18 },
  { time: "08:00", nox: 48, co: 128, pm: 16 },
  { time: "12:00", nox: 65, co: 145, pm: 22 },
  { time: "16:00", nox: 58, co: 138, pm: 19 },
  { time: "20:00", nox: 42, co: 115, pm: 12 },
];

const gasThresholds = {
  nox: { good: 40, moderate: 60, poor: 80 },
  co: { good: 100, moderate: 150, poor: 200 },
  pm: { good: 10, moderate: 20, poor: 30 },
};

export default function Emissions() {
  const currentAQI = 142;
  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return { status: "Good", color: "text-green-600", bg: "bg-green-100" };
    if (aqi <= 100) return { status: "Moderate", color: "text-yellow-600", bg: "bg-yellow-100" };
    if (aqi <= 150) return { status: "Unhealthy", color: "text-orange-600", bg: "bg-orange-100" };
    return { status: "Hazardous", color: "text-red-600", bg: "bg-red-100" };
  };

  const aqiStatus = getAQIStatus(currentAQI);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Emissions Monitor</h1>
          <p className="text-muted-foreground">Real-time air quality and emission tracking</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className={`${aqiStatus.bg} ${aqiStatus.color} border-current`}>
            {aqiStatus.status} Air Quality
          </Badge>
          <Badge variant="outline" className="text-green-600 bg-green-100">
            <CheckCircle className="w-4 h-4 mr-1" />
            In Limits
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* AQI Gauge */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Air Quality Index</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={currentAQI > 150 ? "#ef4444" : currentAQI > 100 ? "#f97316" : currentAQI > 50 ? "#eab308" : "#22c55e"}
                    strokeWidth="8"
                    strokeDasharray={`${(currentAQI / 200) * 251.2} 251.2`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{currentAQI}</div>
                    <div className="text-sm text-muted-foreground">AQI</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2 text-xs">
              <div className="text-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
                Good<br/>(0-50)
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-1"></div>
                Moderate<br/>(51-100)
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full mx-auto mb-1"></div>
                Unhealthy<br/>(101-150)
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-1"></div>
                Hazardous<br/>(151+)
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gas Levels */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Current Gas Levels</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "NOx", value: 58, unit: "ppm", threshold: gasThresholds.nox },
              { name: "CO", value: 138, unit: "ppm", threshold: gasThresholds.co },
              { name: "PM2.5", value: 19, unit: "µg/m³", threshold: gasThresholds.pm },
            ].map((gas) => {
              const percentage = (gas.value / gas.threshold.poor) * 100;
              const isGood = gas.value <= gas.threshold.good;
              const isModerate = gas.value <= gas.threshold.moderate;

              return (
                <div key={gas.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{gas.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">{gas.value}</span>
                      <span className="text-sm text-muted-foreground">{gas.unit}</span>
                      {isGood ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-orange-600" />
                      )}
                    </div>
                  </div>
                  <Progress
                    value={Math.min(percentage, 100)}
                    className={`h-2 ${percentage > 80 ? '[&>div]:bg-red-500' : percentage > 60 ? '[&>div]:bg-orange-500' : '[&>div]:bg-green-500'}`}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span>
                    <span className="text-green-600">Good: {gas.threshold.good}</span>
                    <span className="text-orange-600">Mod: {gas.threshold.moderate}</span>
                    <span className="text-red-600">Poor: {gas.threshold.poor}</span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Emissions Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Emission Trends (24h)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={emissionsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="nox"
                stroke="#ef4444"
                strokeWidth={2}
                name="NOx (ppm)"
              />
              <Line
                type="monotone"
                dataKey="co"
                stroke="#f97316"
                strokeWidth={2}
                name="CO (ppm)"
              />
              <Line
                type="monotone"
                dataKey="pm"
                stroke="#eab308"
                strokeWidth={2}
                name="PM2.5 (µg/m³)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Compliance Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Compliance Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">IN LIMITS</div>
              <p className="text-sm text-muted-foreground">
                All emissions within regulatory thresholds
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Emission Reduction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">-12%</div>
              <p className="text-sm text-muted-foreground">
                vs last month average
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-600" />
              Peak Detection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">2</div>
              <p className="text-sm text-muted-foreground">
                Spike events today
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}