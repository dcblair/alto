export const keyLayout: Record<
	string,
	{ quality: 'major' | 'minor'; notes: string }[]
> = {
	// left hand main keys
	bb: [
		{
			quality: 'major',
			notes: 'lh-main',
		},
	],
}

// todo: check fingerings
// const fingerings: any = {
// 	midiNote: {
// 		// 2nd octave
// 		46: {
// 			note: 'a#/bb',
// 			octave: 2,
// 			keyIds: [
// 				[
// 					'b-main',
// 					'c-main',
// 					'g-main',
// 					'f-main',
// 					'e-main',
// 					'd-main',
// 					'a#/bb-pinky-left',
// 					'a#/bb-pinky-right',
// 				],
// 			],
// 		},
// 		47: {
// 			note: 'b',
// 			octave: 2,
// 			keyIds: [
// 				[
// 					'b-main',
// 					'c-main',
// 					'g-main',
// 					'f-main',
// 					'e-main',
// 					'd-main',
// 					'b-pinky',
// 					'a#/bb-pinky-right',
// 				],
// 			],
// 		},

// 		// 3rd octave - middle c
// 		48: {
// 			note: 'c',
// 			octave: 3,
// 			keyIds: [
// 				[
// 					'b-main',
// 					'c-main',
// 					'g-main',
// 					'f-main',
// 					'e-main',
// 					'd-main',
// 					'a#/bb-pinky-right',
// 				],
// 			],
// 		},
// 		49: {
// 			note: 'c#/db',
// 			octave: 3,
// 			keyIds: [
// 				[
// 					'b-main',
// 					'c-main',
// 					'g-main',
// 					'f-main',
// 					'e-main',
// 					'd-main',
// 					'c#/db-pinky',
// 					'a#/bb-pinky-right',
// 				],
// 			],
// 		},
// 		50: {
// 			note: 'd',
// 			octave: 3,
// 			keyIds: [['b-main', 'c-main', 'g-main', 'f-main', 'e-main', 'd-main']],
// 		},
// 		51: {
// 			note: 'd#/eb',
// 			octave: 3,
// 			keyIds: [
// 				[
// 					'b-main',
// 					'c-main',
// 					'g-main',
// 					'f-main',
// 					'e-main',
// 					'd-main',
// 					'd#/eb-pinky',
// 				],
// 			],
// 		},
// 		52: {
// 			note: 'e',
// 			octave: 3,
// 			keyIds: [['b-main', 'c-main', 'g-main', 'f-main', 'e-main']],
// 		},
// 		53: {
// 			note: 'f',
// 			octave: 3,
// 			keyIds: [['b-main', 'c-main', 'g-main', 'f-main']],
// 		},
// 		54: {
// 			note: 'f#/gb',
// 			octave: 3,
// 			keyIds: [['b-main', 'c-main', 'g-main', 'e-main']],
// 		},
// 		55: {
// 			note: 'g',
// 			octave: 3,
// 			keyIds: [['b-main', 'c-main', 'g-main']],
// 		},
// 		56: {
// 			note: 'g#/ab',
// 			octave: 3,
// 			keyIds: [['b-main', 'c-main', 'g-main', 'g#/ab-pinky']],
// 		},
// 		57: {
// 			note: 'a',
// 			octave: 3,
// 			keyIds: [['b-main', 'c-main']],
// 		},
// 		58: {
// 			note: 'a#/bb',
// 			octave: 3,
// 			keyIds: [
// 				['b-main', 'b-bis'],
// 				['b-main', 'c-main', 'a#/bb-side'],
// 				['b-main', 'f-main'],
// 				['b-main', 'g-main'],
// 			],
// 		},
// 		59: {
// 			note: 'b',
// 			octave: 3,
// 			keyIds: [['b-main']],
// 		},

