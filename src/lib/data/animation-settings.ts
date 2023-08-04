import { quadInOut, quadOut, quartOut } from 'svelte/easing';

const animationSettings = {
	gameFinished: {
		duration: 7000,
		easing: quadInOut
	},
	gameStart: {
		duration: 1000,
		easing: quadInOut
	},
	pan: {
		duration: 600,
		easing: quadOut
	},
	hover: { 
        duration: 400, easing: quartOut
    },
    flipTile: {
        duration: 600,
        easing: quadInOut
    }
};

export default animationSettings;
