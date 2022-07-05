import { AABB } from "./aabb";
import { Polygon } from "./polygon";
import { Vector } from "~/vector";

export class Circle {
  public pos: any;
  radius: any;
  public points: Vector[] | undefined;
  public normals: Vector[] | undefined;
  constructor({ pos, radius }: { pos: object; radius: number }) {
    this.pos = pos;
    this.radius = radius;
  }

  public getNormals(objB: { pos: { x: number; y: number } }): void {
    let v = new Vector({
      pos: {
        x: objB.pos.x - this.pos.x,
        y: objB.pos.y - this.pos.y,
      },
      unit: false,
    });
    this.normals = [v.leftNormal().normalize()];
  }

  getPoints(
    objB: AABB | Polygon,
    point: { pos: { x: number; y: number } }
  ): void {
    this.points = [
      new Vector({
        pos: {
          x: point.pos.x - this.pos.x,
          y: point.pos.y - this.pos.y,
        },
      })
        .normalize()
        .scale(this.radius)
        .add(this),
      new Vector({
        pos: {
          x: objB.pos.x - this.pos.x,
          y: objB.pos.y - this.pos.y,
        },
        unit: false,
      })
        .normalize()
        .scale(this.radius)
        .add(this),
    ];
  }

  nearestPoint(points: any[]): any[] {
    return points
      .map((point, i) => {
        return [
          new Vector({
            pos: {
              x: this.pos.x - point.pos.x,
              y: this.pos.y - point.pos.y,
            },
          }),
          point,
          i,
        ];
      })
      .reduce(
        (
          prev: { getMag: () => number }[],
          curr: { getMag: () => number }[]
        ) => {
          return curr[0].getMag() < prev[0].getMag() ? curr : prev;
        }
      );
  }
}
