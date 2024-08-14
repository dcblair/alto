import React, { memo, useEffect, useRef, useState } from 'react'
import { Button } from '../button'

const BaseMetronome = () => {
	const [tempo, setTempo] = useState(60)
	const [isPlaying, setIsPlaying] = useState(false)
	const [selectedMetronomeSample, setSelectedMetronomeSample] =
		useState('perc_met_0')

	const playMetronomeTick = () => {
		const tickSound = new Audio(
			`/samples/metronome/${selectedMetronomeSample}.wav`,
		)
		tickSound.play()
	}

	useEffect(() => {
		let intervalId: any
		if (isPlaying) {
			intervalId = setInterval(() => {
				playMetronomeTick()
			}, 60000 / tempo)
		}
		return () => clearInterval(intervalId)
	}, [tempo, isPlaying])

	const handleIsPlaying = () => {
		setIsPlaying(!isPlaying)
	}

	return (
		<div className="flex w-full flex-col space-y-6 rounded-xl bg-gray-500 p-8 shadow-md md:w-64">
			<input
				className="rounded-md py-2 shadow-md"
				onChange={(e) => setTempo(Number(e.target.value))}
				defaultValue={tempo}
			/>

			<Button className="shadow-md" onClick={handleIsPlaying}>
				{isPlaying ? 'stop' : 'start'}
			</Button>
		</div>
	)
}

const Metronome = memo(BaseMetronome)

export default Metronome
