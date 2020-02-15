import { TimeTrack, EasingFunc } from "../types";
import { lerp } from "./mathFunctions";
import EasingTrack from "./easingTrack";
import Delay from "./delay";

export default class Timeline implements TimeTrack {
  lastTrackFinish: Date;
  tracks: TimeTrack[];

  constructor() {
    this.tracks = [];
    this.lastTrackFinish = null;
  }

  addEasing(duration: number, easing: EasingFunc) {
    this.tracks.push(new EasingTrack(duration, easing));
  }

  addDelay(duration: number) {
    this.tracks.push(new Delay(duration));
  }

  addTrack(timeTrack: TimeTrack) {
    if (this.tracks.length) {
      timeTrack.start(new Date());
    }

    this.tracks.push(timeTrack);
  }

  start(): void {
    return;
  }

  alpha(): number {
    if (!this.tracks.length) return 1;

    let currentTrack = this.tracks[0];

    if (currentTrack.isFinished()) {
      this.lastTrackFinish = currentTrack.finishedAt();
      this.tracks.shift();
      
      if (!this.tracks.length) return 1;

      const newTrack = this.tracks[0];

      newTrack.start(currentTrack.finishedAt());

      currentTrack = newTrack;
    }

    return currentTrack.alpha();
  }

  isFinished(): boolean {
    return this.tracks.length == 0 && !!this.lastTrackFinish;
  }

  finishedAt(): Date {
    return this.lastTrackFinish;
  }
}
