import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Download, Filter, Calendar, TrendingUp, BarChart3 } from "lucide-react";

const purityData = [
  { date: "2024-01-01", purity: 89 },
  { date: "2024-01-02", purity: 92 },
  { date: "2024-01-03", purity: 87 },
  { date: "2024-01-04", purity: 94 },
  { date: "2024-01-05", purity: 91 },
  { date: "2024-01-06", purity: 88 },
  { date: "2024-01-07", purity: 95 },
];

const heatmapData = [
  { furnace: "F1", time: "00:00", purity: 85 },
  { furnace: "F1", time: "06:00", purity: 88 },
  { furnace: "F1", time: "12:00", purity: 92 },
  { furnace: "F1", time: "18:00", purity: 89 },
  { furnace: "F2", time: "00:00", purity: 82 },
  { furnace: "F2", time: "06:00", purity: 85 },
  { furnace: "F2", time: "12:00", purity: 87 },
  { furnace: "F2", time: "18:00", purity: 84 },
  { furnace: "F3", time: "00:00", purity: 90 },
  { furnace: "F3", time: "06:00", purity: 93 },
  { furnace: "F3", time: "12:00", purity: 91 },
  { furnace: "F3", time: "18:00", purity: 88 },
];

const impurityData = [
  { name: "Rust", percentage: 35, color: "#ef4444" },
  { name: "Plastic", percentage: 25, color: "#f97316" },
  { name: "Dust", percentage: 20, color: "#eab308" },
  { name: "Oil", percentage: 15, color: "#22c55e" },
  { name: "Other", percentage: 5, color: "#8b5cf6" },
];

const batchHistory = [
  {
    id: "BATCH-2024-001",
    date: "2024-01-15 14:30",
    furnace: "Furnace 1",
    purity: 94,
    weight: "2.5 tons",
    status: "accepted",
    contaminants: ["rust", "dust"]
  },
  {
    id: "BATCH-2024-002",
    date: "2024-01-15 13:45",
    furnace: "Furnace 2",
    purity: 67,
    weight: "1.8 tons",
    status: "rejected",
    contaminants: ["plastic", "oil", "rust"]
  },
  {
    id: "BATCH-2024-003",
    date: "2024-01-15 12:20",
    furnace: "Furnace 1",
    purity: 89,
    weight: "3.2 tons",
    status: "accepted",
    contaminants: ["dust"]
  },
  {
    id: "BATCH-2024-004",
    date: "2024-01-15 11:15",
    furnace: "Furnace 3",
    purity: 72,
    weight: "2.1 tons",
    status: "rejected",
    contaminants: ["plastic", "rust", "oil"]
  },
];

export default function History() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Scrap Quality History</h1>
          <p className="text-muted-foreground">Historical analysis of scrap quality and processing data</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Purity Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Purity Trend (7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={purityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[80, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="purity"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Impurity Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Impurity Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {impurityData.map((impurity) => (
                <div key={impurity.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: impurity.color }}
                    />
                    <span className="font-medium">{impurity.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${impurity.percentage}%`,
                          backgroundColor: impurity.color
                        }}
                      />
                    </div>
                    <span className="text-sm font-mono w-12">{impurity.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Furnace vs Time Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>Purity by Furnace & Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-2 font-medium">Furnace</th>
                  <th className="text-center p-2 font-medium">00:00</th>
                  <th className="text-center p-2 font-medium">06:00</th>
                  <th className="text-center p-2 font-medium">12:00</th>
                  <th className="text-center p-2 font-medium">18:00</th>
                </tr>
              </thead>
              <tbody>
                {["F1", "F2", "F3"].map((furnace) => (
                  <tr key={furnace}>
                    <td className="p-2 font-medium">{furnace}</td>
                    {["00:00", "06:00", "12:00", "18:00"].map((time) => {
                      const data = heatmapData.find(d => d.furnace === furnace && d.time === time);
                      const purity = data?.purity || 0;
                      const intensity = Math.min((purity - 80) / 20 * 100, 100);

                      return (
                        <td key={time} className="p-2 text-center">
                          <div
                            className="w-12 h-8 rounded flex items-center justify-center text-xs font-mono text-white"
                            style={{
                              backgroundColor: `hsl(${120 - intensity * 1.2}, 70%, ${50 + intensity * 0.3}%)`
                            }}
                          >
                            {purity}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="text-sm text-muted-foreground">Low</span>
            <div className="flex gap-1">
              {[0, 25, 50, 75, 100].map((intensity) => (
                <div
                  key={intensity}
                  className="w-4 h-4 rounded"
                  style={{
                    backgroundColor: `hsl(${120 - intensity * 1.2}, 70%, ${50 + intensity * 0.3}%)`
                  }}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">High</span>
          </div>
        </CardContent>
      </Card>

      {/* Batch History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Batch Processing History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch ID</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Furnace</TableHead>
                <TableHead>Purity</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Contaminants</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {batchHistory.map((batch) => (
                <TableRow key={batch.id}>
                  <TableCell className="font-mono font-medium">{batch.id}</TableCell>
                  <TableCell>{batch.date}</TableCell>
                  <TableCell>{batch.furnace}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-mono">{batch.purity}%</span>
                      <div className="w-16 bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${batch.purity}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{batch.weight}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {batch.contaminants.map((contaminant) => (
                        <Badge key={contaminant} variant="outline" className="text-xs">
                          {contaminant}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={batch.status === "accepted" ? "default" : "destructive"}>
                      {batch.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}