// 		// 4th octave
// 		60: {
// 			note: 'c',
// 			octave: 4,
// 			keyIds: [['c-main'], ['b-main', 'c-side']],
// 		},
// 		61: {
// 			note: 'c#/db',
// 			octave: 4,
// 			keyIds: [['']],
// 		},
// 		62: {
// 			note: 'd',
// 			octave: 4,
// 			keyIds: [
// 				['b-main', 'c-main', 'g-main', 'f-main', 'e-main', 'd-main', 'octave'],
// 			],
// 		},
// 		63: {
// 			note: 'd#/eb',
// 			octave: 4,
// 			keyIds: [
// 				[
// 					'b-main',
// 					'c-main',
// 					'g-main',
// 					'f-main',
// 					'e-main',
// 					'd-main',
// 					'd#/eb-pinky',
// 					'octave',
// 				],
// 			],
// 		},
// 		64: {
// 			note: 'e',
// 			octave: 4,
// 			keyIds: [['b-main', 'c-main', 'g-main', 'f-main', 'e-main', 'octave']],
// 		},
// 		65: {
// 			note: 'f',
// 			octave: 4,
// 			keyIds: [['b-main', 'c-main', 'g-main', 'f-main', 'octave']],
// 		},
// 		66: {
// 			note: 'f#/gb',
// 			octave: 4,
// 			keyIds: [['b-main', 'c-main', 'g-main', 'e-main', 'octave']],
// 		},
// 		67: {
// 			note: 'g',
// 			octave: 4,
// 			keyIds: [['b-main', 'c-main', 'g-main', 'octave']],
// 		},
// 		68: {
// 			note: 'g#/ab',
// 			octave: 4,
// 			keyIds: [['b-main', 'c-main', 'g-main', 'g#/ab-pinky', 'octave']],
// 		},
// 		69: {
// 			note: 'a',
// 			octave: 4,
// 			keyIds: [['b-main', 'c-main', 'octave']],
// 		},
// 		70: {
// 			note: 'a#/bb',
// 			octave: 4,
// 			keyIds: [
// 				['b-main', 'b-bis', 'octave'],
// 				['b-main', 'c-main', 'a#/bb-side', 'octave'],
// 				['b-main', 'f-main', 'octave'],
// 				['b-main', 'g-main', 'octave'],
// 			],
// 		},
// 		71: {
// 			note: 'b',
// 			octave: 4,
// 			keyIds: [['b-main', 'octave']],
// 		},

// 		// 5th octave
// 		72: {
// 			note: 'c',
// 			octave: 5,
// 			keyIds: [
// 				['c-main', 'octave'],
// 				['b-main', 'c-side', 'octave'],
// 			],
// 		},
// 		73: {
// 			note: 'c#/db',
// 			octave: 5,
// 			keyIds: [['octave']],
// 		},
// 		74: {
// 			note: 'd',
// 			octave: 5,
// 			keyIds: [['d-palm', 'octave']],
// 		},
// 		75: {
// 			note: 'd#/eb',
// 			octave: 5,
// 			keyIds: [['d-palm', 'd#/eb-palm', 'octave']],
// 		},
// 		76: {
// 			note: 'e',
// 			octave: 5,
// 			keyIds: [
// 				['d-palm', 'd#/eb-palm', 'e-side', 'octave'],
// 				['f-fork', 'b-main', 'c-main'],
// 			],
// 		},
// 		77: {
// 			note: 'f',
// 			octave: 5,
// 			keyIds: [
// 				['d-palm', 'd#/eb-palm', 'f-palm', 'e-side', 'octave'],
// 				['f-fork', 'c-main', 'octave'],
// 			],
// 		},
// 		78: {
// 			note: 'f#/gb',
// 			octave: 5,
// 			keyIds: [['f-fork', 'c-main', 'octave']],
// 		},
// 		79: {
// 			note: 'g',
// 			octave: 5,
// 			keyIds: [['f-fork', 'f-main', 'e-side', 'octave']],
// 		},
// 		80: {
// 			note: 'g#/ab',
// 			octave: 5,
// 			keyIds: [
// 				['b-main', 'c-main', 'g-main', 'c-side', 'a#/bb-side', 'octave'],
// 			],
// 		},
// 		81: {
// 			note: 'a',
// 			octave: 5,
// 			keyIds: [['f-fork', 'c-main', 'octave']],
// 		},
// 	},
// }
