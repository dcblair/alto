export const determineIsPressed = (
	currentFingerings: Array<[]>,
	keyId: string,
) =>
	Array.isArray(currentFingerings) &&
	currentFingerings[0]!.some((fingering: any) => fingering === keyId)
