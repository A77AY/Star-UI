import * as React from 'react';
import { ThemeProvider } from '../src/styled-components';
import themeProvider from './themeProvider';

interface Props {}
interface State {}

/**
 * Example component wrapper
 */
export default class StyleguideComponentWrapper extends React.Component<Props, State> {
  public static readonly defaultProps: Partial<Props> = {};
  public readonly state: State = {};

  private handlerId: string;

  public componentWillMount() {
    do {
      this.handlerId = Math.random().toString();
    } while (!!themeProvider.handlers[this.handlerId]);
    themeProvider.handlers[this.handlerId] = this.updateThemeHandler;
  }

  public componentWillUnmount() {
    delete themeProvider.handlers[this.handlerId];
  }

  public render() {
    return <ThemeProvider theme={themeProvider.theme}>{this.props.children}</ThemeProvider>;
  }

  public updateThemeHandler = () => {
    this.forceUpdate();
  };
}
