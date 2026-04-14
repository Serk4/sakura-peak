// src/App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import BloomMap from './components/BloomMap'
import PredictionCard from './components/PredictionCard'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			refetchOnWindowFocus: false,
		},
	},
})

const regionGroups = {
	Japan: [
		{ name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
		{ name: 'Kyoto', lat: 35.0116, lon: 135.7681 },
		{ name: 'Osaka', lat: 34.6937, lon: 135.5023 },
		{ name: 'Sapporo', lat: 43.0618, lon: 141.3545 },
	],
	'Washington DC': [{ name: 'Washington DC', lat: 38.9072, lon: -77.0369 }],
}

type Region = keyof typeof regionGroups

function App() {
	const [region, setRegion] = useState<Region>('Japan')
	const [selectedLocation, setSelectedLocation] = useState(
		regionGroups.Japan[0],
	)

	const locations = regionGroups[region]

	function handleRegionChange(r: Region) {
		setRegion(r)
		setSelectedLocation(regionGroups[r][0])
	}

	return (
		<QueryClientProvider client={queryClient}>
			<div className='min-h-screen bg-gradient-to-br from-pink-50 to-white'>
				<header className='bg-white shadow-sm border-b border-pink-100'>
					<div className='max-w-6xl mx-auto px-6 py-6'>
						<h1 className='text-4xl font-bold text-pink-600 flex items-center gap-3'>
							🌸 SakuraPeak
						</h1>
						<p className='text-gray-600 mt-1'>
							Cherry Blossom Peak Bloom Predictor • Japan & Washington DC
						</p>
					</div>
				</header>

				<main className='max-w-6xl mx-auto px-6 py-8'>
					<div className='flex flex-col lg:flex-row gap-8'>
						{/* Controls + Prediction */}
						<div className='lg:w-96 space-y-6'>
							<div className='bg-white rounded-2xl shadow p-6'>
								<h2 className='font-semibold mb-4 text-lg'>Select Location</h2>
								{/* Region toggle */}
								<div className='flex rounded-xl overflow-hidden border border-pink-200 mb-4'>
									{(Object.keys(regionGroups) as Region[]).map((r) => (
										<button
											key={r}
											onClick={() => handleRegionChange(r)}
											className={`flex-1 py-2 text-sm font-medium transition-all ${
												region === r
													? 'bg-pink-600 text-white'
													: 'bg-white text-gray-600 hover:bg-pink-50'
											}`}
										>
											{r === 'Japan' ? '🇯🇵 Japan' : '🇺🇸 Washington DC'}
										</button>
									))}
								</div>
								<div className='grid grid-cols-2 gap-3'>
									{locations.map((loc) => (
										<button
											key={loc.name}
											onClick={() => setSelectedLocation(loc)}
											className={`px-5 py-3.5 rounded-2xl text-sm font-medium transition-all ${
												selectedLocation.name === loc.name
													? 'bg-pink-600 text-white shadow-md'
													: 'bg-gray-100 hover:bg-gray-200'
											}`}
										>
											{loc.name}
										</button>
									))}
								</div>
							</div>

							<PredictionCard
								lat={selectedLocation.lat}
								lon={selectedLocation.lon}
								locationName={selectedLocation.name}
							/>
						</div>

						{/* Map */}
						<div className='flex-1 min-h-[600px]'>
							<BloomMap
								selectedLocation={selectedLocation}
								locations={locations}
							/>
						</div>
					</div>
				</main>
			</div>
		</QueryClientProvider>
	)
}

export default App
