import * as React from 'react';
import styled from '../../styled-components';
import { ExtendableElementProps } from '../../types';
import { styledForwardRef } from '../../utils';

const StyledA = styled.a`
  font-size: ${({ theme }) => theme.sizes.font};
  line-height: ${({ theme }) => theme.sizes.base};
  color: ${({ theme }) => theme.colors.neutral.get(0).toString()};
  text-decoration: none;
  background-color: 'transparent';

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
