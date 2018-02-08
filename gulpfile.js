const gulp = require('gulp');
const getPackages = require('./utils/getPackages');
const run = require('./utils/run');
const rootPackageJSON = require('./package');

/**
 * All project packages
 */
const modules = getPackages();

/**
 * Show all project packages
 */
gulp.task('packages', done => {
  console.log(`Packages (${modules.length}):`);
  for (let { package: packageJSON, location } of modules) {
    console.log(`${packageJSON.name}@${packageJSON.version} - ${packageJSON.description} (${location})`);
  }
  done();
});

/**
 * Load tasks from root package
 */
for (let scriptName in rootPackageJSON.scripts) {
  gulp.task(`${scriptName}`, done => {
    const task = run(`yarn run ${scriptName}`);
    task.on('close', done);
  });
}

/**
 * Load tasks for packages
 */
for (let module of modules) {
  for (let scriptName in module.package.scripts) {
    const { name } = module.package;
    let packageName = name.split('/');
    packageName = packageName[1] || packageName[0];
    gulp.task(`/${packageName}::${scriptName}`, done => {
      const task = run(`lerna run --scope ${name} --stream ${scriptName}`);
      task.on('close', done);
    });
  }
}
