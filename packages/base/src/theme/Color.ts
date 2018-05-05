interface RGBColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

/**
 * Success Criteria
 * A (lowest), AA, and AAA (highest)
 * https://www.w3.org/TR/WCAG20/
 * Normal text: 1em
 * Large scale (text): 14 point (typically 18.66px) and bold or larger
 * or: 18 point (typically 24px) or larger
 */
enum AATextContrastLevel {
  NORMAL = 4.5,
  LARGE = 3,
}

enum AAAContrastLevel {
  NORMAL = 7,
  LARGE = 4.5,
}

const defaultColor: RGBColor = {
  r: 0,
  g: 0,
  b: 0,
  a: 1,
};

export default class Color {
  public static readonly White = new Color(255, 255, 255);
  public static readonly Black = new Color(0, 0, 0);
  public static readonly Gray = new Color(127, 127, 127);
  public static readonly default: RGBColor = defaultColor;
  public static readonly LuminanceK = {
    R: 0.2126,
    G: 0.7152,
    B: 0.0722,
  };

  public static blend(fromColor: Color, toColor: Color, koeff: number = 0.5) {
    const color = fromColor.clone();
    color.blend(toColor);
    return color;
  }

  public static contrast(color0: Color, color1: Color) {
    return color0.contrast(color1);
  }

  public r: number = defaultColor.r;
  public g: number = defaultColor.g;
  public b: number = defaultColor.b;
  public a: number = defaultColor.a;

  public constructor(arg0?: number | string | RGBColor | number[], g?: number, b?: number, a?: number) {
    switch (typeof arg0) {
      case 'object':
        this.set(Array.isArray(arg0) ? { r: arg0[0], g: arg0[1], b: arg0[2], a: arg0[3] } : (arg0 as object));
        return;
      case 'number':
        this.set({ r: arg0 as number, g, b, a });
        return;
      case 'string':
        this.setAsStr(arg0 as string);
        return;
      default:
        this.set(defaultColor);
        return;
    }
  }

  public setAsStr = (colorStr: string): void => {
    if (colorStr.substr(0, 3) === 'rgb') {
      return this.setAsRGBStr(colorStr);
    }
    this.setAsHEXStr(colorStr);
  };

  public setAsRGBStr = (rgbStr: string): void => {
    const parts = rgbStr.split(',');
    this.set({
      r: parts[0] ? Number(parts[0].match(/\d+/)) : defaultColor.r,
      g: parts[1] ? Number(parts[1].match(/\d+/)) : defaultColor.g,
      b: parts[2] ? Number(parts[2].match(/\d+/)) : defaultColor.b,
      a: parts[3] ? Number(parts[3].match(/\d*.?\d+/)) : defaultColor.a,
    });
  };

  public setAsHEXStr = (hex: string): void => {
    let normalHEX = hex.toString();
    switch (normalHEX.length) {
      case 3:
        normalHEX = normalHEX[0].repeat(2) + normalHEX[1].repeat(2) + normalHEX[2].repeat(2) + 'FF';
      case 6:
        normalHEX += 'FF';
        break;
      case 7:
        normalHEX = normalHEX.substr(1) + 'FF';
        break;
      case 8:
        break;
      case 9:
        normalHEX = normalHEX.substr(1);
        break;
      default:
        normalHEX = '000000FF';
    }
    this.set({
      r: parseInt(normalHEX.substr(0, 2), 16),
      g: parseInt(normalHEX.substr(2, 2), 16),
      b: parseInt(normalHEX.substr(4, 2), 16),
      a: parseInt(normalHEX.substr(6, 2), 16),
    });
  };

  public setA = (a: number): void => {
    if (typeof a === 'number') {
      if (a <= 0) {
        this.a = 0;
      } else if (a >= 1) {
        this.a = 1;
      } else {
        this.a = a;
      }
    }
  };

  public setRGBPart = (partName: 'r' | 'g' | 'b', partValue: number): void => {
    partValue = Math.round(partValue);
    if (typeof partValue === 'number') {
      if (partValue <= 0) {
        this[partName] = 0;
      } else if (partValue >= 255) {
        this[partName] = 255;
      } else {
        this[partName] = partValue;
      }
    }
  };

  public set = ({ r, g, b, a }: Partial<RGBColor>): void => {
    this.setRGBPart('r', r);
    this.setRGBPart('g', g);
    this.setRGBPart('b', b);
    this.setA(a);
  };

  public blend = (toColor, koeff = 0.5): void => {
    const fromColorKoeff = 1 - koeff;
    return this.set({
      r: (this.r * fromColorKoeff + toColor.r * koeff) / 2,
      g: (this.g * fromColorKoeff + toColor.g * koeff) / 2,
      b: (this.b * fromColorKoeff + toColor.b * koeff) / 2,
      a: (this.a * fromColorKoeff + toColor.a * koeff) / 2,
    });
  };

