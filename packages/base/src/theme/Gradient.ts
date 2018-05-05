import { round } from 'lodash';
import Color from './Color';
import Palette from './Palette';

export default class Gradient {
  public palettes: Palette[];

  /**
   * @param palettes Maximum 10 base pallettes
   */
  constructor(colors: Palette[]) {
    this.palettes = new Array(100);
    const count = colors.length;
    const parts = 10 / (count + 1);
    // TODO It is necessary to init only basic, and at the first 'get' to calculate, and then to take from a cache
    for (let i = 0, part, beforePart = 0; i < colors.length; ++i) {
      part = Math.round((i + 1) * parts);
      this.palettes[part] = colors[i];
      for (let j = 1; j < part - beforePart; ++j) {
        const k = 1 / (part - beforePart) * j;
        // this.palettes[j + beforePart] = Color.blend(this.palettes[beforePart], this.palettes[part], k);
      }
      beforePart = part;
    }
  }

  /**
   * Get color
   * The base color can be gotten if you know how many you defined them when init
   * For example: 9 init colors (1/(9+1)=1/10=0.1), get 0.1, 0.2, 0.3 ... 0.9
   * 0 - black
   * 1 - white
   * @param lightness 0..1
   * @return color
   */
  public get = (lightness: number): Palette => {
    lightness = round(lightness, 2);
    if (lightness < 0) {
      lightness = 0;
    } else if (lightness > 1) {
      lightness = 1;
    }
    return this.palettes[lightness * 100];
  };
}
