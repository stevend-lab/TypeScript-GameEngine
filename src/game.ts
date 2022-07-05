import { CullingScript } from "~/cullingScript";
import { EventManager } from "~/eventManager";
import { Cursor } from "~/cursor";
import { Player } from "~/player";
import { Camera } from "~/camera";
import { LightMap } from "~/lightMap";
import { DebugMode } from "~/debugMode";
import { Monster } from "~/monster";

export class Game {
  private CANVAS_WIDTH: number;
  private CANVAS_HEIGHT: number;
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  private readonly wallCanvas: HTMLCanvasElement;
  private readonly wallContext: CanvasRenderingContext2D;
  private preloaded: boolean;
  public mouse_position_x: number;
  public mouse_position_y: number;
  private fps: number | undefined;
  private lag: number | undefined;
  private frameDuration: number | undefined;
  private camera: Camera;
  private cullingScript: CullingScript | undefined;
  private player: Player;
  private eventManager: EventManager | undefined;
  private debugMode: DebugMode;
  private cursor: Cursor;
  private light_map: LightMap | undefined;
  private monster: Monster | undefined;

  constructor(canvas: HTMLCanvasElement, wallCanvas: HTMLCanvasElement) {
    this.CANVAS_WIDTH = 1280;
    this.CANVAS_HEIGHT = 720;
    this.canvas = canvas;
    this.context = <CanvasRenderingContext2D>canvas.getContext("2d");
    this.camera = new Camera(0, 0);
    this.player = new Player(0, 0, this.camera);
    this.mouse_position_x = 0;
    this.mouse_position_y = 0;
    this.debugMode = new DebugMode();
    this.wallCanvas = wallCanvas;
    this.wallContext = <CanvasRenderingContext2D>wallCanvas.getContext("2d");
    this.cursor = new Cursor();
    this.preloaded = false;
  }

  onBeginPlay(): void {
    this.wallCanvas.width = window.innerWidth;
    this.wallCanvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.wallContext.fillStyle = "#ff0303";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.wallContext.fillStyle = "#FFFFFF";

    this.fps = 60;

    this.frameDuration = 1000 / this.fps;

    this.lag = 0;

    this.mouse_position_x = 0;
    this.mouse_position_y = 0;

    this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.wallContext.translate(
      this.wallCanvas.width / 2,
      this.wallCanvas.height / 2
    );

    this.context.scale(1.3, 1.3);
    this.wallContext.scale(1.3, 1.3);

    this.camera = new Camera(0, 0);

    this.player = new Player(652, 650, this.camera);
    this.cullingScript = new CullingScript(
      0,
      0,
      this.canvas,
      this.context,
      this.camera,
      this.player
    );

    this.cursor = new Cursor(
      this.canvas,
      this.context,
      this.wallCanvas,
      this.wallContext,
      this.camera
    );

    this.debugMode = new DebugMode(
      0,
      0,
      this.canvas,
      this.context,
      this.camera,
      this.player,
      false
    );

    this.eventManager = new EventManager(
      this.canvas,
      this.wallCanvas,
      this.context,
      this.camera,
      this.player,
      this.cursor,
      this.debugMode,
      this.wallContext
    );

    this.light_map = new LightMap(
      100,
      100,
      this.canvas,
      this.context,
      this.camera,
      this.player
    );

    this.monster = new Monster(
      300,
      300,
      this.canvas,
      this.context,
      this.camera
    );

    addEventListener("keydown", this.eventManager.onKeyDown);
    addEventListener("keyup", this.eventManager.onKeyUp);
    addEventListener("mousemove", this.getMousePos); // move this function to a method in the controller
    addEventListener("mousedown", this.eventManager.onMouseDown);
    addEventListener("mouseup", this.eventManager.onMouseUp);
    addEventListener("resize", this.eventManager.resizeWindow);
    addEventListener("touchstart", this.eventManager.onMouseDown);

    requestAnimationFrame(this.loop);
  }

  getMousePos = (e: MouseEvent): void => {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;

    this.mouse_position_x = (e.clientX - rect.left) * scaleX;

    this.mouse_position_y = (e.clientY - rect.top) * scaleY;
  };

  linearInterpolate(start: number, end: number, amt: number): number {
    return (1 - amt) * start + amt * end;
  }

  update(): void {
    this.player.update();

    this.camera.focus(
      this.linearInterpolate(this.camera.x, this.player.x, 0.05),
      this.linearInterpolate(this.camera.y, this.player.y, 0.1)
    );
    if (this.cullingScript !== undefined) this.cullingScript.update();
    if (this.light_map !== undefined) this.light_map.update();
  }

  render(): void {

    this.context.fillStyle = "pink"
    this.context.fillRect(0 - this.canvas.width / 2, 0 - this.canvas.height / 2,  this.canvas.width, this.canvas.height)
    this.player.render(this.context);
    this.monster?.render();


  }

  renderSecondCanvas(): void {
    this.wallContext.clearRect(
      0 - this.wallCanvas.width / 2,
      0 - this.wallCanvas.height / 2,
      this.wallCanvas.width,
      this.wallCanvas.height
    );

    this.cursor.render(this.mouse_position_x, this.mouse_position_y);
  }

  loop = (): void => {
    this.update();

    this.render();

    this.renderSecondCanvas();
    requestAnimationFrame(this.loop);
  };
}
