import { fingerings, notes } from '../constants/keys'

export const scaleQualities = [
	'major',
	'minor',
	'dominant',
	'diminished',
] as const

export type ScaleQuality = (typeof scaleQualities)[number]

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

const majorFlats = ['c', 'f', 'bb', 'eb', 'ab', 'db', 'gb']
const majorSharps = ['g', 'd', 'a', 'e', 'b', 'f#', 'c#']
const minorFlats = ['a', 'd', 'g', 'c', 'f', 'bb', 'eb']
const minorSharps = ['e', 'b', 'f#', 'c#', 'g#', 'd#', 'a#']
const dominantFlats = ['f', 'bb', 'eb', 'ab', 'db', 'gb', 'cb']
const dominantSharps = ['c', 'g', 'd', 'a', 'e', 'b', 'f#']
const diminishedFlats = ['d', 'g', 'c', 'f', 'bb', 'eb', 'ab']
const diminishedSharps = ['a', 'e', 'b', 'f#', 'c#', 'g#', 'd#']

const alteration = ['flat', 'sharp'] as const

export type Alteration = (typeof alteration)[number]

// based on
const returnSharpOrFlat = (note: string, alteration: Alteration) => {
	// make sure note has flat value
	if (!note.includes('/')) return

	// # is 0 and b is 1 in returned array
	const splitNote = note.split('/')

	switch (alteration) {
		case 'sharp':
			return splitNote[0]
		case 'flat':
			return splitNote[1]
		default:
			return
	}
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

	return scaleArr.map(note => {
		if (!fingerings[note]) {
			return {
				midiNote: note,
				note: 'unknown',
				octave: 0,
				keyIds: [],
			}
		}

		return {
			midiNote: note,
			...fingerings[note],
		}
	})
}
