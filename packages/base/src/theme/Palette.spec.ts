import 'mocha';

import { expect } from 'chai';

import Color from './Color';
import Palette from './Palette';

describe('Palette', () => {
  describe('get', () => {
    it('basic', () => {
      const color = new Color('#0116ff');
      const palette = new Palette([color]);
      expect(color).to.equal(palette.get(0.5));
    });
    it('calculated', () => {
      const color = new Color('#0116ff');
      const palette = new Palette([color]);
      expect(palette.get(0.49)).to.be.instanceof(Color);
    });
  });
});
