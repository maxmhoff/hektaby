import approvedSeeds from "./approve-seeds";

function createSeed(): string {
    const firstWord = approvedSeeds.firstWords[Math.round(Math.random() * approvedSeeds.firstWords.length)];
    const secondWord = approvedSeeds.secondWords[Math.round(Math.random() * approvedSeeds.secondWords.length)];
    const lastWord = approvedSeeds.lastWords[Math.round(Math.random() * approvedSeeds.lastWords.length)];

    return `${firstWord}-${secondWord}-${lastWord}`;
}

export default createSeed;