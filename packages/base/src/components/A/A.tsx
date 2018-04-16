import * as React from 'react';
import styled from 'styled-components';
import { ExtendableElementProps, StyledRFC, StyledSFC } from '../../types';

const AStyled = styled.a`
  /* Correct the line height in all browsers. */
  line-height: 1.15;
  /* Remove the gray background on active links in IE 10. */
  background-color: transparent;
`;

interface Props extends ExtendableElementProps<'a'> {}

const A: StyledRFC<HTMLAnchorElement, Props> = (props, ref) => {
  return <AStyled innerRef={ref} {...props} />;
};

/**
 * Anchor component
 */
export default React.forwardRef(A) as StyledSFC<Props>;
