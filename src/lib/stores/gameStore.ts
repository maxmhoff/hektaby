import { writable, type Writable } from 'svelte/store';

export const currentGame: Writable<{score: number, maxZones: {residential: number, commercial: number, industrial: number}, specialZones: number}> = writable({score: 0, maxZones: {residential: 0, commercial: 0, industrial: 0}, specialZones: 1});