import * as React from 'react';

import { throttle } from 'lodash';
import styled from '../src/styled-components';
import themeProvider from './themeProvider';

const Block = styled.div``;

const Line = styled.label`
  display: flex;
  padding: 5px;

  ${Block} &:nth-child(2n) {
    background-color: #eee;
  }
`;

const Label = styled.div`
  flex-basis: 50%;
`;

const Input = styled.input`
  flex-basis: 50%;
`;

interface Props {}
interface State {}

export default class ThemeConfig extends React.Component<Props, State> {
  public static readonly defaultProps: Partial<Props> = {};
  public readonly state: State = {};

  private updateTheme = throttle(() => {
    for (const handler in themeProvider.handlers) {
      if (themeProvider.handlers.hasOwnProperty(handler)) {
        themeProvider.handlers[handler]();
      }
    }
  }, 1000);

  public render() {
    return (
      <div>
        {Object.keys(themeProvider.theme).map(sectionKey =>
          this.renderSection(sectionKey, themeProvider.theme[sectionKey])
        )}
      </div>
    );
  }

  private renderSection = (key, section) => {
    return (
      <Block key={key}>
        <h3>{key}</h3>
        {Object.keys(section).map(
          valueKey =>
            typeof section[valueKey] === 'object' && !Array.isArray(section[valueKey])
              ? this.renderSection(valueKey, section[valueKey])
              : this.renderLine(valueKey, section)
        )}
      </Block>
    );
  };

  private renderLine = (key, section) => {
    const value = section[key];
    return (
      <Line key={key}>
        <Label>{key}</Label>
        <Input
          defaultValue={value}
          onInput={e => {
            section[key] = (e.target as HTMLInputElement).value;
            this.updateTheme();
          }}
        />
      </Line>
    );
  };
}
