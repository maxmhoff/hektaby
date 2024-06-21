import generateSeededRandom from './generate-seeded-random';

function shuffleArray<T>(array: T[], seed?: string): T[] {
    let arr = [...array]; // Create a shallow copy of the array
    const rng = seed ? generateSeededRandom(seed) : Math.random();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(rng * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr; // Return the shuffled array
}

export default shuffleArray;