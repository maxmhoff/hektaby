import { writable, type Writable } from 'svelte/store';

export const currentGame: Writable<{score: number, specialZones: number}> = writable({score: 0, specialZones: 1});