import { ref, get, set, update } from 'firebase/database';
import { db } from './firebase';
import { Metric, Weight, RatesAndWeightsState } from '../types/ratesAndWeights';

const BASE_PATH = 'ratesAndWeights';

// Normalize a value between a min and max range to 0-1
export function normalizeValue(value: number, min: number, max: number): number {
  if (min === max) return 0;
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}

// Calculate the daily rate based on metrics and weights
export function calculateDailyRate(
  metrics: Record<string, Metric>,
  weights: Record<string, Weight>,
  baselineRate: number
): number {
  let weightedSum = 0;
  
  Object.entries(weights).forEach(([metricId, weight]) => {
    const metric = metrics[metricId];
    if (metric?.currentValue !== undefined) {
      const normalizedValue = normalizeValue(
        metric.currentValue,
        metric.minValue,
        metric.maxValue
      );
      weightedSum += normalizedValue * (weight.value / 100);
    }
  });

  return baselineRate + weightedSum;
}

// Validate that weights sum to 100%
export function validateWeights(weights: Record<string, Weight>): boolean {
  const sum = Object.values(weights).reduce((acc, weight) => acc + weight.value, 0);
  return Math.abs(sum - 100) < 0.01; // Allow for small floating point differences
}

// Firebase Operations
export async function fetchRatesAndWeights(): Promise<RatesAndWeightsState> {
  const snapshot = await get(ref(db, BASE_PATH));
  if (!snapshot.exists()) {
    return {
      metrics: {},
      weights: {},
      baselineRate: 0
    };
  }
  return snapshot.val();
}

export async function saveMetric(metric: Metric): Promise<void> {
  await set(ref(db, `${BASE_PATH}/metrics/${metric.id}`), metric);
}

export async function saveWeight(weight: Weight): Promise<void> {
  await set(ref(db, `${BASE_PATH}/weights/${weight.metricId}`), weight);
}

export async function updateBaselineRate(rate: number): Promise<void> {
  await set(ref(db, `${BASE_PATH}/baselineRate`), rate);
}

export async function deleteMetric(metricId: string): Promise<void> {
  const updates: Record<string, null> = {
    [`${BASE_PATH}/metrics/${metricId}`]: null,
    [`${BASE_PATH}/weights/${metricId}`]: null
  };
  await update(ref(db), updates);
}