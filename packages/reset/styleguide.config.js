const path = require('path');
const glob = require('glob');
const reactDocGen = require('react-docgen');
const reactDocGenTS = require('react-docgen-typescript');

module.exports = {
  title: 'Star UI Reset',
  components: () => {
    return glob.sync(path.resolve(__dirname, 'src/components/**/*.tsx')).filter(module => {
      return /\/[A-Z]\w*\.tsx$/.test(module);
    });
  },
  resolver: reactDocGen.resolver.findAllComponentDefinitions,
  propsParser: reactDocGenTS.withDefaultConfig().parse,
};
