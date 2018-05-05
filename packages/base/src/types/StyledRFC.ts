import * as React from 'react';
import Omit from './Omit';
import StyledInnerRef from './StyledInnerRef';

/**
 * Styled wrapper ref forwarding component
 */
type StyledRFC<Element, Props = {}> = (props: Props, ref?: StyledInnerRef<Element>) => React.ReactElement<any> | null;

export default StyledRFC;
