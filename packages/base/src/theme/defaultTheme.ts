import Theme from './Theme';

const defaultTheme: Theme = {
  sizes: {
    /**
     * Font size
     */
    fontSize: 12,
    /**
     * Line height
     * Used as vertical rhytm
     */
    lineHeight: 1.5,
    /**
     * Fragmentation
     * The higher, the smaller the size of fragments
     * '1' - do not fragment
     * For example '3' -> 1/3 = 0.333
     * That will be numbers: 0, 0.333, 0.666, 1, 1.333...
     */
    fragmentation: 2,
    /**
     * Scale
     * How to scale
     */
    scale: size => size + 1 / 6,
  },
  colors: {
    /**
     * Brand colors
     */
    brand: [['red'], ['green']],
    /**
     * Neutral color
     * Usually black
     */
    neutral: ['black'],
    /**
     * Risk (dangerous, functional) colors
     */
    risk: {
      /**
       * OK (success)
       * Usually green
       */
      OK: ['green'],
      /**
       * Info
       * Usually blue
       */
      INFO: ['blue'],
      /**
       * Low risk (warning)
       * Usually yellow
       */
      LOW: ['yellow'],
      /**
       * Medium risk (warning)
       * Usually orange
       */
      MEDIUM: ['orange'],
      /**
       * High risk (danger)
       * Usually red
       */
      HIGH: ['red'],
    },
  },
};

export default defaultTheme;
