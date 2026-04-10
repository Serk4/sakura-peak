// src/lib/openMeteo.ts
const OPEN_METEO_URL = 'https://api.open-meteo.com/v1/forecast';

export async function getWeatherForLocation(lat: number, lon: number) {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    daily: 'temperature_2m_mean',
    past_days: '30',
    forecast_days: '14',
    timezone: 'auto'
  });

  const response = await fetch(`${OPEN_METEO_URL}?${params}`);
  if (!response.ok) throw new Error('Failed to fetch weather');
  
  const data = await response.json();
  return data.daily.temperature_2m_mean as number[];
}