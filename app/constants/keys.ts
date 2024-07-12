// querty midi keyboard piano keys
export const acceptedKeys: string[] = [
	'a',
	's',
	'd',
	'f',
	'g',
	'h',
	'j',
	'k',
	'l',
	'w',
	'e',
	't',
	'y',
	'u',
	'i',
	'o',
	'p',
]

export const octaveShiftKeys: string[] = ['z', 'x']

// default octave is 3
export const octave = [1, 2, 3, 4, 5, 6, 7, 8]

// todo: flat and sharp symbols?
export const keyMap: Record<string, string> = {
	a: 'c',
	w: 'c#/db',
	s: 'd',
	e: 'd#/eb',
	d: 'e',
	f: 'f',
	t: 'f#/gb',
	g: 'g',
	y: 'g#/ab',
	h: 'a',
	u: 'a#/bb',
	j: 'b',
	k: 'c',
	o: 'c#/db',
	l: 'd',
	p: 'd#/eb',
}

// todo: consider key combos for multiple octaves
export const keyCombos: Record<string, number[]> = {
	a: [1, 3],
	'a#/bb': [1, 2],
	b: [1],
	c: [2],
	'c#/db': [1, 2, 3, 4, 5, 6, 7],
	d: [1, 3, 4, 5, 6, 7],
	'd#/eb': [1, 3, 4, 5, 6, 7],
	e: [1, 3, 4, 5, 6, 7],
	f: [1, 3, 4, 5, 6, 7],
	'f#/gb': [1, 3, 4, 5, 6, 7],
	g: [1, 3, 4, 5, 6, 7],
	'g#/ab': [1, 3, 4, 5, 6, 7],
}

/**
 * combo to get a: 1, 3
 * combo to get a# or bb: 1, 2 or 1, 5
 * combo to get b: 1
 * combo to get c: 2
 * combo to get c# or db: all open
 * combo to get d: 1, 3, 4, 5, 6, 7
 */

// todo: should i group these using object keys?
export const keyGroups: Record<string, string[]> = {
	'lh-front': ['a', 's', 'd'],
	'lh-middle': ['f', 'g', 'h'],
	'lh-back': ['j', 'k', 'l'],
	'rh-front': ['w', 'e', 't'],
	'rh-middle': ['y', 'u', 'i'],
	'rh-back': ['o', 'p'],
}

export const keyLayout: Record<
	string,
	{ keyId: number; name: string; group: string }[]
> = {
	'lh-main': [
		{
			keyId: 0,
			name: 'fork f',
			group: 'lh-main',
		},
		{
			keyId: 1,
			name: 'b',
			group: 'lh-main',
		},
		{
			keyId: 2,
			name: 'bis b',
			group: 'lh-main',
		},
		{
			keyId: 3,
			name: 'c',
			group: 'lh-main',
		},
		{
			keyId: 4,
			name: 'g',
			group: 'lh-main',
		},
	],
	'rh-main': [
		{
			keyId: 5,
			name: 'f',
			group: 'rh-main',
		},
		{
			keyId: 6,
			name: 'e',
			group: 'rh-main',
		},
		{
			keyId: 7,
			name: 'd',
			group: 'rh-main',
		},
	],
	'rh-pinky': [
		{
			keyId: 8,
			name: 'eb',
			group: 'rh-pinky',
		},
		{
			keyId: 9,
			name: 'bb',
			group: 'rh-pinky',
		},
	],
	'lh-pinky': [
		{
			keyId: 11,
			name: 'g#',
			group: 'lh-pinky',
		},
		{
			keyId: 12,
			name: 'c#',
			group: 'lh-pinky',
		},
		{
			keyId: 13,
			name: 'b',
			group: 'lh-pinky',
		},
		{
			keyId: 14,
			name: 'bb',
			group: 'lh-pinky',
		},
	],
}

// order by octave, or by note?
export const fingerings: any = {
	octave: {
		3: {
			a: {
				keyIds: [1, 3],
			},
			'a#/bb': {
				keyIds: [
					[1, 2],
					[1, 3, 'side bb'],
					[1, 5],
					[1, 6],
				],
			},
			b: {
				keyIds: [1],
			},
			c: {
				// add side c keyId
				keyIds: [[3], [1, 'side c']],
			},
			'c#/db': {
				keyIds: [1, 2, 3, 4, 5, 6, 7],
			},
			d: {
				keyIds: [1, 3, 4, 5, 6, 7],
			},
			'd#/eb': {
				keyIds: [1, 3, 4, 5, 6, 7],
			},
			e: {
				keyIds: [1, 3, 4, 5, 6, 7],
			},
			f: {
				keyIds: [1, 3, 4, 5, 6, 7],
			},
			'f#/gb': {
				keyIds: [1, 3, 4, 5, 6, 7],
			},
			g: {
				keyIds: [1, 3, 4],
			},
			'g#/ab': {
				keyIds: [1, 3, 4, 5],
			},
		},
	},
}
