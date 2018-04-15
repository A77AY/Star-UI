import * as classNames from 'classnames';
import * as React from 'react';

const css = require('./A.css');

interface Props extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {}

/**
 * Anchor
 */
const A: React.SFC<Props> = ({ className = '', ...restProps }) => {
  return <a className={classNames(css.A, className)} {...restProps} />;
};

export default A;
