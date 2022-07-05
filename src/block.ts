export class Block {
  private x: number;
  private y: number;
  private size: number;
  private canvas: HTMLCanvasElement | undefined;
  private context: CanvasRenderingContext2D | undefined;
  private image: HTMLImageElement | undefined;

  constructor(
    x: number,
    y: number,
    size: number,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    image: HTMLImageElement
  ) {
    this.x = x || 0;
    this.y = y || 0;
    this.size = size || 64;
    this.canvas = canvas;
    this.context = context;
    this.image = image;
  }

  onBeginPlay(): void {}

  update(): void {}

  render(): void {}
}
