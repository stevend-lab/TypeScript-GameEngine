export class Camera {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x || 0;
    this.y = y || 0;
  }

  focus(x: number, y: number): void {
    this.x = x || 0;
    this.y = y || 0;
  }
}
