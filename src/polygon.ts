import { Vector } from "~/vector";
import { Circle } from "~/circle";

export class Polygon {
  public points: any;
  public pos: any;
  normals: any;

  constructor({ points }: { points: any }) {
    this.points = points;
  }

  getPoints(): void {}

  public getNormals(objA: Polygon | Circle): void {
    this.normals = this.points.map((point: any, i: number) => {
      let p1 = this.points[i],
        p2 = i === this.points.length - 1 ? this.points[0] : this.points[i + 1],
        v = new Vector({
          pos: { x: p2.pos.x - p1.pos.x, y: p2.pos.y - p1.pos.y },
          unit: false,
        });
      return v.leftNormal().normalize();
    });
  }
}
