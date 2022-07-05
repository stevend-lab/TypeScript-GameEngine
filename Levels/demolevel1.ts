import { Camera } from "../src/camera";

class DemoLevel1 {

  public camera: Camera;
  public context: CanvasRenderingContext2D;

  constructor(camera: Camera, context: CanvasRenderingContext2D) {
    this.camera = camera;
    this.context = context;
  }

}
