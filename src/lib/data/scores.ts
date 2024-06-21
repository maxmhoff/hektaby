const SCORES: Record<string, Record<string, number>> = {
	residential: {
		residential: 1,
		commercial: 1,
		industrial: -1,
		park: 1,
		'power plant': -2,
		school: 2
	},
	commercial: {
		residential: 2,
		industrial: 2,
		commercial: -1,
		park: 1,
		'power plant': -2,
		school: -1
	},
	industrial: {
		industrial: 1,
		commercial: 1,
		'power plant': 2,
		school: -2
	}
};

export default SCORES;
