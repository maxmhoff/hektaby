export type TileType = 'default' | 'commercial' | 'industrial' | 'residential' | 'school' | 'power plant';

type Tile = {
    index: number,
    tileType: TileType,
    position: {
        x: number,
        y: number,
    },
    adjacentTiles: number[],
    value: number,
};

export default Tile;