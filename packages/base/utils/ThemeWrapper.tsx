import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import Theme from '../src/theme/Theme';

const theme: Theme = {
  colors: {
    main: 'red',
  },
};

/**
 * Theme wrapper
 */
export default class ThemeWrapper extends React.Component {
  public render() {
    return <ThemeProvider theme={theme}>{this.props.children}</ThemeProvider>;
  }
}
