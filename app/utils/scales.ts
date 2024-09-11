import { fingerings } from '../constants/keys'

export type ScaleQuality = 'major' | 'minor' | 'dominant' | 'diminished'

const scaleNotes: Record<ScaleQuality, number[]> = {
	// w w h w w w h
	major: [2, 2, 1, 2, 2, 2, 1],
	//  w h w w h w w
	minor: [2, 1, 2, 2, 1, 2, 2],
	// w w h w w h w
	dominant: [2, 2, 1, 2, 2, 1, 2],
	// w h w h w h w h
	diminished: [2, 1, 2, 1, 2, 1, 2, 1],
}

export const getScaleFingerings = (
	quality: ScaleQuality,
	startingNote: number,
) => {
	const scale = scaleNotes[quality].map((interval, index) => {
		if (index === 0) {
			return startingNote
		}

		return startingNote + interval
	})

	return scale.map((note) => fingerings[note])
}
