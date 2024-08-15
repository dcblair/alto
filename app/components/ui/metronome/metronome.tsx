import React, { memo, useEffect, useRef, useState } from 'react'
import { Button } from '../button'

const BaseMetronome = () => {
	const [tempo, setTempo] = useState(60)
	const [beat, setBeat] = useState(4)
	const [isPlaying, setIsPlaying] = useState(false)
	const [selectedMetronomeSample, setSelectedMetronomeSample] = useState({
		accent: 'perc_met_1',
		main: 'perc_met_0',
	})

	const playMetronomeTick = () => {
		const accentTickSound = new Audio(
			`/samples/metronome/${selectedMetronomeSample?.accent}.wav`,
		)
		const tickSound = new Audio(
			`/samples/metronome/${selectedMetronomeSample?.main}.wav`,
		)

		if (beat % 4 === 0) {
			accentTickSound.play()
		} else {
			tickSound.play()
		}
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
				defaultValue={tempo}
				onChange={(e) => setTempo(Number(e.target.value))}
				type="range"
				min="30"
				max="300"
				step={1}
			/>
			<p className="text-center text-white">{tempo} bpm</p>

			<Button className="shadow-md" onClick={handleIsPlaying}>
				{isPlaying ? 'stop' : 'play'}
			</Button>
		</div>
	)
}

const Metronome = memo(BaseMetronome)

export default Metronome
