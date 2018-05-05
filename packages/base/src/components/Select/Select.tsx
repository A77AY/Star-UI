import * as React from 'react';

const styles = require('./Select.css');

interface Props extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {}

interface State {}

/**
 * Select
 */
export default class Select extends React.Component<Props, State> {
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
