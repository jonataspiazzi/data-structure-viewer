import { easeInOutCubic } from './easingFunctions';

export const bounceEaseInOutCubic = (x) => {
  return easeInOutCubic(x <= .5 ? x * 2 : (1 - x) * 2);
}