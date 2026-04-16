export interface BloomPrediction {
  peakBloom: Date | null;
  daysToPeak: number | null;
  confidence: 'high' | 'medium' | 'low';
  message: string;
}

export function predictBloom(dailyMeanTemps: number[]): BloomPrediction {
  const baseTemp = 5;
  const gddThreshold = 580;
  let accumulatedGDD = 0;
  let daysToPeak = null;

  for (let i = 0; i < dailyMeanTemps.length; i++) {
    const gdd = Math.max(0, dailyMeanTemps[i] - baseTemp);
    accumulatedGDD += gdd;
    if (accumulatedGDD >= gddThreshold && daysToPeak === null) {
      daysToPeak = i;
      break;
    }
  }

  const peakDate = daysToPeak !== null 
    ? new Date(Date.now() + daysToPeak * 86400000)
    : null;

  return {
    peakBloom: peakDate,
    daysToPeak,
    confidence: daysToPeak !== null && daysToPeak < 20 ? 'high' : 'medium',
    message: peakDate 
      ? `Peak around ${peakDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`
      : "Prediction available closer to season"
  };
}

// NEW: Progress for the date slider (0 → 1)
export function calculateBloomProgress(
  prediction: BloomPrediction,
  simulatedDate: Date
): number {
  if (!prediction.peakBloom) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sim = new Date(simulatedDate);
  sim.setHours(0, 0, 0, 0);
  const peak = new Date(prediction.peakBloom);
  peak.setHours(0, 0, 0, 0);

  if (sim >= peak) return 1;

  const totalMs = peak.getTime() - today.getTime();
  const passedMs = sim.getTime() - today.getTime();
  return Math.max(0, Math.min(1, passedMs / totalMs));
}