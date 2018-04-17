import * as React from 'react';
import styled from '../../styled-components';
import { ExtendableElementProps } from '../../types';
import { styledForwardRef } from '../../utils';

const StyledA = styled.a`
  /* Correct the line height in all browsers. */
  line-height: 1.15;
  /* Remove the gray background on active links in IE 10. */
  background-color: transparent;

  text-decoration: none;

  :visited {
  }

  :hover {
    text-decoration: underline;
  }

  :focus {
  }

  :active {
  }
`;

interface Props extends ExtendableElementProps<'a'> {}

/**
 * Anchor component
 */
const A = styledForwardRef<Props>((props, ref) => {
  return <StyledA innerRef={ref} {...props} />;
});

export default A;
