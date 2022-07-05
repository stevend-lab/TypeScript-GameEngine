export class Tile {
  x: number;
  y: number;
  private id: number;
  private roomCheck: boolean;
  display: HTMLDivElement | undefined;

  constructor(x1: number, y1: number, id: number) {
    this.x = x1;
    this.y = y1;
    this.draw();
    this.id = id;
    this.roomCheck = false;
  }

  draw(): HTMLDivElement {
    let newDiv;
    newDiv = document.createElement("div");

    newDiv.className = "tile";

    return (this.display = newDiv);
  }

  remove(): any {
    if (this.display !== undefined) return this.display.remove();
  }
}
