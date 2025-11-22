import { z } from "zod";

// Furnace data models
export const furnaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(["active", "idle", "maintenance", "offline"]),
  temperature: z.number(),
  targetTemperature: z.number(),
  pressure: z.number(),
  targetPressure: z.number(),
  productionRate: z.number(),
  energyConsumption: z.number(),
  composition: z.object({
    carbon: z.number(),
    silicon: z.number(),
    manganese: z.number(),
    iron: z.number(),
  }),
  lastUpdated: z.string(),
});

export type Furnace = z.infer<typeof furnaceSchema>;

// Sensor data models
export const sensorSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["temperature", "pressure", "vibration", "chemical", "flow", "level"]),
  value: z.number(),
  unit: z.string(),
  status: z.enum(["healthy", "warning", "critical", "offline"]),
  zone: z.string(),
  lastUpdated: z.string(),
  trend: z.enum(["up", "down", "stable"]),
});

export type Sensor = z.infer<typeof sensorSchema>;

// Alert data models
export const alertSchema = z.object({
  id: z.string(),
  severity: z.enum(["critical", "warning", "info"]),
  title: z.string(),
  message: z.string(),
  source: z.string(),
  timestamp: z.string(),
  acknowledged: z.boolean(),
  furnaceId: z.string().optional(),
  sensorId: z.string().optional(),
});

export type Alert = z.infer<typeof alertSchema>;

// Production analytics models
export const productionMetricsSchema = z.object({
  timestamp: z.string(),
  throughput: z.number(),
  defectRate: z.number(),
  energyConsumption: z.number(),
  oee: z.number(),
  quality: z.number(),
});

export type ProductionMetrics = z.infer<typeof productionMetricsSchema>;

// AI prediction models
export const predictionSchema = z.object({
  id: z.string(),
  type: z.enum(["maintenance", "energy", "quality", "production"]),
  title: z.string(),
  description: z.string(),
  confidence: z.number(),
  impact: z.enum(["high", "medium", "low"]),
  recommendation: z.string(),
  timestamp: z.string(),
});

export type Prediction = z.infer<typeof predictionSchema>;

// Camera detection models
export const cameraFeedSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  status: z.enum(["online", "offline"]),
  detections: z.array(z.object({
    id: z.string(),
    type: z.string(),
    confidence: z.number(),
    boundingBox: z.object({
      x: z.number(),
      y: z.number(),
      width: z.number(),
      height: z.number(),
    }),
  })),
  defectCount: z.number(),
  lastUpdate: z.string(),
});

export type CameraFeed = z.infer<typeof cameraFeedSchema>;

// Dashboard KPI models
export const kpiSchema = z.object({
  label: z.string(),
  value: z.number(),
  unit: z.string(),
  change: z.number(),
  trend: z.enum(["up", "down", "stable"]),
  status: z.enum(["good", "warning", "critical"]),
});

export type KPI = z.infer<typeof kpiSchema>;

// Digital twin hotspot models
export const hotspotSchema = z.object({
  id: z.string(),
  name: z.string(),
  position: z.object({
    x: z.number(),
    y: z.number(),
    z: z.number(),
  }),
  sensors: z.array(z.object({
    name: z.string(),
    value: z.number(),
    unit: z.string(),
    status: z.string(),
  })),
  status: z.enum(["normal", "warning", "critical"]),
});

export type Hotspot = z.infer<typeof hotspotSchema>;
