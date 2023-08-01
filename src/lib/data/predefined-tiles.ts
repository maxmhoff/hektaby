import type Tile from "$lib/types/tile";

const predefinedTiles: Tile[] = [
    {
        index: 0,
        tileType: 'default',
        position: { x: 0, y: 0 },
        adjacentTiles: [1, 2, 3, 4, 5, 6],
        value: 0
    },
    {
        index: 1,
        tileType: 'default',
        position: { x: 50, y: -90 },
        adjacentTiles: [0, 2, 6, 7, 8, 9],
        value: 0
    },
    {
        index: 2,
        tileType: 'default',
        position: { x: 100, y: 0 },
        adjacentTiles: [0, 1, 3, 9, 10],
        value: 0
    },
    {
        index: 3,
        tileType: 'default',
        position: { x: 50, y: 90 },
        adjacentTiles: [0, 2, 4, 10, 11, 12],
        value: 0
    },
    {
        index: 4,
        tileType: 'default',
        position: { x: -50, y: 90 },
        adjacentTiles: [0, 3, 5, 12, 13, 14],
        value: 0
    },
    {
        index: 5,
        tileType: 'default',
        position: { x: -100, y: 0 },
        adjacentTiles: [0, 4, 6, 14, 15],
        value: 0
    },
    {
        index: 6,
        tileType: 'default',
        position: { x: -50, y: -90 },
        adjacentTiles: [0, 1, 5, 7, 15, 16],
        value: 0
    },
    {
        index: 7,
        tileType: 'default',
        position: { x: 0, y: -180 },
        adjacentTiles: [1, 6, 8, 16],
        value: 0
    },
    {
        index: 8,
        tileType: 'default',
        position: { x: 100, y: -180 },
        adjacentTiles: [1, 7, 9],
        value: 0
    },
    {
        index: 9,
        tileType: 'default',
        position: { x: 150, y: -90 },
        adjacentTiles: [1, 2, 8],
        value: 0
    },
    {
        index: 10,
        tileType: 'default',
        position: { x: 150, y: 90 },
        adjacentTiles: [2, 3, 11],
        value: 0
    },
    {
        index: 11,
        tileType: 'default',
        position: { x: 100, y: 180 },
        adjacentTiles: [3, 10, 12],
        value: 0
    },
    {
        index: 12,
        tileType: 'default',
        position: { x: 0, y: 180 },
        adjacentTiles: [3, 4, 11, 13],
        value: 0
    },
    {
        index: 13,
        tileType: 'default',
        position: { x: -100, y: 180 },
        adjacentTiles: [4, 12, 14],
        value: 0
    },
    {
        index: 14,
        tileType: 'default',
        position: { x: -150, y: 90 },
        adjacentTiles: [4, 5, 13],
        value: 0
    },
    {
        index: 15,
        tileType: 'default',
        position: { x: -150, y: -90 },
        adjacentTiles: [5, 6, 16],
        value: 0
    },
    {
        index: 16,
        tileType: 'default',
        position: { x: -100, y: -180 },
        adjacentTiles: [6, 7, 15],
        value: 0
    }
];

export default predefinedTiles;