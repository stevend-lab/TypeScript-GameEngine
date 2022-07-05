import { Camera } from "~/camera";

export class Cursor {
  public x: number;
  public y: number;
  private wallCanvas: HTMLCanvasElement | undefined;
  private width: number;
  private height: number;
  private canvas: HTMLCanvasElement | undefined;
  private originalContext: CanvasRenderingContext2D | undefined;
  private camera: Camera | undefined;
  private wallContext: CanvasRenderingContext2D | undefined;

  constructor(
    canvas?: HTMLCanvasElement,
    context?: CanvasRenderingContext2D,
    wallCanvas?: HTMLCanvasElement,
    wallContext?: CanvasRenderingContext2D,
    camera?: Camera
  ) {
    this.x = 0;
    this.y = 0;
    this.width = 40;
    this.height = 40;
    this.canvas = canvas;
    this.originalContext = context;
    this.camera = camera;

    this.wallCanvas = wallCanvas;
    this.wallContext = wallContext;
  }

  render(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
}
