import Omit from './Omit';

/**
 * Extendable HTML element props
 */
type ExtendableElementProps<ElementName extends keyof JSX.IntrinsicElements> = Omit<
  JSX.IntrinsicElements[ElementName],
  'ref'
>;

export default ExtendableElementProps;
