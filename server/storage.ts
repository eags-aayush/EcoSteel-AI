import { randomUUID } from "crypto";
import type { Furnace, Sensor, Alert, ProductionMetrics, Prediction, CameraFeed, KPI, Hotspot } from "@shared/schema";

export interface IStorage {
  // Furnaces
  getFurnaces(): Promise<Furnace[]>;
  getFurnace(id: string): Promise<Furnace | undefined>;
  updateFurnaceData(id: string, data: Partial<Furnace>): Promise<Furnace>;

  // Sensors
  getSensors(): Promise<Sensor[]>;
  getSensor(id: string): Promise<Sensor | undefined>;
  updateSensorValue(id: string, value: number): Promise<Sensor>;

  // Alerts
  getAlerts(): Promise<Alert[]>;
  createAlert(alert: Omit<Alert, "id">): Promise<Alert>;
  acknowledgeAlert(id: string): Promise<Alert>;

  // Production Metrics
  getProductionMetrics(timeRange: string): Promise<ProductionMetrics[]>;
  addProductionMetric(metric: ProductionMetrics): Promise<void>;

  // AI Predictions
  getPredictions(): Promise<Prediction[]>;
  createPrediction(prediction: Omit<Prediction, "id">): Promise<Prediction>;

  // Camera Feeds
  getCameraFeeds(): Promise<CameraFeed[]>;
  updateCameraDetections(id: string, detections: CameraFeed["detections"]): Promise<CameraFeed>;

  // KPIs
  getKPIs(): Promise<KPI[]>;
  updateKPI(label: string, value: number, change: number): Promise<void>;

  // Digital Twin Hotspots
  getHotspots(): Promise<Hotspot[]>;
}

export class MemStorage implements IStorage {
  private furnaces: Map<string, Furnace>;
  private sensors: Map<string, Sensor>;
  private alerts: Map<string, Alert>;
  private productionMetrics: ProductionMetrics[];
  private predictions: Map<string, Prediction>;
  private cameraFeeds: Map<string, CameraFeed>;
  private kpis: KPI[];
  private hotspots: Hotspot[];

  constructor() {
    this.furnaces = new Map();
    this.sensors = new Map();
    this.alerts = new Map();
    this.productionMetrics = [];
    this.predictions = new Map();
    this.cameraFeeds = new Map();
    this.kpis = [];
    this.hotspots = [];
    this.initializeData();
  }

