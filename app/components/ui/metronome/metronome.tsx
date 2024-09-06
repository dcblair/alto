import React, { memo, useEffect, useRef, useState } from 'react'
import { Button } from '../button'

const BaseMetronome = () => {
	const [tempo, setTempo] = useState(60)
	const [beat, setBeat] = useState(4)
	const [currentBeat, setCurrentBeat] = useState(1)
	const [isPlaying, setIsPlaying] = useState(false)
	const [selectedMetronomeSample, setSelectedMetronomeSample] = useState({
		accent: 'perc_met_1',
		main: 'perc_met_0',
	})

	useEffect(() => {
		let intervalId: any
		if (isPlaying) {
			intervalId = setInterval(() => {
				setCurrentBeat((prevBeat) => {
					if (prevBeat === beat) {
						return 1
					}
					return prevBeat + 1
				})

				playMetronomeTick()
			}, 60000 / tempo)
		}
		return () => clearInterval(intervalId)
	}, [tempo, isPlaying])

	const handleIsPlaying = () => {
		setIsPlaying(!isPlaying)
	}

	const playMetronomeTick = () => {
		const accentTickSound = new Audio(
			`/samples/metronome/${selectedMetronomeSample?.accent}.wav`,
		)
		const tickSound = new Audio(
			`/samples/metronome/${selectedMetronomeSample?.main}.wav`,
		)

		// todo: only tickSound playing => figure out what's overriding this
		currentBeat !== 1 ? tickSound.play() : accentTickSound.play()
	}

	// updates the beat count
	const handleUpdateBeat = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBeat(Number(e.target.value))
	}

	return (
		<div className="flex w-full flex-col space-y-6 rounded-xl bg-gray-500 p-8 text-center shadow-md md:w-64">
			<input
				defaultValue={tempo}
				onChange={(e) => setTempo(Number(e.target.value))}
				type="range"
				min="30"
				max="300"
				step={1}
			/>
			<div className="space-y-2">
				<p className="text-white">{tempo} bpm</p>
				<div className="flex space-x-2">
					<input
						defaultValue={4}
						max={13}
						min={1}
						onChange={handleUpdateBeat}
						type="number"
					/>
					<span className="text-white">{currentBeat}</span>
				</div>
			</div>

			<Button className="shadow-md" onClick={handleIsPlaying}>
				{isPlaying ? 'stop' : 'play'}
			</Button>
		</div>
	)
}

const Metronome = memo(BaseMetronome)

Metronome.displayName = 'Metronome'

export default Metronome
