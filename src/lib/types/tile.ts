import type TileType from "./tile-type"

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