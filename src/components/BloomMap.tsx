// src/components/BloomMap.tsx
// TODO: implement lightweight static map (SVG or similar) with city marker overlay

interface BloomMapProps {
	locations: { name: string; lat: number; lon: number }[]
	predictions: { name: string; prediction: unknown }[]
	simulatedDate: Date
	mode: 'japan' | 'dc'
}

export default function BloomMap({ mode }: BloomMapProps) {
	return (
		<div className='relative w-full h-full rounded-3xl overflow-hidden border border-pink-100 shadow-inner bg-[#c8e0f0] flex items-center justify-center'>
			<p className='text-gray-400 text-sm'>Map coming soon ({mode})</p>
		</div>
	)
}
