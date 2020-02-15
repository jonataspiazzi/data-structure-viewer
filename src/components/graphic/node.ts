import { GraphicItem } from "../../types";
import P5 from 'p5';

export default class Node implements GraphicItem {
  animate(): void {
    throw new Error("Method not implemented.");
  }
  render(p5: P5): void {
    throw new Error("Method not implemented.");
  }
  hasGraphicUpdates(): boolean {
    throw new Error("Method not implemented.");
  }

}