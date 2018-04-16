import StyledInnerRef from './StyledInnerRef';

/**
 * Styled wrapper stateless component
 */
type StyledSFC<Props> = React.SFC<Props & { ref?: StyledInnerRef }>;

export default StyledSFC;
