import * as React from 'react';
import { Component } from 'react';

export interface IButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}
export interface IButtonState {}

/**
 * Button
 */
export default class Button extends Component<IButtonProps, IButtonState> {
  public render() {
    const { children, ...restProps } = this.props;

    return <button {...restProps}>{children}</button>;
  }
}
