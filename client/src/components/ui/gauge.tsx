import React from 'react';

interface GaugeProps {
  title: string;
  value: number;
  min?: number;
  max: number;
  unit: string;
  status?: 'normal' | 'warning' | 'critical';
  type?: 'speedometer' | 'radial';
  size?: number;
}

export function IndustrialGauge({
  title,
  value,
  min = 0,
  max,
  unit,
  status = 'normal',
  type = 'speedometer',
  size = 200
}: GaugeProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return '#ef4444';
      case 'warning': return '#f59e0b';
      default: return '#10b981';
    }
  };

  const getStatusSegments = (status: string) => {
    switch (status) {
      case 'critical':
        return [
          { from: min, to: max * 0.6, color: '#10b981' },
          { from: max * 0.6, to: max * 0.8, color: '#f59e0b' },
          { from: max * 0.8, to: max, color: '#ef4444' }
        ];
      case 'warning':
        return [
          { from: min, to: max * 0.7, color: '#10b981' },
          { from: max * 0.7, to: max, color: '#f59e0b' }
        ];
      default:
        return [
          { from: min, to: max * 0.8, color: '#10b981' },
          { from: max * 0.8, to: max, color: '#f59e0b' }
        ];
    }
  };

  if (type === 'radial') {
    return (
      <div className="flex flex-col items-center space-y-2 p-4 bg-gray-800 rounded-lg">
        <div className="text-sm font-medium text-white">{title}</div>
        <div className={`text-3xl font-bold ${status === 'critical' ? 'text-red-400' : status === 'warning' ? 'text-yellow-400' : 'text-green-400'}`}>
          {value.toFixed(1)} {unit}
        </div>
        <div className="w-32 h-32 rounded-full border-4 border-gray-600 flex items-center justify-center bg-gray-700">
          <div className="text-center">
            <div className="text-xs text-gray-300">Radial</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-2 p-4 bg-gray-800 rounded-lg">
      <div className="text-sm font-medium text-white">{title}</div>
      <div className={`text-3xl font-bold ${status === 'critical' ? 'text-red-400' : status === 'warning' ? 'text-yellow-400' : 'text-green-400'}`}>
        {value.toFixed(1)} {unit}
      </div>
      <div className="w-32 h-32 rounded-full border-4 border-gray-600 flex items-center justify-center bg-gray-700">
        <div className="text-center">
          <div className="text-xs text-gray-300">Speedometer</div>
        </div>
      </div>
    </div>
  );
}

export function TemperatureGauge({ value, status }: { value: number; status?: 'normal' | 'warning' | 'critical' }) {
  return (
    <IndustrialGauge
      title="Temperature"
      value={value}
      max={2000}
      unit="°C"
      status={status}
      type="speedometer"
    />
  );
}

export function VibrationGauge({ value, status }: { value: number; status?: 'normal' | 'warning' | 'critical' }) {
  return (
    <IndustrialGauge
      title="Vibration"
      value={value}
      max={10}
      unit="Hz"
      status={status}
      type="radial"
    />
  );
}

export function EmissionGauge({ value, status }: { value: number; status?: 'normal' | 'warning' | 'critical' }) {
  return (
    <IndustrialGauge
      title="Emissions"
      value={value}
      max={150}
      unit="ppm"
      status={status}
      type="speedometer"
    />
  );
}

export function ScrapPurityGauge({ value, status }: { value: number; status?: 'normal' | 'warning' | 'critical' }) {
  return (
    <IndustrialGauge
      title="Scrap Purity"
      value={value}
      max={100}
      unit="%"
      status={status}
      type="radial"
    />
  );
}

export function BatteryGauge({ value, status }: { value: number; status?: 'normal' | 'warning' | 'critical' }) {
  return (
    <IndustrialGauge
      title="Battery Level"
      value={value}
      max={100}
      unit="%"
      status={status}
      type="speedometer"
    />
  );
}

export function AirQualityGauge({ value, status }: { value: number; status?: 'normal' | 'warning' | 'critical' }) {
  return (
    <IndustrialGauge
      title="Air Quality"
      value={value}
      max={500}
      unit="AQI"
      status={status}
      type="radial"
    />
  );
}