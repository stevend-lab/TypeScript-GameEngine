import { TypeDefinitions } from "~/typeDefinitions";

export class Cell {
  private preloadedClass: TypeDefinitions;
  public i: any;
  public type: number;
  public j: any;
  private id: number;
  private color: string;

  constructor(i: any, j: any) {
    this.preloadedClass = new TypeDefinitions();
    this.i = i;
    this.j = j;
    this.type = this.preloadedClass.TYPES.NONE;
    this.id = -1;
    this.color = "";
  }
}
