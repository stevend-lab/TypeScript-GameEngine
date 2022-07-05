import { Camera } from "~/camera";
import { Player } from "~/player";

export class DebugMode {
  private menuSwitch: number;
  private y: number | undefined;
  private x: number | undefined;
  private canvas: HTMLCanvasElement | undefined;
  private readonly context: CanvasRenderingContext2D | undefined;
  private readonly player: Player | undefined;
  private camera: Camera | undefined;
  turnOnMenu: boolean;
  private readonly debugMenuImage: HTMLImageElement;

  constructor(
    x?: number | undefined,
    y?: number | undefined,
    canvas?: HTMLCanvasElement,
    context?: CanvasRenderingContext2D,
    camera?: Camera,
    player?: Player,
    turnOnMenu?: boolean
  ) {
    this.menuSwitch = 0;
    this.x = x || 0;
    this.y = y || 0;
    this.canvas = canvas;
    this.context = context;
    this.player = player;
    this.camera = camera;
    this.turnOnMenu = turnOnMenu || false;
    this.debugMenuImage = new Image();
    this.debugMenuImage.src = "sprites/menu1.png";
  }

  render(): void {
    if (
      this.turnOnMenu &&
      this.context !== undefined &&
      this.player !== undefined
    ) {
      this.context.fillStyle = "green";
      this.context.font = "30px bold";
      this.context.drawImage(this.debugMenuImage, 400, -300, 687 / 3, 936 / 3);
      this.context.fillText("X: " + String(this.player.x), 430, -250);
      this.context.fillText("Y: " + String(this.player.y), 430, -150);
    }
  }
}
