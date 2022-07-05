import { Tile } from "~/tile";

export class TileContainer {
  public tiles: any;
  private readonly coords: any;

  constructor() {
    this.coords = {};
    this.tiles = [];
  }

  addTile(tile: Tile): Tile {
    this.tiles.push(tile);
    if (this.coords[tile.x] == null) {
      this.coords[tile.x] = {};
    }
    return (this.coords[tile.x][tile.y] = tile);
  }

  getTile(x: string | number, y: string | number): any {
    let ref1;
    if (((ref1 = this.coords[x]) != null ? ref1[y] : void 0) != null) {
      return this.coords[x][y];
    }
  }

  allTiles(): any {
    return this.tiles.slice();
  }
}
