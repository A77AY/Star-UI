import { round } from 'lodash';
import Color from './Color';

export default class Palette {
  public colors: Color[];
  public baseColors: number;

  /**
   * @param colors Maximum 99 base colors
   */
  constructor(colors: Color[]) {
    this.colors = new Array(100);
    this.colors[0] = Color.Black;
    this.colors[100] = Color.White;
    const count = colors.length;
    const parts = 100 / (count + 1);
    // TODO It is necessary to init only basic, and at the first 'get' to calculate, and then to take from a cache
    for (let i = 0, part, beforePart = 0; i < colors.length; ++i) {
      part = Math.round((i + 1) * parts);
      this.colors[part] = colors[i];
      for (let j = 1; j < part - beforePart; ++j) {
        const k = 1 / (part - beforePart) * j;
        this.colors[j + beforePart] = Color.blend(this.colors[beforePart], this.colors[part], k);
      }
      beforePart = part;
    }
  }

  public getBase(num: number) {}

  /**
   * Get color
   * The base color can be gotten if you know how many you defined them when init
   * For example: 9 init colors (1/(9+1)=1/10=0.1), get 0.1, 0.2, 0.3 ... 0.9
   * 0 - black
   * 1 - white
   * @param lightness 0..1
   * @return color
   */
  public get = (lightness: number): Color => {
    lightness = round(lightness, 2);
    if (lightness < 0) {
      lightness = 0;
    } else if (lightness > 1) {
      lightness = 1;
    }
    return this.colors[lightness * 100];
  };
}