  private initializeData() {
    // Initialize furnaces
    const initialFurnaces: Furnace[] = [
      {
        id: "F1",
        name: "Blast Furnace 1",
        status: "active",
        temperature: 1650,
        targetTemperature: 1700,
        pressure: 2.8,
        targetPressure: 3.0,
        productionRate: 485,
        energyConsumption: 1240,
        composition: { carbon: 4.2, silicon: 0.8, manganese: 0.5, iron: 94.5 },
        lastUpdated: new Date().toISOString(),
      },
      {
        id: "F2",
        name: "Blast Furnace 2",
        status: "active",
        temperature: 1720,
        targetTemperature: 1700,
        pressure: 3.1,
        targetPressure: 3.0,
        productionRate: 502,
        energyConsumption: 1280,
        composition: { carbon: 4.0, silicon: 0.7, manganese: 0.6, iron: 94.7 },
        lastUpdated: new Date().toISOString(),
      },
      {
        id: "F3",
        name: "Blast Furnace 3",
        status: "active",
        temperature: 1680,
        targetTemperature: 1700,
        pressure: 2.9,
        targetPressure: 3.0,
        productionRate: 495,
        energyConsumption: 1260,
        composition: { carbon: 4.1, silicon: 0.9, manganese: 0.4, iron: 94.6 },
        lastUpdated: new Date().toISOString(),
      },
      {
        id: "F4",
        name: "Electric Arc Furnace 1",
        status: "idle",
        temperature: 850,
        targetTemperature: 1600,
        pressure: 1.0,
        targetPressure: 1.0,
        productionRate: 0,
        energyConsumption: 120,
        composition: { carbon: 0.2, silicon: 0.1, manganese: 0.1, iron: 99.6 },
        lastUpdated: new Date().toISOString(),
      },
      {
        id: "F5",
        name: "Electric Arc Furnace 2",
        status: "maintenance",
        temperature: 320,
        targetTemperature: 0,
        pressure: 0.8,
        targetPressure: 1.0,
        productionRate: 0,
        energyConsumption: 15,
        composition: { carbon: 0.0, silicon: 0.0, manganese: 0.0, iron: 100.0 },
        lastUpdated: new Date().toISOString(),
      },
      {
        id: "F6",
        name: "Ladle Furnace 1",
        status: "active",
        temperature: 1580,
        targetTemperature: 1600,
        pressure: 1.2,
        targetPressure: 1.0,
        productionRate: 180,
        energyConsumption: 420,
        composition: { carbon: 0.3, silicon: 0.2, manganese: 0.8, iron: 98.7 },
        lastUpdated: new Date().toISOString(),
      },
    ];
    initialFurnaces.forEach((f) => this.furnaces.set(f.id, f));

    // Initialize sensors (18 sensors across different zones)
    const initialSensors: Sensor[] = [
      { id: "T001", name: "BF1 Top Temp", type: "temperature", value: 1650, unit: "°C", status: "healthy", zone: "Zone A", trend: "stable", lastUpdated: new Date().toISOString() },
      { id: "T002", name: "BF2 Top Temp", type: "temperature", value: 1720, unit: "°C", status: "warning", zone: "Zone A", trend: "up", lastUpdated: new Date().toISOString() },
      { id: "T003", name: "Cooling Water", type: "temperature", value: 45, unit: "°C", status: "healthy", zone: "Zone B", trend: "down", lastUpdated: new Date().toISOString() },
      { id: "P001", name: "BF1 Pressure", type: "pressure", value: 2.8, unit: "bar", status: "healthy", zone: "Zone A", trend: "stable", lastUpdated: new Date().toISOString() },
      { id: "P002", name: "BF2 Pressure", type: "pressure", value: 3.1, unit: "bar", status: "warning", zone: "Zone A", trend: "up", lastUpdated: new Date().toISOString() },
      { id: "P003", name: "Gas Line 1", type: "pressure", value: 1.5, unit: "bar", status: "healthy", zone: "Zone C", trend: "stable", lastUpdated: new Date().toISOString() },
      { id: "V001", name: "Motor 1 Vib", type: "vibration", value: 2.3, unit: "mm/s", status: "healthy", zone: "Zone D", trend: "stable", lastUpdated: new Date().toISOString() },
      { id: "V002", name: "Motor 2 Vib", type: "vibration", value: 4.8, unit: "mm/s", status: "critical", zone: "Zone D", trend: "up", lastUpdated: new Date().toISOString() },
      { id: "V003", name: "Pump A Vib", type: "vibration", value: 1.9, unit: "mm/s", status: "healthy", zone: "Zone B", trend: "down", lastUpdated: new Date().toISOString() },
      { id: "C001", name: "Carbon %", type: "chemical", value: 4.2, unit: "%", status: "healthy", zone: "Zone A", trend: "stable", lastUpdated: new Date().toISOString() },
      { id: "C002", name: "Silicon %", type: "chemical", value: 0.8, unit: "%", status: "healthy", zone: "Zone A", trend: "stable", lastUpdated: new Date().toISOString() },
      { id: "C003", name: "pH Sensor", type: "chemical", value: 7.2, unit: "pH", status: "healthy", zone: "Zone B", trend: "stable", lastUpdated: new Date().toISOString() },
      { id: "F001", name: "Water Flow", type: "flow", value: 485, unit: "m³/h", status: "healthy", zone: "Zone B", trend: "stable", lastUpdated: new Date().toISOString() },
      { id: "F002", name: "Gas Flow", type: "flow", value: 12500, unit: "Nm³/h", status: "healthy", zone: "Zone C", trend: "up", lastUpdated: new Date().toISOString() },
      { id: "L001", name: "Tank Level 1", type: "level", value: 78, unit: "%", status: "healthy", zone: "Zone B", trend: "down", lastUpdated: new Date().toISOString() },
      { id: "L002", name: "Tank Level 2", type: "level", value: 92, unit: "%", status: "warning", zone: "Zone B", trend: "up", lastUpdated: new Date().toISOString() },
      { id: "T004", name: "EAF Temp", type: "temperature", value: 850, unit: "°C", status: "offline", zone: "Zone E", trend: "stable", lastUpdated: new Date().toISOString() },
      { id: "P004", name: "EAF Pressure", type: "pressure", value: 0, unit: "bar", status: "offline", zone: "Zone E", trend: "stable", lastUpdated: new Date().toISOString() },
    ];
    initialSensors.forEach((s) => this.sensors.set(s.id, s));

    // Initialize KPIs
    this.kpis = [
      { label: "Production Rate", value: 2847, unit: "tons/day", change: 5.2, trend: "up", status: "good" },
      { label: "Energy Efficiency", value: 87.3, unit: "%", change: 2.1, trend: "up", status: "good" },
      { label: "Quality Score", value: 94.6, unit: "%", change: -0.8, trend: "down", status: "warning" },
      { label: "Equipment Health", value: 91.2, unit: "%", change: 0.0, trend: "stable", status: "good" },
    ];

    // Initialize camera feeds
    const initialCameras: CameraFeed[] = [
      {
        id: "CAM001",
        name: "Production Line A",
        location: "Zone A - North",
        status: "online",
        detections: [
          { id: "D1", type: "Surface Defect", confidence: 0.92, boundingBox: { x: 120, y: 80, width: 60, height: 40 } },
          { id: "D2", type: "Crack", confidence: 0.87, boundingBox: { x: 240, y: 150, width: 45, height: 35 } },
        ],
        defectCount: 2,
        lastUpdate: new Date().toISOString(),
      },
      {
        id: "CAM002",
        name: "Production Line B",
        location: "Zone A - South",
        status: "online",
        detections: [],
        defectCount: 0,
        lastUpdate: new Date().toISOString(),
      },
      {
        id: "CAM003",
        name: "Quality Check Station",
        location: "Zone B - Center",
        status: "online",
        detections: [
          { id: "D3", type: "Dimensional Issue", confidence: 0.78, boundingBox: { x: 160, y: 100, width: 70, height: 50 } },
        ],
        defectCount: 1,
        lastUpdate: new Date().toISOString(),
      },
      {
        id: "CAM004",
        name: "Cooling Area",
        location: "Zone B - East",
        status: "online",
        detections: [],
        defectCount: 0,
        lastUpdate: new Date().toISOString(),
      },
      {
        id: "CAM005",
        name: "Storage Zone",
        location: "Zone C - West",
        status: "offline",
        detections: [],
        defectCount: 0,
        lastUpdate: new Date().toISOString(),
      },
      {
        id: "CAM006",
        name: "Loading Bay",
        location: "Zone D - North",
        status: "online",
        detections: [],
        defectCount: 0,
        lastUpdate: new Date().toISOString(),
      },
    ];
    initialCameras.forEach((c) => this.cameraFeeds.set(c.id, c));

    // Initialize hotspots for Digital Twin
    this.hotspots = [
      {
        id: "HS1",
        name: "Blast Furnace 1",
        position: { x: -2, y: 0, z: 0 },
        sensors: [
          { name: "Temperature", value: 1650, unit: "°C", status: "normal" },
          { name: "Pressure", value: 2.8, unit: "bar", status: "normal" },
          { name: "Flow Rate", value: 485, unit: "m³/h", status: "normal" },
        ],
        status: "normal",
      },
      {
        id: "HS2",
        name: "Cooling Tower",
        position: { x: 2, y: 0, z: 0 },
        sensors: [
          { name: "Temperature", value: 45, unit: "°C", status: "warning" },
          { name: "Water Level", value: 78, unit: "%", status: "normal" },
          { name: "Pump Status", value: 1, unit: "active", status: "normal" },
        ],
        status: "warning",
      },
      {
        id: "HS3",
        name: "Sensor Array A",
        position: { x: 0, y: 1.5, z: -2 },
        sensors: [
          { name: "Vibration", value: 2.3, unit: "mm/s", status: "normal" },
          { name: "Humidity", value: 45, unit: "%", status: "normal" },
        ],
        status: "normal",
      },
    ];

    // Initialize some AI predictions
    const initialPredictions: Prediction[] = [
      {
        id: randomUUID(),
        type: "maintenance",
        title: "Motor 2 Bearing Failure Predicted",
        description: "Vibration analysis indicates bearing degradation. Recommend maintenance within 48 hours.",
        confidence: 0.89,
        impact: "high",
        recommendation: "Schedule bearing replacement for Motor 2 during next maintenance window",
        timestamp: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        type: "energy",
        title: "Energy Optimization Opportunity",
        description: "Current furnace temperatures can be reduced by 2% without affecting output quality.",
        confidence: 0.76,
        impact: "medium",
        recommendation: "Adjust BF2 target temperature to 1666°C to save approximately 120 kWh",
        timestamp: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        type: "quality",
        title: "Quality Score Decline Detected",
        description: "Carbon content variance increasing over past 6 hours. May affect product consistency.",
        confidence: 0.82,
        impact: "medium",
        recommendation: "Review and stabilize carbon feed rate in BF1 and BF3",
        timestamp: new Date().toISOString(),
      },
    ];
    initialPredictions.forEach((p) => this.predictions.set(p.id, p));
  }

