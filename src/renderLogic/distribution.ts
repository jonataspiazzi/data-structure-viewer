import { EasingFunc } from "../types";

export default class Distribution {
  table: number[];

  constructor(easing: EasingFunc, resolution: number = 100) {
    this.table = [];

    for (let i = 0; i < resolution; i++) {
      const value = easing(i / resolution);
      const amout = Math.round(value * resolution);

      for (let c = 0; c < amout; c++) {
        this.table.push(value);
      }
    }
  }

  random() {
    const index = Math.trunc(Math.random() * this.table.length);
    return this.table[index];
  }
}