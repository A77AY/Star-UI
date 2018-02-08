const path = require('path');
const glob = require('glob');

module.exports = {
  title: 'Star UI Reset',
  components: () => {
    return glob.sync(path.resolve(__dirname, 'src/components/**/*.tsx')).filter(module => {
      return /\/[A-Z]\w*\.tsx$/.test(module);
    });
  },
  resolver: require('react-docgen').resolver.findAllComponentDefinitions,
  propsParser: require('react-docgen-typescript').withDefaultConfig().parse,
};
