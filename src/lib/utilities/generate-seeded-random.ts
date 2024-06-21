function generateSeededRandom(str: string): number {
    let seed = 0;
    for (let i = 0; i < str.length; i++) {
        seed += str.charCodeAt(i) * (i + 1);
    }

    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

export default generateSeededRandom;