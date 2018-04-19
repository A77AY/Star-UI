import * as React from 'react';
import styled from '../styled-components';
import theme from './defaultTheme';

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

  public render() {
    return <div>{Object.keys(theme).map(sectionKey => this.renderSection(sectionKey, theme[sectionKey]))}</div>;
  }

  private renderSection(key, section) {
    return (
      <Block>
        <h3 key={key}>{key}</h3>
        {Object.keys(section).map(
          valueKey =>
            typeof section[valueKey] === 'object' && !Array.isArray(section[valueKey])
              ? this.renderSection(valueKey, section[valueKey])
              : this.renderLine(valueKey, section[valueKey])
        )}
      </Block>
    );
  }

  private renderLine(key, value) {
    return (
      <Line key={key}>
        <Label>{key}</Label>
        <Input defaultValue={value} />
      </Line>
    );
  }
}
