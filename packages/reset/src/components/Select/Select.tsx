import * as React from 'react';

const styles = require('./Select.css');

interface ISelectProps
  extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {}

interface ISelectState {}

/**
 * Select
 */
export default class Select extends React.Component<ISelectProps, ISelectState> {
  public state = {};

  public render() {
    const { children, ...restProps } = this.props;

    return (
      <select className={styles.Select} {...restProps}>
        {children}
      </select>
    );
  }
}
