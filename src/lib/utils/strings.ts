/**
 * Converts a string to a slug, suitable for CSS variable names or URLs.
 * This function lowercases the string, replaces spaces with hyphens,
 * and removes any characters that are not alphanumeric or hyphens. It also
 * handles special characters with diacritics.
 *
 * @param str The input string.
 * @returns The slugified string.
 */
export const toSlug = (str: string): string => {
	if (!str) return '';

	return str
		.normalize('NFD') // split an accented letter into the base letter and the accent
		.replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9 -]/g, '') // remove all chars not letters, numbers, dash or space
		.replace(/\s+/g, '-'); // replace all spaces with dash
};
