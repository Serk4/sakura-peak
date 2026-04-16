import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useMemo } from 'react'
import type { BloomLocation } from '../data/bloomDates'

interface BloomSlideRuleProps {
	location: BloomLocation
}

export default function BloomSlideRule({ location }: BloomSlideRuleProps) {
	const bloomWindow = location

	// Draggable progress (0 = start, 100 = end)
	const progress = useMotionValue(25) // Start at 25% by default
	const y = useTransform(progress, [0, 100], [80, 340])

	const displayedDate = useMemo(() => {
		const totalMs = bloomWindow.end.getTime() - bloomWindow.start.getTime()
		const newTime =
			bloomWindow.start.getTime() + totalMs * (progress.get() / 100)
		return new Date(newTime)
	}, [progress, bloomWindow])

	const percentThrough = useMemo(() => {
		const total = bloomWindow.end.getTime() - bloomWindow.start.getTime()
		const passed = displayedDate.getTime() - bloomWindow.start.getTime()
		return Math.round(Math.min(Math.max((passed / total) * 100, 0), 100))
	}, [displayedDate, bloomWindow])

	return (
		<div className='relative w-full max-w-2xl mx-auto'>
			<div className='text-center mb-6'>
				<h3 className='text-xl font-medium'>
					{bloomWindow.name} Bloom Timeline
				</h3>
				<p className='text-white/60 text-sm mt-1'>{bloomWindow.region}</p>
			</div>

			<div className='relative h-[460px] bg-gradient-to-b from-black/90 to-slate-950 border border-white/20 rounded-3xl overflow-hidden shadow-2xl'>
				<div className='absolute left-1/2 top-12 bottom-12 w-[4px] bg-white/10 -translate-x-1/2' />

				{/* Bloom Region Glow */}
				<motion.div
					className='absolute left-1/2 -translate-x-1/2 w-80 h-32 bg-gradient-to-b from-pink-500/30 via-pink-400/50 to-pink-500/30 blur-xl rounded-full pointer-events-none'
					style={{ top: `calc(${100 - percentThrough}% - 60px)` }}
					animate={{ opacity: [0.5, 0.85, 0.5] }}
					transition={{ duration: 4, repeat: Infinity }}
				/>

				{/* Start Line */}
				<div className='absolute left-1/2 -translate-x-1/2 w-64 h-[2px] bg-white/60 top-[22%]'>
					<div className='absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-emerald-400 font-medium'>
						BLOOM STARTS
					</div>
					<div className='absolute -bottom-7 left-1/2 -translate-x-1/2 text-sm'>
						{bloomWindow.start.toLocaleDateString('en-US', {
							month: 'short',
							day: 'numeric',
						})}
					</div>
				</div>

				{/* Peak Line */}
				<motion.div
					className='absolute left-1/2 -translate-x-1/2 w-72 h-[3px] bg-gradient-to-r from-transparent via-pink-400 to-transparent shadow-[0_0_25px_#f472b6]'
					style={{ top: '50%' }}
				>
					<div className='absolute -top-8 left-1/2 -translate-x-1/2 text-pink-400 font-bold tracking-[3px] text-sm'>
						PEAK BLOOM
					</div>
					<div className='absolute -bottom-8 left-1/2 -translate-x-1/2 text-xl font-light text-pink-300'>
						{bloomWindow.peak.toLocaleDateString('en-US', {
							month: 'short',
							day: 'numeric',
						})}
					</div>
				</motion.div>

				{/* End Line */}
				<div className='absolute left-1/2 -translate-x-1/2 w-64 h-[2px] bg-white/60 top-[78%]'>
					<div className='absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-orange-400 font-medium'>
						LAST GOOD DAY
					</div>
					<div className='absolute -bottom-7 left-1/2 -translate-x-1/2 text-sm'>
						{bloomWindow.end.toLocaleDateString('en-US', {
							month: 'short',
							day: 'numeric',
						})}
					</div>
				</div>

				{/* Draggable Marker */}
				<motion.div
					className='absolute left-1/2 -translate-x-1/2 w-6 h-6 border-4 border-white bg-pink-500 rounded-full shadow-2xl cursor-grab active:cursor-grabbing'
					style={{ top: y }}
					drag='y'
					dragConstraints={{ top: 80, bottom: 340 }}
					onDrag={(_event, info) => {
						const newProgress = ((info.point.y - 80) / (340 - 80)) * 100
						progress.set(Math.max(0, Math.min(100, newProgress)))
					}}
					whileDrag={{ scale: 1.2 }}
				>
					<div className='absolute -top-10 left-1/2 -translate-x-1/2 bg-black/90 text-[11px] px-3 py-1 rounded-full whitespace-nowrap border border-white/20'>
						{displayedDate.toLocaleDateString('en-US', {
							month: 'short',
							day: 'numeric',
							year: 'numeric',
						})}
					</div>
				</motion.div>

				{/* Progress Display */}
				<div className='absolute bottom-10 left-1/2 -translate-x-1/2 text-center'>
					<div className='text-6xl font-light text-pink-300 tracking-tighter'>
						{percentThrough}
					</div>
					<div className='text-xs -mt-2 tracking-[2px] text-white/50'>
						PERCENT THROUGH BLOOM SEASON
					</div>
				</div>
			</div>

			<p className='text-center text-white/50 text-xs mt-4'>
				Drag the marker ↑↓ to explore the bloom season
			</p>
		</div>
	)
}
