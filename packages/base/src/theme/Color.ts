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

class Color {
  public static White = new Color(255, 255, 255);
  public static Black = new Color(0, 0, 0);

  public static fromJSON(rgbColor: RGBColor): Color {
    const color = new Color();
    color.set(rgbColor);
    return color;
  }

  public static hex(hex: string) {
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
    const r = parseInt(normalHEX.substr(0, 2), 16);
    const g = parseInt(normalHEX.substr(2, 2), 16);
    const b = parseInt(normalHEX.substr(4, 2), 16);
    const a = parseInt(normalHEX.substr(6, 2), 16);
    return new Color(r, g, b, a);
  }

  public static blend(fromColor: Color, toColor: Color, koeff: number = 0.5) {
    const color = fromColor.clone();
    color.blend(toColor);
    return color;
  }

  public static contrast(color0: Color, color1: Color) {
    return color0.contrast(color1);
  }

  private r: number = 0;
  private g: number = 0;
  private b: number = 0;
  private a: number = 1;

  public constructor(r: number = 0, g: number = 0, b: number = 0, a: number = 1) {
    this.set({ r, g, b, a });
  }

  public setA(a: number): void {
    if (typeof a === 'number') {
      if (a <= 0) {
        this.a = 0;
      } else if (a >= 1) {
        this.a = 1;
      } else {
        this.a = a;
      }
    }
  }

  public setRGBPart(partName: 'r' | 'g' | 'b', partValue: number): void {
    if (typeof partValue === 'number') {
      if (partValue <= 0) {
        this[partName] = 0;
      } else if (partValue >= 255) {
        this[partName] = 255;
      } else {
        this[partName] = partValue;
      }
    }
  }

  public set({ r, g, b, a }: Partial<RGBColor>): void {
    this.setRGBPart('r', r);
    this.setRGBPart('g', g);
    this.setRGBPart('b', b);
    this.setA(a);
  }

  public blend(toColor, koeff = 0.5) {
    const fromColorKoeff = 1 - koeff;
    const r = (this.r * fromColorKoeff + toColor.r * koeff) / 2;
    const g = (this.g * fromColorKoeff + toColor.g * koeff) / 2;
    const b = (this.b * fromColorKoeff + toColor.b * koeff) / 2;
    const a = (this.a * fromColorKoeff + toColor.a * koeff) / 2;
    return this.set({ r, g, b, a });
  }

  public lighten(koeff: number): void {
    this.blend(Color.White, koeff);
  }

  public darken(koeff: number): void {
    this.blend(Color.Black, koeff);
  }

  /**
   * Relative luminance
   * https://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
   * @return from 0 (darkest black) to 1 (lightest white)
   */
  public luminance(): number {
    const rgb = [this.r, this.g, this.b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  }

  /**
   * Contrast ratio
   * https://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
   */
  public contrast(color: Color) {
    return (this.luminance() + 0.05) / (color.luminance() + 0.05);
  }

  public toString(): string {
    return this.a < 1 ? `rgba(${this.r},${this.g},${this.b},${this.a})` : `rgb(${this.r},${this.g},${this.b})`;
  }

  public toJSON(): RGBColor {
    return {
      r: this.r,
      g: this.g,
      b: this.b,
      a: this.a,
    };
  }

  public clone(): Color {
    return Color.fromJSON(this.toJSON());
  }
}
