import { forwardRef } from 'react';
import { StyledInnerRef, StyledRFC, StyledSFC } from '../types';

export default forwardRef as <Props>(Component: StyledRFC<Props>) => StyledSFC<Props>;
