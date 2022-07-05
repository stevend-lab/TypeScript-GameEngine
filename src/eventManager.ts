import { Camera } from "./camera";
import { Player } from "./player";
import { Cursor } from "~/cursor";
import { DebugMode } from "~/debugMode";

export class EventManager {
  private canvas: HTMLCanvasElement;
  private wallCanvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private camera: Camera;
  private player: Player;
  private cursor: Cursor;
  private debugMode: DebugMode;
  public mouseHeldDown: boolean;
  private isJumping: boolean;
  private gameStarted: boolean;
  private wallContext: CanvasRenderingContext2D;

  constructor(
    canvas: HTMLCanvasElement,
    wallCanvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    camera: Camera,
    player: Player,
    cursor: Cursor,
    debugMode: DebugMode,
    wallContext: CanvasRenderingContext2D
  ) {
    this.canvas = canvas;
    this.wallCanvas = wallCanvas;
    this.context = context;
    this.camera = camera;
    this.player = player;
    this.cursor = cursor;
    this.debugMode = debugMode;
    this.mouseHeldDown = false;
    this.isJumping = false;
    this.gameStarted = false;
    this.wallContext = wallContext;
  }

  onMouseDown = (): void => {
    this.mouseHeldDown = true;
  };

  onMouseUp = (): void => {
    this.mouseHeldDown = false;
  };

  onKeyDown = (e: KeyboardEvent): void => {
    switch (e.key.toUpperCase()) {
      case "W":
        this.player.isUp = true;
        break;
      case "S":
        this.player.isDown = true;
        break;
      case "A":
        this.player.isLeft = true;
        break;
      case "D":
        this.player.isRight = true;
        break;
      case " ":
        this.player.isJumping = true;
        break;
      case "/":
        this.debugMode.turnOnMenu = !this.debugMode.turnOnMenu;
        break;
      case "SHIFT":
        break;
    }
  };

  onKeyUp = (e: KeyboardEvent): void => {
    switch (e.key.toUpperCase()) {
      case "W":
        this.player.isUp = false;
        break;
      case "S":
        this.player.isDown = false;
        break;
      case "A":
        this.player.isLeft = false;
        break;
      case "D":
        this.player.isRight = false;
        break;
      case " ":
        this.player.isJumping = false;
        break;
    }
  };

  resizeWindow = (): void => {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.wallCanvas.width = window.innerWidth;
    this.wallCanvas.height = window.innerHeight;

    this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.wallContext.translate(
      this.wallCanvas.width / 2,
      this.wallCanvas.height / 2
    );
    this.context.scale(1.3, 1.3);
    this.wallContext.scale(1.3, 1.3);
  };
}
