export type IslandThemeColors = {
	islandColor: string;
	skyColorOne: string;
	skyColorTwo: string;
	waterColorOne: string;
	waterColorTwo: string;
};

export type IslandTheme = { colors: IslandThemeColors; tags: string[] };

export type IslandThemes = Record<string, IslandTheme>;

const islandThemes: IslandThemes = {
	acid: {
		colors: {
			islandColor: '#4a3f4b',
			skyColorOne: '#96e8c9',
			skyColorTwo: '#000000',
			waterColorOne: '#5fcd37',
			waterColorTwo: '#caff9e'
		},
		tags: ['acid', 'polluted', 'toxic']
	},
	beach: {
		colors: {
			islandColor: '#9a927e',
			skyColorOne: '#ffebb3',
			skyColorTwo: '#bddfff',
			waterColorOne: '#5ca8ff',
			waterColorTwo: '#a3d9ff'
		},
		tags: ['blazing', 'hot', 'sunny']
	},
	// created by Siv Steffensen
	brocante: {
		colors: {
			islandColor: '#816e72',
			skyColorOne: '#e1c8e4',
			skyColorTwo: '#faf3f0',
			waterColorOne: '#f1fff0',
			waterColorTwo: '#d1e6e0',
		},
		tags: ['faded', 'delicate', 'elegant', 'lovely'],
	},
	// created by Siv Steffensen
	marble: {
		colors: {
			islandColor: '#328b54',
			skyColorOne: '#80a7e5',
			skyColorTwo: '#ffffff',
			waterColorOne: '#65c4d7',
			waterColorTwo: '#96dfee'
		},
		tags: ['bright', 'chilly', 'foggy', 'marble', 'misty', 'mediterranean', 'quiet']
	},
	exotic: {
		colors: {
			islandColor: '#5d5658',
			skyColorOne: '#ecdb69',
			skyColorTwo: '#ffe5f7',
			waterColorOne: '#50bfce',
			waterColorTwo: '#aeeae9'
		},
		tags: ['exotic', 'tropical', 'warm', 'crazy']
	},
	fuchsia: {
		colors: {
			islandColor: '#163345',
			skyColorOne: '#131f76',
			skyColorTwo: '#1e0b6b',
			waterColorOne: '#5742f0',
			waterColorTwo: '#e187f2'
		},
		tags: ['fuchsia', 'breathtaking', 'majestic']
	},
	// created by Jes Kristensen
	lillith: {
		colors: {
			islandColor: '#212121',
			skyColorOne: '#545454',
			skyColorTwo: '#d39797',
			waterColorOne: '#8f0000',
			waterColorTwo: '#a92323'
		},
		tags: ['blood', 'red']
	},
	retro: {
		colors: {
			islandColor: '#49363a',
			skyColorOne: '#ebe76c',
			skyColorTwo: '#f0b86e',
			waterColorOne: '#836096',
			waterColorTwo: '#ed7b7b'
		},
		tags: ['old', 'forgotten', 'charming']
	},
	storm: {
		colors: {
			islandColor: '#525252',
			skyColorOne: '#898c9a',
			skyColorTwo: '#bacdd8',
			waterColorOne: '#6d9dd5',
			waterColorTwo: '#90c1e4'
		},
		tags: ['cloudy', 'grey', 'stormy', 'thunderous', 'windy']
	},
	sunset: {
		colors: {
			islandColor: '#554e56',
			skyColorOne: '#b095e8',
			skyColorTwo: '#dd9cac',
			waterColorOne: '#61abff',
			waterColorTwo: '#9cd6ff'
		},
		tags: ['calm', 'crisp', 'sunset']
	},
	volcano: {
		colors: {
			islandColor: '#5e4845',
			skyColorOne: '#cb6d4d',
			skyColorTwo: '#1e180a',
			waterColorOne: '#b6207f',
			waterColorTwo: '#f4e68b'
		},
		tags: ['fiery', 'roasting', 'scorched', 'toasty', 'volcanic']
	},
	winter: {
		colors: {
			islandColor: '#899790',
			skyColorOne: '#97afd1',
			skyColorTwo: '#b5cae8',
			waterColorOne: '#82aff5',
			waterColorTwo: '#b1cffc'
		},
		tags: ['arctic', 'cold', 'cool', 'freezing', 'frosty', 'snowy']
	}
};

export function getThemeFromTag(tag: string): { themeName: string } & IslandTheme | null {
	for (const themeKey in islandThemes) {
		const theme = islandThemes[themeKey];
		if (theme.tags.includes(tag)) {
			return { themeName: themeKey, ...theme };
		}
	}
	return null;
}

export function getAllThemeTags(): string[] {
	let allTags: string[] = [];

	for (const themeKey in islandThemes) {
		const theme = islandThemes[themeKey];
		allTags = [...allTags, ...theme.tags];
	}

	return [...new Set(allTags)];
}

export default islandThemes;
