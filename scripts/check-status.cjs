const { execSync } = require('child_process');

try {
  const status = execSync('git status --short', { encoding: 'utf8' });
  console.log('Status:\n', status);
} catch (e) {
  console.error(e.message);
}
