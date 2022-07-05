import { Game } from "~/game";

window.addEventListener("load", () => {
  const canvas = <HTMLCanvasElement>document.getElementById("canvas");
  const wallCanvas = <HTMLCanvasElement>document.getElementById("wallCanvas");

  const game = new Game(canvas, wallCanvas);
  game.onBeginPlay();
});
