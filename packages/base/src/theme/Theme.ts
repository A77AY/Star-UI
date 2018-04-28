import Color from './Color';
import Palette from './Palette';

export class SizesTheme {
  /**
   * Font size
   */
  public font = '12px';
  /**
   * Line height
   * Used as vertical rhytm
   */
  public base = '18px';
  /**
   * Fragmentation
   * The higher, the smaller the size of fragments
   * '1' - do not fragment
   * For example '3' -> 1/3 = 0.333
   * That will be numbers: 0, 0.333, 0.666, 1, 1.333...
   */
  public fragmentation: 2;
  /**
   * Scale
   * How to scale
   */
  public scale = size => size + 1 / 6;
}

export class ColorsTheme {
  /**
   * Brand colors
   */
  public brand: Palette[] = [new Palette([new Color()])];
  /**
   * Neutral color
   */
  public neutral: Palette = new Palette([Color.Gray]);
  /**
   * Risk (danger, functional) colors
   */
  public danger: { [name: string]: Palette } = {
    /**
     * OK (success)
     * Usually green
     */
    OK: new Palette([new Color(0, 255, 0)]),
    /**
     * Info
     * Usually blue
     */
    INFO: new Palette([new Color(0, 0, 255)]),
    /**
     * Low risk (warning)
     * Usually yellow
     */
    LOW: new Palette([new Color(255, 255, 0)]),
    /**
     * Medium risk (warning)
     * Usually orange
     */
    MEDIUM: new Palette([new Color(255, 127, 0)]),
    /**
     * High risk (danger)
     * Usually red
     */
    HIGH: new Palette([new Color(255, 0, 0)]),
  };
}

export class StateTheme {
  /**
   * Unvisited links
   */
  public link;
  public active;
  public hover;
  public focus;
  public valid;
  /**
   * Input elements with an invalid value
   */
  public invalid;
  public checked;
  public enabled;
  public disabled;
  public empty;
  public focusHover;
}

interface Theme {
  sizes: SizesTheme;
  colors: ColorsTheme;
}

export default Theme;
