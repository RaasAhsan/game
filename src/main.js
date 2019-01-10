const urlParams = new URLSearchParams(window.location.search);
const demo = urlParams.get('demo');

if (demo === 'metaballs') {
  const { start } = require('./metaballs');
  start();
} else {
  const { start } = require('./app');
  start();
}
