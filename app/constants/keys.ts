// querty midi keyboard piano keys
export const acceptedKeys: string[] = [
	'a', // c
	's', // d
	'd', // e
	'f', // f
	'g', // g
	'h', // a
	'j', // b
	'k', // c
	'l', // d
	'w', // c#/db
	'e', // d#/eb
	't', // f#/gb
	'y', // g#/ab
	'u', // a#/bb
	'o', // c#/db
	'p', // d#/eb
]

export const octaveShiftKeys: string[] = ['z', 'x']

// default octave is 3
export const octave = [1, 2, 3, 4, 5, 6, 7, 8]

export const midiNoteMap: Record<string, number> = {
	c3: 48,
	'c#/db3': 49,
	d3: 50,
	'd#/eb3': 51,
	e3: 52,
	f3: 53,
	'f#/gb3': 54,
	g3: 55,
	'g#/ab3': 56,
	a3: 57,
	'a#/bb3': 58,
	b3: 59,
	c4: 60,
	'c#/db4': 61,
	d4: 62,
	'd#/eb4': 63,
	e4: 64,
	f4: 65,
	'f#/gb4': 66,
	g4: 67,
	'g#/ab4': 68,
	a4: 69,
	'a#/bb4': 70,
	b4: 71,
	c5: 72,
	'c#/db5': 73,
	d5: 74,
	'd#/eb5': 75,
	e5: 76,
	f5: 77,
	'f#/gb5': 78,
	g5: 79,
	'g#/ab5': 80,
	a5: 81,
	'a#/bb5': 82,
	b5: 83,
	c6: 84,
	'c#/db6': 85,
	d6: 86,
	'd#/eb6': 87,
	e6: 88,
	f6: 89,
	'f#/gb6': 90,
	g6: 91,
}

export const keyMap: Record<string, { note: string; midiNote: number }> = {
	a: { note: 'c', midiNote: 48 },
	w: { note: 'c#/db', midiNote: 49 },
	s: { note: 'd', midiNote: 50 },
	e: { note: 'd#/eb', midiNote: 51 },
	d: { note: 'e', midiNote: 52 },
	f: { note: 'f', midiNote: 53 },
	t: { note: 'f#/gb', midiNote: 54 },
	g: { note: 'g', midiNote: 55 },
	y: { note: 'g#/ab', midiNote: 56 },
	h: { note: 'a', midiNote: 57 },
	u: { note: 'a#/bb', midiNote: 58 },
	j: { note: 'b', midiNote: 59 },
	k: { note: 'c', midiNote: 60 },
	o: { note: 'c#/db', midiNote: 61 },
	l: { note: 'd', midiNote: 62 },
	p: { note: 'd#/eb', midiNote: 63 },
}

// todo: finish keyGroups for eventual keyboard saxophone key control
export const keyGroups: Record<string, string[]> = {
	'lh-front': ['a', 's', 'd'],
	'lh-middle': ['f', 'g', 'h'],
	'lh-back': ['j', 'k', 'l'],
	'rh-front': ['w', 'e', 't'],
	'rh-middle': ['y', 'u', 'i'],
	'rh-back': ['o', 'p'],
}

type KeyLayoutKey =
	| 'lh-main'
	| 'rh-main'
	| 'rh-pinky'
	| 'lh-pinky'
	| 'lh-palm'
	| 'rh-side'
	| 'octave'

export const keyLayout: Record<
	KeyLayoutKey,
	{ keyId: string; name: string; group: string }[]
