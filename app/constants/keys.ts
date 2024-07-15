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

// todo: flat and sharp symbols?
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
	octave: {
		// 3rd octave
		3: {
			'a#/bb': {
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
			b: {
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
			c: {
				// add side c keyId
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
			'c#/db': {
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
			d: {
				keyIds: [['b-main', 'c-main', 'g-main', 'f-main', 'e-main', 'd-main']],
			},
			'd#/eb': {
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
			e: {
				keyIds: [['b-main', 'c-main', 'g-main', 'f-main', 'e-main']],
			},
			f: {
				keyIds: [['b-main', 'c-main', 'g-main', 'f-main']],
			},
			'f#/gb': {
				keyIds: [['b-main', 'c-main', 'g-main', 'e-main']],
			},
			g: {
				keyIds: [['b-main', 'c-main', 'g-main']],
			},
			'g#/ab': {
				keyIds: [['b-main', 'c-main', 'g-main', 'g#/ab-pinky']],
			},
			a: {
				keyIds: [['b-main', 'c-main']],
			},
		},

		// 4th octave
		4: {
			'a#/bb': {
				keyIds: [
					['b-main', 'b-bis'],
					['b-main', 'c-main', 'a#/bb-side'],
					['b-main', 'f-main'],
					['b-main', 'g-main'],
				],
			},
			b: {
				keyIds: [['b-main']],
			},
			c: {
				keyIds: [['c-main'], ['b-main', 'c-side']],
			},
			'c#/db': {
				keyIds: [[]],
			},
			d: {
				keyIds: [
					[
						'b-main',
						'c-main',
						'g-main',
						'f-main',
						'e-main',
						'd-main',
						'octave',
					],
				],
			},
			'd#/eb': {
				keyIds: [
					[
						'b-main',
						'c-main',
						'g-main',
						'f-main',
						'e-main',
						'd-main',
						'd#/eb-pinky',
						'octave',
					],
				],
			},
			e: {
				keyIds: [['b-main', 'c-main', 'g-main', 'f-main', 'e-main', 'octave']],
			},
			f: {
				keyIds: [['b-main', 'c-main', 'g-main', 'f-main', 'octave']],
			},
			'f#/gb': {
				keyIds: [['b-main', 'c-main', 'g-main', 'e-main', 'octave']],
			},
			g: {
				keyIds: [['b-main', 'c-main', 'g-main', 'octave']],
			},
			'g#/ab': {
				keyIds: [['b-main', 'c-main', 'g-main', 'g#/ab-pinky', 'octave']],
			},
		},

		// 5th octave
		5: {
			a: {
				keyIds: [['b-main', 'c-main', 'octave']],
			},
			'a#/bb': {
				keyIds: [
					['b-main', 'b-bis', 'octave'],
					['b-main', 'c-main', 'a#/bb-side', 'octave'],
					['b-main', 'f-main', 'octave'],
					['b-main', 'g-main', 'octave'],
				],
			},
			b: {
				keyIds: [['b-main', 'octave']],
			},
			c: {
				keyIds: [
					['c-main', 'octave'],
					['b-main', 'c-side', 'octave'],
				],
			},
			'c#/db': {
				keyIds: [['octave']],
			},
			d: {
				keyIds: [['d-palm', 'octave']],
			},
			'd#/eb': {
				keyIds: [['d-palm', 'd#/eb-palm', 'octave']],
			},
			e: {
				keyIds: [
					['d-palm', 'd#/eb-palm', 'e-side', 'octave'],
					['f-fork', 'b-main', 'c-main'],
				],
			},
			f: {
				keyIds: [
					['d-palm', 'd#/eb-palm', 'f-palm', 'e-side', 'octave'],
					['f-fork', 'c-main', 'octave'],
				],
			},
			'f#/gb': {
				keyIds: [['f-fork', 'c-main', 'octave']],
			},
			g: {
				keyIds: [['b-main', 'c-main', 'g-main', 'octave']],
			},
			'g#/ab': {
				keyIds: [['b-main', 'c-main', 'g-main', 'g#/ab-pinky', 'octave']],
			},
		},
	},
}
