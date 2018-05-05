import * as React from 'react';
import { Component } from 'react';

export interface Props
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}
export interface State {}

/**
 * Button
 */
export default class Button extends Component<Props, State> {
  public render() {
    const { children, ...restProps } = this.props;

    return <button {...restProps}>{children}</button>;
  }
}