> = {
	// left hand main keys
	'lh-main': [
		{
			keyId: 'f-fork',
			name: 'fork f',
			group: 'lh-main',
		},
		{
			keyId: 'b-main',
			name: 'b',
			group: 'lh-main',
		},
		{
			keyId: 'b-bis',
			name: 'bis b',
			group: 'lh-main',
		},
		{
			keyId: 'c-main',
			name: 'c',
			group: 'lh-main',
		},
		{
			keyId: 'g-main',
			name: 'g',
			group: 'lh-main',
		},
	],

	// right hand main keys
	'rh-main': [
		{
			keyId: 'f-main',
			name: 'f',
			group: 'rh-main',
		},
		{
			keyId: 'e-main',
			name: 'e',
			group: 'rh-main',
		},
		{
			keyId: 'd-main',
			name: 'd',
			group: 'rh-main',
		},
		{
			keyId: 'f-main-alt',
			name: 'f',
			group: 'rh-main',
		},
	],

	// right hand pinky keys
	'rh-pinky': [
		{
			keyId: 'd#/eb-pinky',
			name: 'd#/eb',
			group: 'rh-pinky',
		},
		{
			keyId: 'a#/bb-pinky-right',
			name: 'a#/bb',
			group: 'rh-pinky',
		},
	],

	// left hand pinky keys
	'lh-pinky': [
		{
			keyId: 'g#/ab-pinky',
			name: 'g#/ab',
			group: 'lh-pinky',
		},
		{
			keyId: 'c#/db-pinky',
			name: 'c#/db',
			group: 'lh-pinky',
		},
		{
			keyId: 'b-pinky',
			name: 'b',
			group: 'lh-pinky',
		},
		{
			keyId: 'a#/bb-pinky-left',
			name: 'a#/bb',
			group: 'lh-pinky',
		},
	],

	// palm keys
	'lh-palm': [
		{
			keyId: 'd-palm',
			name: 'd',
			group: 'lh-palm',
		},
		{
			keyId: 'd#/eb-palm',
			name: 'd#/eb',
			group: 'lh-palm',
		},
		{
			keyId: 'f-palm',
			name: 'f',
			group: 'lh-palm',
		},
	],

	// right hand side keys
	'rh-side': [
		{
			keyId: 'e-side',
			name: 'e',
			group: 'rh-side',
		},
		{
			keyId: 'c-side',
			name: 'c',
			group: 'rh-side',
		},
		{
			keyId: 'a#/bb-side',
			name: 'a#/bb-side',
			group: 'rh-side',
		},
	],

	// octave key
	octave: [
		{
			keyId: 'octave',
			name: 'octave',
			group: 'octave',
		},
	],
}

