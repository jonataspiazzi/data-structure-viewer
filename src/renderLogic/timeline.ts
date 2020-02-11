import { EasingFunc } from "../types";

export default class Timeline {
  easing: EasingFunc;
  duration: number;
  autoreset: boolean;
  startMoment: number;
  isPaused: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  pauseElapsed: number;

  constructor(easing: EasingFunc, duration: number, autostart: boolean, autoreset: boolean) {
    this.easing = easing;
    this.duration = duration;
    this.autoreset = !!autoreset;
    this.stop();
    if (autostart) this.start();
  }

  start(): void {
    this.startMoment = Date.now();
    this.isPaused = false;
    this.hasStarted = true;
    this.hasFinished = false;
  }

  pause(): void {
    if (this.isPaused) return;
    this.pauseElapsed = this.elapsed();
    this.isPaused = true;
  }

  resume(): void {
    this.startMoment = Date.now() - this.pauseElapsed;
    this.isPaused = false;
    this.pauseElapsed = 0;
  }

  finish(): void {
    this.isPaused = false;
    this.hasStarted = true;
    this.hasFinished = true;

    if (this.autoreset) {
      this.start();
    }
  }

  stop(): void {
    this.startMoment = 0;
    this.pauseElapsed = 0;
    this.isPaused = false;
    this.hasStarted = false;
    this.hasFinished = false;
  }

  // amount of seconds from start
  elapsed(): number {
    if (!this.hasStarted) return 0;
    if (this.hasFinished) return this.duration;

    return this.isPaused ? this.pauseElapsed : Date.now() - this.startMoment;
  }

  // percentage of progress.
  progress(): number {
    return this.elapsed() * 1.0 / this.duration;
  }

  // a value to be used in animation.
  alpha(): number {
    let d = this.progress();

    if (d > 1) {
      d = 1;
      this.finish();
    }

    return this.easing(d);
  }
}