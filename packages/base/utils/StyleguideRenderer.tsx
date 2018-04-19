import * as React from 'react';
import Stylguide from 'react-styleguidist/lib/rsg-components/StyleGuide/StyleGuideRenderer';
import { ThemeProvider } from 'styled-components';
import Theme from '../src/theme/Theme';

const theme: Theme = {
  colors: {},
};

export default props => (
  <ThemeProvider theme={theme}>
    <Stylguide {...props} />
  </ThemeProvider>
);