// todo: check fingerings
export const fingerings: any = {
	midiNote: {
		// 3rd octave
		58: {
			note: 'a#/bb',
			keyIds: [
				[
					'b-main',
					'c-main',
					'g-main',
					'f-main',
					'e-main',
					'd-main',
					'a#/bb-pinky-left',
					'a#/bb-pinky-right',
				],
			],
		},
		59: {
			note: 'b',
			keyIds: [
				[
					'b-main',
					'c-main',
					'g-main',
					'f-main',
					'e-main',
					'd-main',
					'b-pinky',
					'a#/bb-pinky-right',
				],
			],
		},

		// 4th octave - middle c
		60: {
			note: 'c',
			keyIds: [
				[
					'b-main',
					'c-main',
					'g-main',
					'f-main',
					'e-main',
					'd-main',
					'a#/bb-pinky-right',
				],
			],
		},
		61: {
			note: 'c#/db',
			keyIds: [
				[
					'b-main',
					'c-main',
					'g-main',
					'f-main',
					'e-main',
					'd-main',
					'c#/db-pinky',
					'a#/bb-pinky-right',
				],
			],
		},
		62: {
			note: 'd',
			keyIds: [['b-main', 'c-main', 'g-main', 'f-main', 'e-main', 'd-main']],
		},
		63: {
			note: 'd#/eb',
			keyIds: [
				[
					'b-main',
					'c-main',
					'g-main',
					'f-main',
					'e-main',
					'd-main',
					'd#/eb-pinky',
				],
			],
		},
		64: {
			note: 'e',
			keyIds: [['b-main', 'c-main', 'g-main', 'f-main', 'e-main']],
		},
		65: {
			note: 'f',
			keyIds: [['b-main', 'c-main', 'g-main', 'f-main']],
		},
		66: {
			note: 'f#/gb',
			keyIds: [['b-main', 'c-main', 'g-main', 'e-main']],
		},
		67: {
			note: 'g',
			keyIds: [['b-main', 'c-main', 'g-main']],
		},
		68: {
			note: 'g#/ab',
			keyIds: [['b-main', 'c-main', 'g-main', 'g#/ab-pinky']],
		},
		69: {
			note: 'a',
			keyIds: [['b-main', 'c-main']],
		},
		70: {
			note: 'a#/bb',
			keyIds: [
				['b-main', 'b-bis'],
				['b-main', 'c-main', 'a#/bb-side'],
				['b-main', 'f-main'],
				['b-main', 'g-main'],
			],
		},
		71: {
			note: 'b',
			keyIds: [['b-main']],
		},

		// 5th octave
		72: {
			note: 'c',
			keyIds: [['c-main'], ['b-main', 'c-side']],
		},
		73: {
			note: 'c#/db',
			keyIds: [['']],
		},
		74: {
			note: 'd',
			keyIds: [
				'b-main',
				'c-main',
				'g-main',
				'f-main',
				'e-main',
				'd-main',
				'octave',
			],
		},
		75: {
			note: 'd#/eb',
			keyIds: [
				'b-main',
				'c-main',
				'g-main',
				'f-main',
				'e-main',
				'd-main',
				'd#/eb-pinky',
				'octave',
			],
		},
		76: {
			note: 'e',
			keyIds: ['b-main', 'c-main', 'g-main', 'f-main', 'e-main', 'octave'],
		},
		77: {
			note: 'f',
			keyIds: ['b-main', 'c-main', 'g-main', 'f-main', 'octave'],
		},
		78: {
			note: 'f#/gb',
			keyIds: ['b-main', 'c-main', 'g-main', 'e-main', 'octave'],
		},
		79: {
			note: 'g',
			keyIds: ['b-main', 'c-main', 'g-main', 'octave'],
		},
		80: {
			note: 'g#/ab',
			keyIds: ['b-main', 'c-main', 'g-main', 'g#/ab-pinky', 'octave'],
		},
		81: {
			note: 'a',
			keyIds: ['b-main', 'c-main', 'octave'],
		},
		82: {
			note: 'a#/bb',
			keyIds: [
				['b-main', 'b-bis', 'octave'],
				['b-main', 'c-main', 'a#/bb-side', 'octave'],
				['b-main', 'f-main', 'octave'],
				['b-main', 'g-main', 'octave'],
			],
		},
		83: {
			note: 'b',
			keyIds: [['b-main', 'octave']],
		},

		// 6th octave
		84: {
			note: 'c',
			keyIds: [
				['c-main', 'octave'],
				['b-main', 'c-side', 'octave'],
			],
		},
		85: {
			note: 'c#/db',
			keyIds: [['octave']],
		},
		86: {
			note: 'd',
			keyIds: [['d-palm', 'octave']],
		},
		87: {
			note: 'd#/eb',
			keyIds: [['d-palm', 'd#/eb-palm', 'octave']],
		},
		88: {
			note: 'e',
			keyIds: [
				['d-palm', 'd#/eb-palm', 'e-side', 'octave'],
				['f-fork', 'b-main', 'c-main'],
			],
		},
		89: {
			note: 'f',
			keyIds: [
				['d-palm', 'd#/eb-palm', 'f-palm', 'e-side', 'octave'],
				['f-fork', 'c-main', 'octave'],
			],
		},
		90: {
			note: 'f#/gb',
			keyIds: [['f-fork', 'c-main', 'octave']],
		},
		91: {
			note: 'g',
			keyIds: [['f-fork', 'c-main', 'g-main', 'octave']],
		},
		92: {
			note: 'g#/ab',
			keyIds: [['f-fork', 'c-main', 'g-main', 'g#/ab-pinky', 'octave']],
		},
		93: {
			note: 'a',
			keyIds: [['f-fork', 'c-main', 'octave']],
		},
	},
}
