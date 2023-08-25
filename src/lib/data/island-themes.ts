export type IslandThemeColors = {
	islandColor: string;
	skyColorOne: string;
	skyColorTwo: string;
	waterColorOne: string;
	waterColorTwo: string;
};

export type IslandTheme = { colors: IslandThemeColors; designer: string; tags: string[]; };

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
		designer: 'VuFFeR',
		tags: ['acid', 'polluted', 'toxic'],
	},
	babyshower: {
		colors: {
			islandColor: '#7e6d77',
			skyColorOne: '#ffe5e5',
			skyColorTwo: '#9eecff',
			waterColorOne: '#adebff',
			waterColorTwo: '#f6cdfe',
		},
		designer: 'VuFFeR',
		tags: ['futuristic', 'pink'],
	},
	beach: {
		colors: {
			islandColor: '#a1927d',
			skyColorOne: '#ffebb3',
			skyColorTwo: '#bddfff',
			waterColorOne: '#5ca8ff',
			waterColorTwo: '#a3d9ff',
		},
		designer: 'VuFFeR',
		tags: ['blazing', 'hot', 'sandy', 'sunny'],
	},
	brocante: {
		colors: {
			islandColor: '#9c9591',
			skyColorOne: '#e1c8e4',
			skyColorTwo: '#faf3f0',
			waterColorOne: '#f1fff0',
			waterColorTwo: '#d1e6e0',
		},
		designer: 'KatteFimz',
		tags: ['faded', 'delicate', 'elegant', 'lovely'],
	},
	emerald: {
		colors: {
			islandColor: '#107050',
			skyColorOne: '#62d2da',
			skyColorTwo: '#d6fffe',
			waterColorOne: '#25c192',
			waterColorTwo: '#73f7d6',
		},
		designer: 'VuFFeR',
		tags: ['emerald', 'green', 'peaceful'],
	},
	exotic: {
		colors: {
			islandColor: '#5d5658',
			skyColorOne: '#ecdb69',
			skyColorTwo: '#ffe5f7',
			waterColorOne: '#50bfce',
			waterColorTwo: '#aeeae9',
		},
		designer: 'VuFFeR',
		tags: ['colourful', 'crazy', 'exotic', 'tropical', 'warm'],
	},
	fuchsia: {
		colors: {
			islandColor: '#163345',
			skyColorOne: '#131f76',
			skyColorTwo: '#1e0b6b',
			waterColorOne: '#5742f0',
			waterColorTwo: '#e187f2'
		},
		designer: 'VuFFeR',
		tags: ['fuchsia', 'breathtaking', 'majestic'],
	},
	jungle: {
		colors: {
			islandColor: '#1d741b',
			skyColorOne: '#80ace5',
			skyColorTwo: '#1e180a',
			waterColorOne: '#26e36f',
			waterColorTwo: '#20620e',
		},
		designer: 'Autoghost',
		tags: ['humid', 'overgrown'],
	},
	lillith: {
		colors: {
			islandColor: '#212121',
			skyColorOne: '#545454',
			skyColorTwo: '#d39797',
			waterColorOne: '#8f0000',
			waterColorTwo: '#a92323'
		},
		designer: 'DeadlyMouse',
		tags: ['blood', 'red'],
	},
	marble: {
		colors: {
			islandColor: '#328b54',
			skyColorOne: '#accafb',
			skyColorTwo: '#ffffff',
			waterColorOne: '#73c8dd',
			waterColorTwo: '#b7e6f5',
		},
		designer: 'KatteFimz',
		tags: ['bright', 'foggy', 'marble', 'mediterranean', 'misty', 'quiet'],
	},
	paradise: {
		colors: {
			islandColor: '#2c701f',
			skyColorOne: '#ecdb69',
			skyColorTwo: '#ffffff',
			waterColorOne: '#ff0000',
			waterColorTwo: '#00c2bf',
		},
		designer: 'RelaxingLaw',
		tags: ['soothing'],
	},
	retro: {
		colors: {
			islandColor: '#49363a',
			skyColorOne: '#ebe76c',
			skyColorTwo: '#f0b86e',
			waterColorOne: '#836096',
			waterColorTwo: '#ed7b7b'
		},
		designer: 'VuFFeR',
		tags: ['old', 'forgotten', 'charming'],
	},
	sapphire: {
		colors: {
			islandColor: '#2f6598',
			skyColorOne: '#d6f3ff',
			skyColorTwo: '#81c1fe',
			waterColorOne: '#76b8fe',
			waterColorTwo: '#ecf7fe',
		},
		designer: 'VuFFeR',
		tags: ['royal', 'sapphire'],
	},
	storm: {
		colors: {
			islandColor: '#525252',
			skyColorOne: '#898c9a',
			skyColorTwo: '#bacdd8',
			waterColorOne: '#6d9dd5',
			waterColorTwo: '#90c1e4'
		},
		designer: 'VuFFeR',
		tags: ['cloudy', 'grey', 'stormy', 'thunderous', 'windy'],
	},
	sunset: {
		colors: {
			islandColor: '#554e56',
			skyColorOne: '#b095e8',
			skyColorTwo: '#dd9cac',
			waterColorOne: '#61abff',
			waterColorTwo: '#9cd6ff'
		},
		designer: 'VuFFeR',
		tags: ['calm', 'crisp', 'sunset'],
	},
	volcano: {
		colors: {
			islandColor: '#5e4845',
			skyColorOne: '#cb6d4d',
			skyColorTwo: '#1e180a',
			waterColorOne: '#b6207f',
			waterColorTwo: '#f4e68b'
		},
		designer: 'VuFFeR',
		tags: ['fiery', 'roasting', 'scorched', 'toasty', 'volcanic'],
	},
	winter: {
		colors: {
			islandColor: '#899790',
			skyColorOne: '#97afd1',
			skyColorTwo: '#b5cae8',
			waterColorOne: '#82aff5',
			waterColorTwo: '#b1cffc',
		},
		designer: 'VuFFeR',
		tags: ['arctic', 'cold', 'cool', 'freezing', 'frosty', 'snowy'],
	}
};

export function getThemeFromTag(tag: string): ({ themeName: string } & IslandTheme) | null {
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
