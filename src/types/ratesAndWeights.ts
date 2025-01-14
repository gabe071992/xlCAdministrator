export type MetricCategory = 'User Activity' | 'Transactions' | 'Revenue' | 'Network' | 'Market';

export interface Metric {
  id: string;
  name: string;
  description: string;
  category: MetricCategory;
  minValue: number;
  maxValue: number;
  currentValue?: number;
}

export interface Weight {
  metricId: string;
  value: number; // Percentage (0-100)
}

export interface RatesAndWeightsState {
  metrics: Record<string, Metric>;
  weights: Record<string, Weight>;
  baselineRate: number;
}