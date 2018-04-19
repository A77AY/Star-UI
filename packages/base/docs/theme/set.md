Set your own theme:

```js static
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@star-ui/base';

const theme = {
  sizes: {},
  colors: {},
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
```
