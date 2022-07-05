import PLAYER_IMAGE from "./images/playerProtoHair.bmp";
import CROSS_HAIR_IMAGE from "./images/centerTarget.bmp";
import { Camera } from "~/camera";

export class Monster {
  private readonly x: number;
  private readonly y: number;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private readonly sprite: HTMLImageElement;
  private camera: Camera;
  private readonly width: number;
  private readonly height: number;
  private readonly cross_hair_image: HTMLImageElement;
  private readonly cross_hair_image_size_height: number;
  private readonly cross_hair_image_size_width: number;

  constructor(
    x: number,
    y: number,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    camera: Camera,
    width?: number,
    height?: number
  ) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 64;
    this.height = height || 64;
    this.canvas = canvas;
    this.context = context;
    this.sprite = new Image();
    this.camera = camera;
    this.sprite.src = PLAYER_IMAGE;
    this.cross_hair_image = new Image();
    this.cross_hair_image.src = CROSS_HAIR_IMAGE;
    this.cross_hair_image_size_height = 10;
    this.cross_hair_image_size_width = 10;
  }

  onBeginPlay(): void {}

  checkIfCursorOverlap() {

  }

  update(): void {}

  render(): void {
    this.context.drawImage(
      this.sprite,
      this.x - this.width / 2 - this.camera.x,
      this.y - this.height / 2 - this.camera.y,
      this.width,
      this.height
    );

    this.context.drawImage(
      this.cross_hair_image,
      this.x - this.cross_hair_image_size_width / 2 - this.camera.x,
      this.y - this.cross_hair_image_size_height / 2 - this.camera.y,
      this.cross_hair_image_size_width,
      this.cross_hair_image_size_height
    );
  }
}
