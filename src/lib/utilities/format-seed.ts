function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatSeed(str: string) {
	const seedStringArray = str.split('-');
	return `${capitalize(seedStringArray[0])} ${capitalize(seedStringArray[1])} ${capitalize(
		seedStringArray[2]
	)}`;
}

export default formatSeed;
