import defaultTheme from '../src/theme/defaultTheme';
import Theme from '../src/theme/Theme';

interface ThemeProvider {
  /**
   * Theme
   */
  theme: Theme;
  /**
   * Handlers within examples
   */
  handlers: {
    [handlerId: string]: () => any;
  };
}

/**
 * Linking a theme configured in the app with examples
 * There is a context (styleguide.config.js), but it's for another
 */
export default { theme: defaultTheme, handlers: {} } as ThemeProvider;
