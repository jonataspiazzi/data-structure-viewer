export function lerp(a: number, b: number, alpha: number): number {
  return alpha * (b - a) + a;
}