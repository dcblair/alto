import { fingerings } from '../constants/keys'

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
const dominantFlats = ['c', 'f', 'bb', 'eb', 'ab', 'db', 'gb']
const dominantSharps = ['g', 'd', 'a', 'e', 'b', 'f#']
const diminishedFlats = ['d', 'g', 'c', 'f', 'bb', 'eb', 'ab']
const diminishedSharps = ['a', 'e', 'b', 'f#', 'c#', 'g#', 'd#']

const alteration = ['flat', 'natural', 'sharp', 'none'] as const

export type Alteration = (typeof alteration)[number]

const returnSharpOrFlat = (note: string[], alteration: Alteration) => {
	if (note.length > 1) {
		// # is 0 and b is 1 in returned array
		switch (alteration) {
			case 'sharp':
				return note[0]
			case 'flat':
				return note[1]
			default:
				return note.join('/')
		}
	} else {
		return note
	}
}

const getScaleAlteration = (quality: ScaleQuality, note: string) => {
	switch (quality) {
		case 'major':
			if (majorFlats.includes(note)) return 'flat'
			if (majorSharps.includes(note)) return 'sharp'
		case 'minor':
			if (minorFlats.includes(note)) return 'flat'
			if (minorSharps.includes(note)) return 'sharp'
		case 'dominant':
			if (dominantFlats.includes(note)) return 'flat'
			if (dominantSharps.includes(note)) return 'sharp'
		case 'diminished':
			if (diminishedFlats.includes(note)) return 'flat'
			if (diminishedSharps.includes(note)) return 'sharp'
		default:
			return 'none'
	}
}

// returns array of fingerings dependent on scale quality and starting note
export const getScaleFingerings = (
	quality: ScaleQuality,
	startingNote: {
		midiNote: number
		noteName: string
	},
) => {
	const { midiNote, noteName } = startingNote
	const scaleArr: number[] = []
	scaleNotes[quality].reduce((prev: number, curr: number) => {
		const nextValue = prev + curr
		scaleArr.push(nextValue)
		return nextValue
	}, midiNote)

	return scaleArr.map(note => {
		if (!fingerings[note]) {
			return {
				midiNote: note,
				note: ['unknown'],
				octave: 0,
				keyIds: [],
			}
		}

		const scaleAlteration = getScaleAlteration(quality, noteName)

		return {
			midiNote: note,
			...fingerings[note],
			note: returnSharpOrFlat(fingerings[note]!.note, scaleAlteration),
		}
	})
}
