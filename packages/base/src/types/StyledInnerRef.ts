import styled, { ThemedOuterStyledProps } from 'styled-components';

/**
 * Styled inner ref
 */
type StyledInnerRef<Element = any> = (instance: Element) => void;

export default StyledInnerRef;
