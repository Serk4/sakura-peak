// src/lib/prediction.ts
export interface BloomPrediction {
  firstBloom: Date | null;
  peakBloom: Date | null;
  daysToPeak: number | null;
  confidence: 'high' | 'medium' | 'low';
  message: string;
}

// Simple Growing Degree Day model for cherry blossoms (calibrated roughly from JMA data)
export function predictBloom(
  dailyMeanTemps: number[],        // past 30 days + forecast
  startDate: Date = new Date()
): BloomPrediction {
  const baseTemp = 5;        // °C
  const gddThreshold = 580;  // rough accumulated GDD for peak bloom (Somei-Yoshino)

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
    ? new Date(startDate.getTime() + daysToPeak * 86400000)
    : null;

  return {
    firstBloom: null, // TODO: can extend later
    peakBloom: peakDate,
    daysToPeak: daysToPeak,
    confidence: daysToPeak !== null && daysToPeak < 20 ? 'high' : 'medium',
    message: peakDate 
      ? `Peak bloom expected around ${peakDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`
      : "Not enough warm days yet — prediction later in season"
  };
}