  async getFurnaces(): Promise<Furnace[]> {
    return Array.from(this.furnaces.values());
  }

  async getFurnace(id: string): Promise<Furnace | undefined> {
    return this.furnaces.get(id);
  }

  async updateFurnaceData(id: string, data: Partial<Furnace>): Promise<Furnace> {
    const furnace = this.furnaces.get(id);
    if (!furnace) throw new Error(`Furnace ${id} not found`);
    const updated = { ...furnace, ...data, lastUpdated: new Date().toISOString() };
    this.furnaces.set(id, updated);
    return updated;
  }

  async getSensors(): Promise<Sensor[]> {
    return Array.from(this.sensors.values());
  }

  async getSensor(id: string): Promise<Sensor | undefined> {
    return this.sensors.get(id);
  }

  async updateSensorValue(id: string, value: number): Promise<Sensor> {
    const sensor = this.sensors.get(id);
    if (!sensor) throw new Error(`Sensor ${id} not found`);
    const updated = { ...sensor, value, lastUpdated: new Date().toISOString() };
    this.sensors.set(id, updated);
    return updated;
  }

  async getAlerts(): Promise<Alert[]> {
    return Array.from(this.alerts.values());
  }

  async createAlert(alert: Omit<Alert, "id">): Promise<Alert> {
    const newAlert: Alert = { ...alert, id: randomUUID() };
    this.alerts.set(newAlert.id, newAlert);
    return newAlert;
  }

