import 'mocha';

import { expect } from 'chai';
import { round } from 'lodash';

import Color from './Color';

describe('Color', () => {
  describe('constructor', () => {
    it('from RGB JSON', () => {
      const color = new Color({
        r: 1,
        g: 22,
        b: 255,
        a: 0.5,
      });
      expect({
        r: 1,
        g: 22,
        b: 255,
        a: 0.5,
      }).to.deep.equal(color.toJSON());
    });
    it('from RGB string', () => {
      const color = new Color('rgba(1,22,255,0.5)');
      expect({
        r: 1,
        g: 22,
        b: 255,
        a: 0.5,
      }).to.deep.equal(color.toJSON());
    });
    it('from HEX string', () => {
      const color = new Color('#0116ff');
      expect({
        r: 1,
        g: 22,
        b: 255,
        a: 1,
      }).to.deep.equal(color.toJSON());
    });
  });
  describe('contrast', () => {
    it('with white', () => {
      const color = new Color('#0116ff');
      const contrast = color.contrast(Color.White);
      expect(8.2).to.equal(round(contrast, 2));
    });
    it('with black', () => {
      const color = new Color('#0116ff');
      const contrast = color.contrast(Color.Black);
      expect(2.56).to.equal(round(contrast, 2));
    });
  });
  describe('luminance', () => {
    it('white', () => {
      const luminance = Color.White.luminance();
      expect(1).to.equal(luminance);
    });
    it('black', () => {
      const luminance = Color.Black.luminance();
      expect(0).to.equal(luminance);
    });
  });
  describe('color by contrast', () => {
    it('white', () => {
      const color = new Color('#0116ff');
      const colorByContrast = color.byContrast(15.5, Color.White);
      expect(15.5).to.equal(round(colorByContrast.contrast(Color.White), 1));
    });
  });
  describe('blend', () => {
    it('white and black', () => {
      const color = Color.blend(Color.White, Color.Black);
      expect(color.r)
        .to.be.at.least(Color.White.r)
        .and.to.be.most(Color.Black.r);
      expect(color.g)
        .to.be.at.least(Color.White.g)
        .and.to.be.most(Color.Black.g);
      expect(color.b)
        .to.be.at.least(Color.White.b)
        .and.to.be.most(Color.Black.b);
      expect(color.a)
        .to.be.at.least(Color.White.a)
        .and.to.be.most(Color.Black.a);
    });
  });
});
