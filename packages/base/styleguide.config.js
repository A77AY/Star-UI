const path = require('path');
const glob = require('glob');
const reactDocGen = require('react-docgen');
const reactDocGenTS = require('react-docgen-typescript');

module.exports = {
  title: '🌟 Star UI Base',
  sections: [
    {
      name: 'Introduction',
      content: 'docs/introduction/introduction.md',
      sections: [
        {
          name: 'Installation',
          content: 'docs/introduction/installation.md',
        },
        {
          name: 'Usage',
          content: 'docs/introduction/usage.md',
        },
      ],
    },
    {
      name: 'Theme',
      content: 'docs/theme/theme.md',
      sections: [
        {
          name: 'Set',
          content: 'docs/theme/set.md',
        },
        {
          name: 'Configuration',
          content: 'docs/theme/configuration.md',
        },
      ],
    },
    {
      name: 'Components',
      components: () => {
        return glob.sync(path.resolve(__dirname, 'src/components/**/*.tsx')).filter(module => {
          return /\/[A-Z]\w*\.tsx$/.test(module);
        });
      },
    },
  ],
  resolver: reactDocGen.resolver.findAllComponentDefinitions,
  propsParser: reactDocGenTS.withDefaultConfig().parse,
  webpackConfig: require('./webpack.config.js'),
  getComponentPathLine(componentPath) {
    const { name } = path.parse(componentPath);
    return `import { ${name} } from '@star-ui/base';`;
  },
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'utils/StyleguideComponentWrapper'),
    // StyleGuideRenderer: path.join(__dirname, 'utils/StyleguideRenderer'),
  },
};
