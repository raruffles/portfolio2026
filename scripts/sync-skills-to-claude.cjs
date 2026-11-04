const fs = require('fs');
const path = require('path');
const os = require('os');

const agentsSkillsDir = path.resolve('.agents/skills');
const claudeGlobalSkillsDir = path.join(os.homedir(), '.claude', 'skills');
const claudeWorkspaceSkillsDir = path.resolve('.claude/skills');

const targetSkills = [
  'framer-motion-animator',
  'ui-ux-pro-max',
  '21st-ai',
  '21st-cli-use',
  '21st-design-sync',
  '21st-registry',
  '21st-ui-build',
  '21st-ui-explore',
  '21st-ui-review',
  'humanizer',
  'humanizer-pt-br'
];

function copyFolderRecursive(src, dest) {
  if (!fs.existsSync(src)) return false;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyFolderRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
  return true;
}

[claudeGlobalSkillsDir, claudeWorkspaceSkillsDir].forEach(destDir => {
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
});

console.log('--- Syncing Skills to Claude Code ---');
targetSkills.forEach(skill => {
  const src = path.join(agentsSkillsDir, skill);
  if (fs.existsSync(src)) {
    const okGlobal = copyFolderRecursive(src, path.join(claudeGlobalSkillsDir, skill));
    const okWorkspace = copyFolderRecursive(src, path.join(claudeWorkspaceSkillsDir, skill));
    console.log(`✓ ${skill}: synced to Claude (global & workspace)`);
  } else {
    console.log(`! ${skill}: not found in .agents/skills yet`);
  }
});

console.log('\nGlobal Claude Skills now:');
console.log(fs.readdirSync(claudeGlobalSkillsDir));