  public lighten = (koeff: number): void => {
    this.blend(Color.White, koeff);
  };

  public darken = (koeff: number): void => {
    this.blend(Color.Black, koeff);
  };

  /**
   * Relative luminance
   * https://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
   * @return from 0 (darkest black) to 1 (lightest white)
   */
  public luminance = (): number => {
    return (
      this.luminancePart(this.r) * Color.LuminanceK.R +
      this.luminancePart(this.g) * Color.LuminanceK.G +
      this.luminancePart(this.b) * Color.LuminanceK.B
    );
  };

  /**
   * Contrast ratio
   * https://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
   * @return 1..21
   */
  public contrast = (color: Color) => {
    const lum0 = this.luminance() + 0.05;
    const lum1 = color.luminance() + 0.05;
    return lum1 > lum0 ? lum1 / lum0 : lum0 / lum1;
  };

  /**
   * Color by contrast
   */
  public byContrast = (contrast: number, color: Color = Color.White) => {
    // compute luminance the resulting color
    const lum1 = color.luminance() + 0.05;
    let lum0;
    if (lum1 >= 0.525) {
      lum0 = lum1 / contrast;
    } else {
      lum0 = lum1 * contrast;
    }
    if (lum0 > 1.05) {
      lum0 = 1.05;
    } else if (lum0 < 0.05) {
      lum0 = 0.05;
    }
    const currLum = this.luminance();
    const currLumParts = {
      r: this.luminancePart(this.r),
      g: this.luminancePart(this.g),
      b: this.luminancePart(this.b),
    };
    const needLum = lum0 - 0.05;
    const k = needLum / currLum;
    const needLumParts = {
      r: currLumParts.r * k,
      g: currLumParts.g * k,
      b: currLumParts.b * k,
    };
    // when going beyond 1
    do {
      let redundantLum = 0;
      if (needLumParts.r > 1) {
        redundantLum += (needLumParts.r - 1) * Color.LuminanceK.R;
        needLumParts.r = 1;
      }
      if (needLumParts.g > 1) {
        redundantLum += (needLumParts.g - 1) * Color.LuminanceK.G;
        needLumParts.g = 1;
      }
      if (needLumParts.b > 1) {
        redundantLum += (needLumParts.b - 1) * Color.LuminanceK.B;
        needLumParts.b = 1;
      }
      if (redundantLum > 0 && (needLumParts.r < 1 || needLumParts.g < 1 || needLumParts.b < 1)) {
        let k2 = 0;
        if (needLumParts.r < 1) {
          k2 += needLumParts.r * Color.LuminanceK.R;
        }
        if (needLumParts.g < 1) {
          k2 += needLumParts.g * Color.LuminanceK.G;
        }
        if (needLumParts.b < 1) {
          k2 += needLumParts.b * Color.LuminanceK.B;
        }
        k2 = redundantLum / k2;
        if (needLumParts.r < 1) {
          needLumParts.r *= k2;
        }
        if (needLumParts.g < 1) {
          needLumParts.g *= k2;
        }
        if (needLumParts.b < 1) {
          needLumParts.b *= k2;
        }
      }
    } while (needLumParts.r > 1 || needLumParts.g > 1 || needLumParts.b > 1);
    // compute color
    const r = this.inverseLuminancePart(needLumParts.r);
    const g = this.inverseLuminancePart(needLumParts.g);
    const b = this.inverseLuminancePart(needLumParts.b);
    return new Color(r, g, b);
  };

  public toString = (): string => {
    return this.a < 1 ? `rgba(${this.r},${this.g},${this.b},${this.a})` : `rgb(${this.r},${this.g},${this.b})`;
  };

  public toJSON = (): RGBColor => {
    return {
      r: this.r,
      g: this.g,
      b: this.b,
      a: this.a,
    };
  };

  public clone = (): Color => {
    return new Color(this.toJSON());
  };

  /**
   * @return 0..1
   */
  private luminancePart = (part: number): number => {
    // Original
    // part /= 255;
    // return part <= 0.03928 ? part / 12.92 : ((part + 0.055) / 1.055) ** 2.4;
    //
    // 0..10.0164 -> 0..0.003040247678018576
    // 10.0164..255 -> 0.003039492486225865..1
    // (10.0189 -> 0.003040251106041009)
    // 10 -> 0.003035269835488375
    // 11 -> 0.0033465357638991595
    return part <= 10.0164 ? part / 3294.6 : ((part + 14.025) / 269.025) ** 2.4;
  };

  private inverseLuminancePart = (luminancePart: number): number => {
    if (luminancePart < 0.003040247678018576) {
      return luminancePart * 3294.6;
    }
    return luminancePart ** 0.4166666666666667 * 269.025 - 14.025;
  };
}
