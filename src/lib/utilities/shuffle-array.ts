import generateSeededRandom from "./generate-seeded-random";

function shuffleArray<T>(array: T[], seed?: string) {
  const rng = seed ? generateSeededRandom(seed) : Math.random();
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(rng * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

export default shuffleArray;