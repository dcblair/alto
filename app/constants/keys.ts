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
