const cp = require('child_process');

module.exports = function run(script) {
  const task = cp.spawn(script, {
    shell: true,
    stdio: 'inherit',
  });
  return task;
};
