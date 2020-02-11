import { easeInOutCubic } from './easingFunctions';

export const bounceEaseInOutCubic = (x: number) => {
  return easeInOutCubic(x <= .5 ? x * 2 : (1 - x) * 2);
}