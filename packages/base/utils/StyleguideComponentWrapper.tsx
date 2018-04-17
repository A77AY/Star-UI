import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import Theme from '../src/theme/Theme';

const theme: Theme = {
  colors: {},
};

/**
 * Theme wrapper
 */
export default class StyleguideComponentWrapper extends React.Component {
  public render() {
    return <ThemeProvider theme={theme}>{this.props.children}</ThemeProvider>;
  }
}
