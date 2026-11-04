const { execSync } = require('child_process');

try {
  const log = execSync('git log -n 5 --oneline', { encoding: 'utf8' });
  console.log('Recent commits:\n', log);
  
  const status = execSync('git status --short', { encoding: 'utf8' });
  console.log('Git status:\n', status);
  
  const remotes = execSync('git remote -v', { encoding: 'utf8' });
  console.log('Remotes:\n', remotes);
} catch (e) {
  console.error(e.message);
}
