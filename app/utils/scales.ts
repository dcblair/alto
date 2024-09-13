import { fingerings } from '../constants/keys'

export type ScaleQuality = 'major' | 'minor' | 'dominant' | 'diminished'

/**
 * Scale quality and the notes that make up the scale in number of semitones
 * initial value is the starting note
 **/
const scaleNotes: Record<ScaleQuality, number[]> = {
	// w w h w w w h
	major: [0, 2, 2, 1, 2, 2, 2, 1],
	//  w h w w h w w
	minor: [0, 2, 1, 2, 2, 1, 2, 2],
	// w w h w w h w
	dominant: [0, 2, 2, 1, 2, 2, 1, 2],
	// w h w h w h w h
	diminished: [0, 2, 1, 2, 1, 2, 1, 2, 1],
}

// returns array of fingerings dependent on scale quality and starting note
export const getScaleFingerings = (
	quality: ScaleQuality,
	startingNote: number,
) => {
	const scaleArr: number[] = []
	scaleNotes[quality].reduce((prev: number, curr: number) => {
		const nextValue = prev + curr
		scaleArr.push(nextValue)
		return nextValue
	}, startingNote)

	return scaleArr.map(note => fingerings.midiNote[note])
}
