import { Player } from "~/player";
import { Camera } from "~/camera";

export class LightMap {
  private readonly realHeight: number;
  private readonly realLightMapWidth: number;
  private player: Player;
  private x: number;
  private y: number;
  private canvas: any;
  private context: any;
  private camera: any;
  private readonly lightMapImage: HTMLImageElement;

  constructor(
    x: number,
    y: number,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    camera: Camera,
    player: Player
  ) {
    this.realLightMapWidth = window.innerWidth;
    this.realHeight = window.innerHeight;
    this.player = player;
    this.x = this.player.x - this.realLightMapWidth / 2;
    this.y = this.player.y - this.realHeight / 2;
    this.canvas = canvas;
    this.context = context;
    this.camera = camera;

    this.lightMapImage = new Image();
    this.lightMapImage.src = "sprites/lightmap.png";
  }

  update(): void {
    this.x = this.player.x - this.realLightMapWidth / 2;
    this.y = this.player.y - this.realHeight / 2;
  }

  render(): void {
    this.context.drawImage(
      this.lightMapImage,
      this.x - this.camera.x,
      this.y - this.camera.y,
      3000,
      3000
    );
  }
}
