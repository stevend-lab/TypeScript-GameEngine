import { Camera } from "~/camera";
import { Player } from "~/player";

export class CullingScript {
  private readonly testMode: boolean;
  private cullingTestImage: HTMLImageElement;
  private cullingRealImage: HTMLImageElement;
  readonly realWidth: number;
  readonly realHeight: number;
  private player: Player;
  x: number;
  y: number;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private camera: Camera;

  constructor(
    x: number,
    y: number,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    camera: Camera,
    player: Player
  ) {
    this.testMode = false;
    this.cullingTestImage = new Image();
    this.cullingRealImage = new Image();

    this.realWidth = window.innerWidth;
    this.realHeight = window.innerHeight;
    this.player = player;
    this.x = this.player.x - this.realWidth / 2;
    this.y = this.player.y - this.realHeight / 2;
    this.canvas = canvas;
    this.context = context;
    this.camera = camera;

    if (this.testMode) {
      this.realWidth = 500;
      this.realHeight = 500;
    }
  }

  update(): void {
    this.x = this.player.x - this.realWidth / 2;
    this.y = this.player.y - this.realHeight / 2;
  }

  render(context: CanvasRenderingContext2D, camera: Camera): void {
    context.beginPath();
    context.rect(
      this.x - camera.x,
      this.y - camera.y,
      this.realWidth,
      this.realHeight
    );
    context.stroke();
  }
}
