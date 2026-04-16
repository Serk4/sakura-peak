import {
	QueryClient,
	QueryClientProvider,
	useQueries,
} from '@tanstack/react-query'
import { useState } from 'react'
import BloomMap from './components/BloomMap'
import PredictionCard from './components/PredictionCard'
import { getWeatherForLocation } from './lib/openMeteo'
import { predictBloom } from './lib/prediction'

const queryClient = new QueryClient()

function AppContent() {
	const [mode, setMode] = useState<'japan' | 'dc'>('japan')
	const [daysAhead, setDaysAhead] = useState(0)

	const locations =
		mode === 'japan'
			? [
					{ name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
					{ name: 'Kyoto', lat: 35.0116, lon: 135.7681 },
					{ name: 'Osaka', lat: 34.6937, lon: 135.5023 },
					{ name: 'Sapporo', lat: 43.0618, lon: 141.3545 },
				]
			: [{ name: 'Washington DC', lat: 38.9072, lon: -77.0369 }]

	const predictionResults = useQueries({
		queries: locations.map((loc) => ({
			queryKey: ['weather', loc.lat, loc.lon],
			queryFn: async () => {
				const temps = await getWeatherForLocation(loc.lat, loc.lon)
				return { ...loc, prediction: predictBloom(temps) }
			},
		})),
	})

	const predictions = predictionResults
		.map((result) => result.data)
		.filter((d): d is NonNullable<typeof d> => d != null)

	const simulatedDate = new Date()
	simulatedDate.setDate(simulatedDate.getDate() + daysAhead)

	const selectedLocation = locations[0] // For PredictionCard

	return (
		<div className='min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50'>
			{/* Header */}
			<header className='bg-white/90 backdrop-blur-md border-b border-pink-100 sticky top-0 z-50'>
				<div className='max-w-7xl mx-auto px-6 py-5 flex items-center justify-between'>
					<div className='flex items-center gap-4'>
						<span className='text-4xl'>🌸</span>
						<div>
							<h1 className='text-3xl font-bold text-pink-700 tracking-tight'>
								SakuraPeak
							</h1>
							<p className='text-sm text-pink-600 -mt-0.5'>
								Plan your perfect hanami
							</p>
						</div>
					</div>
				</div>
			</header>

			<div className='max-w-7xl mx-auto px-6 py-8'>
				<div className='grid lg:grid-cols-12 gap-8'>
					{/* Left Panel */}
					<div className='lg:col-span-4 space-y-6'>
						{/* Mode Toggle */}
						<div className='bg-white rounded-3xl shadow p-2 flex'>
							<button
								onClick={() => setMode('japan')}
								className={`flex-1 py-3 rounded-2xl font-medium transition-all ${
									mode === 'japan'
										? 'bg-pink-600 text-white shadow'
										: 'hover:bg-gray-100'
								}`}
							>
								🇯🇵 Japan
							</button>
							<button
								onClick={() => setMode('dc')}
								className={`flex-1 py-3 rounded-2xl font-medium transition-all ${
									mode === 'dc'
										? 'bg-pink-600 text-white shadow'
										: 'hover:bg-gray-100'
								}`}
							>
								🇺🇸 Washington DC
							</button>
						</div>

						{/* Date Slider */}
						<div className='bg-white rounded-3xl shadow p-6'>
							<div className='flex justify-between text-sm mb-3 font-medium'>
								<span>Today</span>
								<span className='text-pink-600'>
									{simulatedDate.toLocaleDateString('en-US', {
										month: 'short',
										day: 'numeric',
									})}
								</span>
							</div>
							<input
								type='range'
								min='0'
								max='30'
								value={daysAhead}
								onChange={(e) => setDaysAhead(Number(e.target.value))}
								className='w-full accent-pink-600 cursor-pointer'
								aria-label='Days ahead to preview bloom progress'
							/>
							<p className='text-xs text-gray-500 mt-3 text-center'>
								Slide to preview bloom progress
							</p>
						</div>

						{/* Prediction Card */}
						<PredictionCard
							lat={selectedLocation.lat}
							lon={selectedLocation.lon}
							locationName={selectedLocation.name}
						/>
					</div>

					{/* Map */}
					<div className='lg:col-span-8'>
						<div className='bg-white rounded-3xl shadow overflow-hidden h-[660px]'>
							<BloomMap
								locations={locations}
								predictions={predictions}
								simulatedDate={simulatedDate}
								mode={mode}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AppContent />
		</QueryClientProvider>
	)
}

export default App
