import { TimeTrack } from "../types";

export default class Delay implements TimeTrack {
  init: Date;
  delay: number;

  constructor(delay: number) {
    this.init = null;
    this.delay = delay;
  }

  start(at: Date): void {
    this.init = at;
  }

  alpha(): number {
    return 1;
  }

  isFinished(): boolean {
    if (!this.init) return false;
 
    return new Date().getTime() - this.init.getTime() > this.delay;
  }

  finishedAt(): Date {
    const finished = new Date();
 
    finished.setTime(this.init.getTime() + this.delay);
 
    return finished;
  }
}