  async acknowledgeAlert(id: string): Promise<Alert> {
    const alert = this.alerts.get(id);
    if (!alert) throw new Error(`Alert ${id} not found`);
    const updated = { ...alert, acknowledged: true };
    this.alerts.set(id, updated);
    return updated;
  }

  async getProductionMetrics(timeRange: string): Promise<ProductionMetrics[]> {
    return this.productionMetrics.slice(-24);
  }

  async addProductionMetric(metric: ProductionMetrics): Promise<void> {
    this.productionMetrics.push(metric);
    if (this.productionMetrics.length > 1000) {
      this.productionMetrics = this.productionMetrics.slice(-500);
    }
  }

  async getPredictions(): Promise<Prediction[]> {
    return Array.from(this.predictions.values());
  }

  async createPrediction(prediction: Omit<Prediction, "id">): Promise<Prediction> {
    const newPrediction: Prediction = { ...prediction, id: randomUUID() };
    this.predictions.set(newPrediction.id, newPrediction);
    return newPrediction;
  }

  async getCameraFeeds(): Promise<CameraFeed[]> {
    return Array.from(this.cameraFeeds.values());
  }

  async updateCameraDetections(id: string, detections: CameraFeed["detections"]): Promise<CameraFeed> {
    const camera = this.cameraFeeds.get(id);
    if (!camera) throw new Error(`Camera ${id} not found`);
    const updated = {
      ...camera,
      detections,
      defectCount: detections.length,
      lastUpdate: new Date().toISOString(),
    };
    this.cameraFeeds.set(id, updated);
    return updated;
  }

  async getKPIs(): Promise<KPI[]> {
    return this.kpis;
  }

  async updateKPI(label: string, value: number, change: number): Promise<void> {
    const kpi = this.kpis.find((k) => k.label === label);
    if (kpi) {
      kpi.value = value;
      kpi.change = change;
    }
  }

  async getHotspots(): Promise<Hotspot[]> {
    return this.hotspots;
  }
}

export const storage = new MemStorage();
