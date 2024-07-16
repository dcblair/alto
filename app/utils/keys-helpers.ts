export const determineIsPressed = (
	currentFingerings: Array<string[]>,
	keyId: string,
	selectedFingering: number,
) =>
	Array.isArray(currentFingerings) &&
	currentFingerings[selectedFingering]!.some((fingering: any) => {
		return fingering === keyId
	})
