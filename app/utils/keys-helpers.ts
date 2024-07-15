export const determineIsPressed = (
	currentFingerings: Array<[]>,
	keyId: string,
	// todo: make this required
	selectedFingering?: number,
) =>
	Array.isArray(currentFingerings) &&
	currentFingerings[selectedFingering || 0]!.some(
		(fingering: any) => fingering === keyId,
	)
