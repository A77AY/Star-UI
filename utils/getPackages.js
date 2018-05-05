const PackageUtilities = require('lerna/lib/PackageUtilities');
const Repository = require('lerna/lib/Repository');

/**
 * Get packages
 * https://github.com/azz/lerna-get-packages
 */
module.exports = function getPackages(rootDir = __dirname) {
  const packages = PackageUtilities.getPackages(new Repository(rootDir));
  return packages.map(pkg => {
    return {
      location: pkg._location,
      package: pkg._package,
    };
  });
};
