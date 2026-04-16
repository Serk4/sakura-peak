// src/components/PredictionCard.tsx
import { useQuery } from '@tanstack/react-query'
import { getWeatherForLocation } from '../lib/openMeteo'
import { predictBloom } from '../lib/prediction'
import { Calendar, ThermometerSun, MapPin } from 'lucide-react'

interface PredictionCardProps {
	lat: number
	lon: number
	locationName: string
}

export default function PredictionCard({
	lat,
	lon,
	locationName,
}: PredictionCardProps) {
	const {
		data: temps,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['weather', lat, lon],
		queryFn: () => getWeatherForLocation(lat, lon),
		refetchInterval: 1000 * 60 * 60, // refresh hourly
	})

	const prediction = temps ? predictBloom(temps) : null

	if (isLoading) {
		return (
			<div className='bg-white rounded-2xl shadow p-8 text-center'>
				<div className='animate-spin w-8 h-8 border-4 border-pink-300 border-t-pink-600 rounded-full mx-auto'></div>
				<p className='mt-4 text-gray-600'>Fetching latest weather data...</p>
			</div>
		)
	}

	if (error || !prediction) {
		return (
			<div className='bg-white rounded-2xl shadow p-6 text-red-600'>
				Failed to load prediction. Please check your internet connection.
			</div>
		)
	}

	return (
		<div className='bg-white rounded-2xl shadow p-6 space-y-6'>
			<div className='flex items-center gap-3'>
				<MapPin className='text-pink-600' size={24} />
				<div>
					<h2 className='font-semibold text-xl'>{locationName}</h2>
					<p className='text-sm text-gray-500'>Peak Bloom Prediction</p>
				</div>
			</div>

			<div className='bg-pink-50 border border-pink-100 rounded-xl p-5 text-center'>
				<div className='text-5xl mb-2'>🌸</div>
				<p className='text-2xl font-bold text-pink-700'>
					{prediction.peakBloom
						? prediction.peakBloom.toLocaleDateString('en-US', {
								month: 'long',
								day: 'numeric',
							})
						: '—'}
				</p>
				<p className='text-pink-600 mt-1 font-medium'>
					{prediction.daysToPeak !== null
						? `in about ${prediction.daysToPeak} days`
						: 'Later in season'}
				</p>
			</div>

			<div className='space-y-4 text-sm'>
				<div className='flex items-start gap-3'>
					<ThermometerSun className='text-amber-500 mt-0.5' size={20} />
					<div>
						<p className='font-medium'>Temperature-based forecast</p>
						<p className='text-gray-600'>{prediction.message}</p>
					</div>
				</div>

				<div className='flex items-start gap-3'>
					<Calendar className='text-pink-600 mt-0.5' size={20} />
					<div>
						<p className='font-medium'>Confidence</p>
						<p
							className={`font-medium capitalize ${prediction.confidence === 'high' ? 'text-green-600' : 'text-amber-600'}`}
						>
							{prediction.confidence}
						</p>
					</div>
				</div>
			</div>

			<p className='text-xs text-gray-500 pt-4 border-t'>
				Prediction uses Growing Degree Days from last 30 days + 14-day forecast
			</p>
		</div>
	)
}
