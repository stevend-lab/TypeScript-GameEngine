import { Circle } from "~/circle";

export class Vector {
  pos: any;
  private unit: boolean;
  private y: number;

  constructor({ pos, unit = false }: { pos: any; unit?: boolean }) {
    this.y = 0;
    this.pos = pos;
    this.unit = unit;
  }

  copy(): Vector {
    return new Vector({ pos: { x: this.pos.x, y: this.pos.y }, unit: false });
  }

  getMag(): number {
    return Math.sqrt(this.pos.x * this.pos.x + this.pos.y * this.pos.y);
  }

  normalize(): Vector {
    let len = this.getMag();
    if (len === 0) {
      return new Vector({
        pos: { x: 0, y: 0 },
        unit: false,
      });
    } else {
      return new Vector({
        pos: {
          x: this.pos.x / len,
          y: this.pos.y / len,
        },
        unit: true,
      });
    }
  }

  dot(vectorB: Vector): number {
    return this.pos.x * vectorB.pos.x + this.pos.y * vectorB.pos.y;
  }

  project(vectorB: Vector): Vector {
    let dp = this.dot(vectorB);
    if (vectorB.unit) {
      return new Vector({
        pos: { x: dp * vectorB.pos.x, y: dp * vectorB.y },
        unit: false,
      });
    } else {
      return new Vector({
        pos: {
          x:
            (dp /
              (vectorB.pos.x * vectorB.pos.x + vectorB.pos.y * vectorB.pos.y)) *
            vectorB.pos.x,
          y:
            (dp /
              (vectorB.pos.x * vectorB.pos.x + vectorB.pos.y * vectorB.pos.y)) *
            vectorB.pos.y,
        },
        unit: false,
      });
    }
  }

  leftNormal(): Vector {
    return new Vector({ pos: { x: -this.pos.y, y: this.pos.x }, unit: false });
  }

  rightNormal(): Vector {
    return new Vector({ pos: { x: this.pos.y, y: -this.pos.x }, unit: false });
  }

  perProduct(): number {
    return this.dot(this.rightNormal());
  }

  add(vectorB: Circle): Vector {
    return new Vector({
      pos: {
        x: this.pos.x + vectorB.pos.x,
        y: this.pos.y + vectorB.pos.y,
      },
      unit: false,
    });
  }

  sub(vectorB: { pos: { x: number; y: number } }): Vector {
    return new Vector({
      pos: {
        x: this.pos.x - vectorB.pos.x,
        y: this.pos.y - vectorB.pos.y,
      },
      unit: false,
    });
  }

  scale(scalar: number): Vector {
    return new Vector({
      pos: {
        x: this.pos.x * scalar,
        y: this.pos.y * scalar,
      },
      unit: false,
    });
  }
}
